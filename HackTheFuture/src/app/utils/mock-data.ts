import type { CaregiverType, ExplanationLevel, AIResults } from '@/app/App';

export function getMockResults(
  caregiverType: CaregiverType,
  explanationLevel: ExplanationLevel
): AIResults {
  const isSimple = explanationLevel === 'simple';
  const isParent = caregiverType === 'parent';
  const isNurse = caregiverType === 'home-nurse';

  // Customize summary based on caregiver type and level
  const summaries: Record<CaregiverType, Record<ExplanationLevel, string>> = {
    parent: {
      simple: `Your child had surgery to remove their appendix (appendectomy). The surgery went well and there were no complications. 

They'll need to rest at home for about 2 weeks before returning to normal activities. The doctor removed the appendix through small cuts in the belly, which is why there are small bandages.

Pain and tiredness are normal for the first week. Your child should avoid sports, heavy lifting, and rough play during recovery.`,
      detailed: `Your child underwent a laparoscopic appendectomy for acute appendicitis. The procedure was completed successfully without intraoperative complications. The inflamed appendix was removed through three small incisions using minimally invasive surgical techniques.

Post-operative recovery typically spans 2-3 weeks. Initial pain management includes prescribed acetaminophen and ibuprofen. The surgical sites (three 1cm incisions) are closed with absorbable sutures and covered with waterproof dressings.

Activity restrictions include no contact sports, heavy lifting (>5 lbs), or strenuous physical activity for 14 days. Light activities and walking are encouraged to prevent complications. Full return to normal activities should be cleared by the surgeon at the 2-week follow-up appointment.`,
    },
    spouse: {
      simple: `Your partner had heart bypass surgery (CABG) to improve blood flow to the heart. The surgery was successful. Three blocked arteries were bypassed using blood vessels from the chest and leg.

Recovery at home will take 6-8 weeks. The first 2 weeks are the most challenging - expect fatigue, some chest discomfort, and emotional ups and downs. This is all normal.

They need to walk a little more each day, take medications as prescribed, and attend cardiac rehabilitation. No driving for 4-6 weeks, and no lifting anything over 10 pounds during recovery.`,
      detailed: `Your spouse underwent coronary artery bypass grafting (CABG × 3) for severe triple-vessel coronary artery disease. The procedure utilized the left internal mammary artery (LIMA) to the left anterior descending artery (LAD), and saphenous vein grafts to the right coronary artery (RCA) and obtuse marginal (OM) branch.

The sternotomy incision (chest bone) requires 6-8 weeks to heal completely. Sternal precautions must be observed: no pushing, pulling, or lifting objects >10 lbs; use a pillow for cough support; avoid arm exercises that stress the chest.

Post-operative management includes antiplatelet therapy (aspirin + clopidogrel), beta-blockers, ACE inhibitors, and statins. Cardiac rehabilitation is essential for optimal recovery and should begin within 2-3 weeks. Expect gradual return to activities: walking increases weekly, driving resumed at 4-6 weeks (physician clearance required), return to work at 8-12 weeks depending on job demands.

Monitor for signs of infection (fever >100.4°F, wound drainage, increased redness) and report immediately.`,
    },
    'home-nurse': {
      simple: `Patient discharged post-ORIF (surgery to fix a broken hip with pins and plates). Surgery successful, no complications noted. Weight-bearing status: partial weight-bearing on affected leg with walker.

Primary care focus: wound care, pain management, DVT prevention, and mobility assistance. Patient should use walker for all transfers and ambulation. Physical therapy scheduled 3x/week starting next week.

Monitor surgical site for infection signs. Continue anticoagulation therapy as prescribed to prevent blood clots.`,
      detailed: `Patient Status: Post-operative day 3 following open reduction internal fixation (ORIF) of left femoral neck fracture. Surgical approach: anterior, with cannulated screw fixation. Procedure tolerated well; estimated blood loss 200mL.

Weight-Bearing Orders: Partial weight-bearing (50% body weight) on left lower extremity with front-wheeled walker. Fall precautions in place.

Medication Regimen:
- Pain: Oxycodone 5mg PO q4-6h PRN (moderate-severe); Acetaminophen 1000mg PO q6h scheduled
- DVT prophylaxis: Enoxaparin 40mg SQ daily × 4 weeks
- Constipation prevention: Docusate 100mg PO BID

Wound Care: Surgical incision with staples, clean and dry. Dressing changes daily; assess for erythema, warmth, purulent drainage, or dehiscence. Staple removal scheduled for post-op day 14.

Rehabilitation: PT/OT 3×/week focusing on: transfers, gait training with walker, ADL retraining, progressive strengthening. Occupational therapy for adaptive equipment and home safety assessment.

Monitoring Parameters: Vital signs daily, neurovascular checks of affected extremity BID (pulse, sensation, motor function, color, temperature), pain levels. Report fever >101°F, wound changes, severe pain uncontrolled by medications, or signs of DVT (calf swelling, warmth, positive Homan's sign).`,
    },
  };

  const checklists: Record<CaregiverType, string[]> = {
    parent: [
      'Give pain medicine 30 minutes before activity or bedtime',
      'Check temperature twice daily (call if over 100.4°F)',
      'Keep bandages clean and dry (can shower after 48 hours)',
      'Offer small, frequent meals - avoid heavy or greasy foods',
      'Encourage rest but allow light walking around the house',
      'No swimming or bathing (showers OK) until follow-up appointment',
    ],
    spouse: [
      'Help with daily walks - start with 5 minutes, add 5 min every few days',
      'Give all medications on time using the medication list',
      'Check incision daily for redness, swelling, or drainage',
      'Weigh daily at same time - report 2+ pound gain in 24 hours',
      'Help with deep breathing exercises (10 breaths every 2 hours)',
      'Monitor blood pressure daily and record in log',
      'Prepare heart-healthy, low-sodium meals (<2000mg sodium/day)',
      'Ensure adequate rest - 8-10 hours sleep plus afternoon nap',
    ],
    'home-nurse': [
      'Vital signs monitoring: BP, HR, Temp, O2 sat - daily or per orders',
      'Assess surgical site: measure wound, document drainage, photograph if indicated',
      'Administer medications per MAR; verify patient understanding',
      'DVT assessment: measure calf circumference bilaterally, assess for pain/swelling',
      'Assist with PT exercises and mobility per therapy plan',
      'Pain assessment using 0-10 scale before and after interventions',
      'Bowel movement tracking - implement bowel protocol if no BM × 3 days',
      'Patient/family education: infection signs, medication side effects, emergency contacts',
    ],
  };

  const warnings: Record<CaregiverType, string[]> = {
    parent: [
      'Fever above 100.4°F or chills',
      'Redness, swelling, or pus coming from the incisions',
      'Severe belly pain that gets worse or doesn\'t improve with medicine',
      'Vomiting that won\'t stop or can\'t keep liquids down',
      'No urination for 12+ hours',
    ],
    spouse: [
      'Chest pain or pressure (call 911 immediately)',
      'Shortness of breath that\'s new or getting worse',
      'Irregular heartbeat or heart racing',
      'Sudden weight gain (2+ pounds in one day)',
      'Swelling in legs or feet that\'s new or worsening',
      'Fever over 100.4°F, or incision has redness, warmth, or drainage',
      'Extreme fatigue or dizziness when standing',
    ],
    'home-nurse': [
      'Acute chest pain, dyspnea, or hemodynamic instability (activate EMS)',
      'Signs of surgical site infection: purulent drainage, erythema >2cm, warmth, fever',
      'DVT indicators: unilateral calf swelling, positive Homan\'s sign, warmth',
      'Neurovascular compromise: diminished pulses, pallor, paresthesia, paralysis',
      'Uncontrolled pain (>7/10) despite medication adherence',
      'Altered mental status or acute confusion',
      'Evidence of hardware failure: sudden increase in pain, deformity, loss of function',
    ],
  };

  const questions: Record<CaregiverType, string[]> = {
    parent: [
      'When can they return to school?',
      'What activities are safe and which should they avoid?',
      'How long will they need pain medication?',
      'When should we schedule the follow-up appointment?',
      'Are there any foods they should avoid?',
      'When can they take a bath or go swimming?',
    ],
    spouse: [
      'When is it safe to resume sexual activity?',
      'What heart rate is safe during exercise?',
      'How will we know if the bypass grafts are working well?',
      'What are the long-term dietary restrictions?',
      'When can driving be resumed safely?',
      'What symptoms mean we should call the cardiologist versus going to the ER?',
      'How long will they need to take blood thinners?',
    ],
    'home-nurse': [
      'What are the parameters for escalating care to physician versus ED?',
      'When should weight-bearing status be advanced?',
      'Are there specific labs that need monitoring (CBC, PT/INR, renal function)?',
      'What is the transition plan from home health to outpatient PT?',
      'When should staples be removed and by whom?',
      'What is the protocol for breakthrough pain management?',
      'Are there any specific comorbidities that affect post-op course?',
    ],
  };

  return {
    summary: summaries[caregiverType][explanationLevel],
    checklist: checklists[caregiverType],
    warnings: warnings[caregiverType],
    questions: questions[caregiverType],
  };
}
