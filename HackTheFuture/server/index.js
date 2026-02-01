import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createRequire } from 'module';
import OpenAI from 'openai';
import dotenv from 'dotenv';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main PDF analysis endpoint
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    const { caregiverType, explanationLevel, language = 'en' } = req.body;

    if (!caregiverType || !explanationLevel) {
      return res.status(400).json({ error: 'Missing caregiverType or explanationLevel' });
    }

    // Extract text from PDF
    const pdfData = await pdf(req.file.buffer);
    const pdfText = pdfData.text;

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from PDF. The file may be scanned or image-based.' });
    }

    // Build the prompt based on caregiver type and explanation level
    const caregiverDescriptions = {
      'parent': 'a parent caring for their child',
      'spouse': 'a spouse or partner caring for their loved one',
      'home-nurse': 'a home nurse or professional caregiver'
    };

    const levelDescriptions = {
      'simple': 'Use simple, everyday language. Avoid medical jargon. Explain things as you would to someone with no medical background.',
      'detailed': 'Provide comprehensive information including relevant medical terms (with explanations), specific measurements, and clinical details that would be helpful for someone who wants to understand the full picture.'
    };

    const languageInstructions = {
      'en': 'Respond in English.',
      'es': 'Respond entirely in Spanish (Español). All text in the JSON response must be in Spanish.',
      'zh': 'Respond entirely in Simplified Chinese (简体中文). All text in the JSON response must be in Chinese.',
      'ar': 'Respond entirely in Arabic (العربية). All text in the JSON response must be in Arabic.',
      'fr': 'Respond entirely in French (Français). All text in the JSON response must be in French.'
    };

    const systemPrompt = `You are MediClarify, an AI assistant that helps caregivers understand medical documents. Your role is to transform complex medical information into clear, actionable guidance.

You are creating a summary for ${caregiverDescriptions[caregiverType]}.

${levelDescriptions[explanationLevel]}

IMPORTANT: ${languageInstructions[language] || languageInstructions['en']}

You must respond with valid JSON only, no markdown formatting or code blocks. The JSON must have this exact structure:
{
  "summary": "A clear 2-3 paragraph explanation of what the document says, tailored to the caregiver type",
  "checklist": ["Array of 6-8 specific daily care tasks the caregiver should do"],
  "warnings": ["Array of 4-6 warning signs that require immediate medical attention"],
  "questions": ["Array of 4-6 important questions to ask the doctor at the next visit"]
}`;

    const userPrompt = `Please analyze this medical document and provide a summary, care checklist, warning signs, and questions for the doctor.

Document text:
${pdfText.substring(0, 15000)}`; // Limit text to avoid token limits

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseText = completion.choices[0].message.content;

    // Parse the JSON response
    let results;
    try {
      // Try to extract JSON if wrapped in code blocks
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseText);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    // Validate response structure
    if (!results.summary || !results.checklist || !results.warnings || !results.questions) {
      return res.status(500).json({ error: 'AI response missing required fields' });
    }

    res.json(results);

  } catch (error) {
    console.error('Error processing PDF:', error);

    if (error.code === 'invalid_api_key') {
      return res.status(500).json({ error: 'Invalid OpenAI API key. Please check your .env file.' });
    }

    if (error.code === 'insufficient_quota') {
      return res.status(500).json({ error: 'OpenAI API quota exceeded. Please check your billing.' });
    }

    res.status(500).json({ error: error.message || 'Failed to process document' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`MediClarify API server running at http://localhost:${PORT}`);

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
    console.warn('\n⚠️  Warning: OPENAI_API_KEY not set in .env file!');
    console.warn('   Please add your API key to the .env file.\n');
  }
});
