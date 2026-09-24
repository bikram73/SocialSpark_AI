/**
 * End-to-End Test Suite for SocialSpark AI
 * Validates API endpoints, input validation, prompt handling, fallback mechanisms, and preset integrity.
 */

import http from 'http';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
  details?: any;
}

const results: TestResult[] = [];

function makeRequest(options: http.RequestOptions, postData?: any): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode || 0, body: parsed });
        } catch {
          resolve({ status: res.statusCode || 0, body: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting SocialSpark AI End-to-End Test Suite');
  console.log('====================================================\n');

  const baseOptions: http.RequestOptions = {
    hostname: 'localhost',
    port: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 1. Health Check Test
  try {
    const res = await makeRequest({ ...baseOptions, path: '/api/health', method: 'GET' });
    const passed = res.status === 200 && res.body?.status === 'ok';
    results.push({
      suite: 'Health Check',
      name: 'GET /api/health responds with 200 and status ok',
      passed,
      details: res.body,
    });
  } catch (err: any) {
    results.push({
      suite: 'Health Check',
      name: 'GET /api/health responds with 200 and status ok',
      passed: false,
      error: err.message,
    });
  }

  // 2. Input Validation Tests
  const validationTestCases = [
    {
      name: 'Rejects empty brand name with 400',
      payload: { brandName: '', businessCategory: 'Fitness', targetAudience: 'Students', brandVoice: 'Friendly', platforms: ['Instagram'] },
      expectedStatus: 400,
    },
    {
      name: 'Rejects 1-character brand name with 400',
      payload: { brandName: 'A', businessCategory: 'Fitness', targetAudience: 'Students', brandVoice: 'Friendly', platforms: ['Instagram'] },
      expectedStatus: 400,
    },
    {
      name: 'Rejects missing business category with 400',
      payload: { brandName: 'FitLife', businessCategory: '', targetAudience: 'Students', brandVoice: 'Friendly', platforms: ['Instagram'] },
      expectedStatus: 400,
    },
    {
      name: 'Rejects missing target audience with 400',
      payload: { brandName: 'FitLife', businessCategory: 'Fitness', targetAudience: '', brandVoice: 'Friendly', platforms: ['Instagram'] },
      expectedStatus: 400,
    },
    {
      name: 'Rejects missing brand voice with 400',
      payload: { brandName: 'FitLife', businessCategory: 'Fitness', targetAudience: 'Students', brandVoice: '', platforms: ['Instagram'] },
      expectedStatus: 400,
    },
    {
      name: 'Rejects empty platforms array with 400',
      payload: { brandName: 'FitLife', businessCategory: 'Fitness', targetAudience: 'Students', brandVoice: 'Friendly', platforms: [] },
      expectedStatus: 400,
    },
    {
      name: 'Rejects instructions exceeding 500 characters with 400',
      payload: {
        brandName: 'FitLife',
        businessCategory: 'Fitness',
        targetAudience: 'Students',
        brandVoice: 'Friendly',
        platforms: ['Instagram'],
        additionalInstructions: 'x'.repeat(501),
      },
      expectedStatus: 400,
    },
  ];

  for (const tc of validationTestCases) {
    try {
      const res = await makeRequest({ ...baseOptions, path: '/api/generate', method: 'POST' }, tc.payload);
      const passed = res.status === tc.expectedStatus;
      results.push({
        suite: 'Input Validation',
        name: tc.name,
        passed,
        details: res.body,
      });
    } catch (err: any) {
      results.push({
        suite: 'Input Validation',
        name: tc.name,
        passed: false,
        error: err.message,
      });
    }
  }

  // 3. Complete 7-Day Strategy Generation Test
  try {
    const payload = {
      brandName: 'FitLife Global',
      businessCategory: 'Fitness & Wellness',
      targetAudience: 'College Students & Busy Professionals',
      brandVoice: 'Friendly and Motivational',
      contentThemes: 'Quick Home Workouts, High-Protein Meals, Mindset',
      platforms: ['Instagram', 'LinkedIn', 'X (Twitter)'],
      primaryGoal: 'Drive App Installs and Daily Engagement',
      additionalInstructions: 'Emphasize 20-minute bodyweight routines for dorms and home offices.',
    };

    const res = await makeRequest({ ...baseOptions, path: '/api/generate', method: 'POST' }, payload);
    const body = res.body;

    const hasStrategy = typeof body.strategy === 'string' && body.strategy.length > 20;
    const hasPillars = Array.isArray(body.pillars) && body.pillars.length >= 3;
    const hasTips = Array.isArray(body.tips) && body.tips.length >= 3;
    const has7Days = Array.isArray(body.calendar) && body.calendar.length === 7;

    const expectedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const allDaysCorrect = has7Days && body.calendar.every((item: any, i: number) => item.day.toLowerCase() === expectedDays[i].toLowerCase());
    const allFieldsPresent = has7Days && body.calendar.every((item: any) =>
      item.day && item.platform && item.contentType && item.idea && item.time && item.cta && item.caption && Array.isArray(item.hashtags) && item.hashtags.length > 0
    );

    const passed = res.status === 200 && hasStrategy && hasPillars && hasTips && allDaysCorrect && allFieldsPresent;

    results.push({
      suite: 'Core Strategy Generation',
      name: 'Generates complete 7-day strategy with valid schema and all required fields',
      passed,
      details: {
        strategyLength: body?.strategy?.length,
        pillarsCount: body?.pillars?.length,
        tipsCount: body?.tips?.length,
        daysCount: body?.calendar?.length,
        isFallback: body?.isFallback,
        source: body?.source,
      },
    });
  } catch (err: any) {
    results.push({
      suite: 'Core Strategy Generation',
      name: 'Generates complete 7-day strategy with valid schema and all required fields',
      passed: false,
      error: err.message,
    });
  }

  // 4. Unicode, Emojis, & Punctuation Robustness Test
  try {
    const unicodePayload = {
      brandName: '✨ Café Renée & Co. ☕',
      businessCategory: 'Artisanal Coffee & Pâtisserie',
      targetAudience: 'Urban Foodies & Remote Workers 🥐',
      brandVoice: 'Sophisticated & Welcoming',
      contentThemes: 'Single-origin brews, sourdough croissants, hygge',
      platforms: ['Instagram', 'Pinterest'],
      primaryGoal: 'Weekend Table Reservations & Brand Love',
      additionalInstructions: 'Highlight autumn signature drinks: Pumpkin spiced matcha latte with oat foam. 🍁',
    };

    const res = await makeRequest({ ...baseOptions, path: '/api/generate', method: 'POST' }, unicodePayload);
    const body = res.body;

    const passed = res.status === 200 &&
      Array.isArray(body.calendar) &&
      body.calendar.length === 7 &&
      body.calendar.some((c: any) => c.caption.includes('Café Renée') || c.caption.length > 30);

    results.push({
      suite: 'Unicode & Robustness',
      name: 'Handles emojis, accented characters (é, ê), and ampersands without malformation',
      passed,
      details: { brandName: unicodePayload.brandName, status: res.status },
    });
  } catch (err: any) {
    results.push({
      suite: 'Unicode & Robustness',
      name: 'Handles emojis, accented characters, and ampersands without malformation',
      passed: false,
      error: err.message,
    });
  }

  // 5. Example Presets Integrity Verification (Section 27)
  const presets = [
    { name: 'FitLife', category: 'Fitness', voice: 'Friendly and Motivational' },
    { name: 'EcoSphere Tech', category: 'CleanTech & Renewable Energy', voice: 'Professional & Authoritative' },
    { name: 'Artisan Bakehouse', category: 'Bakery & Café', voice: 'Friendly & Approachable' },
    { name: 'NovaFin', category: 'FinTech & Personal Finance', voice: 'Professional & Authoritative' },
    { name: 'Bloom & Wild Florals', category: 'Floral Design & Gifts', voice: 'Inspirational & Bold' },
    { name: 'NextWave Apparel', category: 'Sustainable Fashion', voice: 'Inspirational & Bold' },
  ];

  for (const preset of presets) {
    try {
      const res = await makeRequest({ ...baseOptions, path: '/api/generate', method: 'POST' }, {
        brandName: preset.name,
        businessCategory: preset.category,
        targetAudience: 'Target Customers',
        brandVoice: preset.voice,
        platforms: ['Instagram', 'LinkedIn'],
        primaryGoal: 'Brand Growth',
      });
      const passed = res.status === 200 && res.body?.calendar?.length === 7;
      results.push({
        suite: 'Preset Verification',
        name: `Generates valid 7-day plan for preset: ${preset.name}`,
        passed,
      });
    } catch (err: any) {
      results.push({
        suite: 'Preset Verification',
        name: `Generates valid 7-day plan for preset: ${preset.name}`,
        passed: false,
        error: err.message,
      });
    }
  }

  // 6. Single Post Refresh Endpoint Test
  try {
    const refreshPayload = {
      day: 'Wednesday',
      platform: 'Instagram',
      contentType: 'Carousel Guide',
      idea: '5 Morning Habits for Peak Focus',
      brandName: 'FitLife',
      brandVoice: 'Motivational',
    };

    const res = await makeRequest({ ...baseOptions, path: '/api/refresh-post', method: 'POST' }, refreshPayload);
    const passed = res.status === 200 &&
      typeof res.body?.caption === 'string' &&
      res.body.caption.length > 10 &&
      Array.isArray(res.body?.hashtags) &&
      res.body.hashtags.length > 0;

    results.push({
      suite: 'Single Post Refresh',
      name: 'POST /api/refresh-post successfully generates refreshed caption and hashtags',
      passed,
      details: res.body,
    });
  } catch (err: any) {
    results.push({
      suite: 'Single Post Refresh',
      name: 'POST /api/refresh-post successfully generates refreshed caption and hashtags',
      passed: false,
      error: err.message,
    });
  }

  // 7. Refresh Endpoint Validation
  try {
    const res = await makeRequest({ ...baseOptions, path: '/api/refresh-post', method: 'POST' }, {});
    const passed = res.status === 400;
    results.push({
      suite: 'Single Post Refresh',
      name: 'POST /api/refresh-post rejects missing parameters with 400',
      passed,
    });
  } catch (err: any) {
    results.push({
      suite: 'Single Post Refresh',
      name: 'POST /api/refresh-post rejects missing parameters with 400',
      passed: false,
      error: err.message,
    });
  }

  // Report Results
  console.log('\n====================================================');
  console.log('📊 Test Execution Summary');
  console.log('====================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  for (const r of results) {
    if (r.passed) {
      passedCount++;
      console.log(`  ✅ [PASS] [${r.suite}] ${r.name}`);
    } else {
      failedCount++;
      console.error(`  ❌ [FAIL] [${r.suite}] ${r.name}`);
      if (r.error) console.error(`     Error: ${r.error}`);
      if (r.details) console.error(`     Details:`, r.details);
    }
  }

  console.log('\n----------------------------------------------------');
  console.log(`Total Tests Run: ${results.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Pass Rate: ${Math.round((passedCount / results.length) * 100)}%`);
  console.log('====================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests();
