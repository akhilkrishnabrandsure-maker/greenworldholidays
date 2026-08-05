import { NextResponse } from 'next/server';

// Simple in-memory rate limiting
// Note: In a true serverless environment, this resets per instance.
// For robust rate limiting, use Redis (e.g., Upstash) in production.
interface RateLimitData {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitData>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((value, key) => {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  });
}, RATE_LIMIT_WINDOW_MS);

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate Limiting Check
    if (!checkRateLimit(ip)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[RateLimit] Blocked request from IP: ${ip}`);
      }
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const payload = await request.json();

    // Development Logging
    if (process.env.NODE_ENV === 'development') {
      console.log('\n--- Incoming Enquiry Payload ---');
      console.log(JSON.stringify(payload, null, 2));
      console.log('--------------------------------\n');
    }

    // Validation
    if (!payload.name || !payload.phone || !payload.source) {
      return NextResponse.json(
        { success: false, message: 'Name, phone, and source are required fields.' },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    
    const isValidUrl = (url?: string) => {
      if (!url) return false;
      if (url.includes('<I_WILL_PROVIDE') || url.includes('YOUR_') || url.includes('PLACEHOLDER')) return false;
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    };

    if (!isValidUrl(scriptUrl)) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Configuration Error] GOOGLE_SCRIPT_URL is invalid or still set to a placeholder.');
      }
      return NextResponse.json(
        { 
          success: false, 
          message: 'Google Sheets URL is missing or invalid. Please update GOOGLE_SCRIPT_URL in .env.local with your actual Google Apps Script Web App URL.' 
        },
        { status: 400 }
      );
    }

    // Add server-side metadata
    const enrichedPayload = {
      ...payload,
      serverTime: new Date().toISOString(),
      clientIp: ip
    };

    let attempt = 0;
    let isSuccess = false;
    let lastError: any = null;
    let responseStatus = 0;
    let responseBodyText = '';

    const startTime = Date.now();

    // Forward to Google Apps Script with 1 retry
    while (attempt < 2 && !isSuccess) {
      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enrichedPayload),
          cache: 'no-store'
        });

        responseStatus = response.status;
        responseBodyText = await response.text();

        if (response.ok) {
          try {
            const jsonRes = JSON.parse(responseBodyText);
            if (jsonRes.success === true) {
              isSuccess = true;
            } else {
              isSuccess = false;
              lastError = new Error(jsonRes.message || 'Apps Script returned success: false');
            }
          } catch (e) {
            // It didn't return JSON. If it returned an HTML page (like a Google Login), it's a failure.
            if (responseBodyText.includes('<html') || responseBodyText.includes('<body')) {
              isSuccess = false;
              lastError = new Error('Apps Script returned HTML instead of JSON. Ensure Web App is deployed as "Anyone".');
            } else {
              // Maybe it just returned text "Success" or something.
              isSuccess = true;
            }
          }
        } else {
          lastError = new Error(`HTTP Error: ${response.status} ${response.statusText}`);
          attempt++;
          if (attempt < 2) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err: any) {
        lastError = err;
        attempt++;
        if (attempt < 2) await new Promise(r => setTimeout(r, 1000));
      }
    }

    const executionTime = Date.now() - startTime;

    // Development Logging
    if (process.env.NODE_ENV === 'development') {
      const maskedUrl = scriptUrl.substring(0, 30) + '...';
      console.log(`[Google Sheets Integration] URL: ${maskedUrl}`);
      console.log(`[Google Sheets Integration] Execution Time: ${executionTime}ms`);
      console.log(`[Google Sheets Integration] Status: ${responseStatus}`);
      if (!isSuccess) {
        console.error(`[Google Sheets Integration] Error:`, lastError?.message || responseBodyText);
        console.error(`[Google Sheets Integration] Response Body:`, responseBodyText);
      }
    }

    if (isSuccess) {
      return NextResponse.json({ success: true });
    } else {
      const errorMsg = lastError?.message || responseBodyText || 'Unknown Error';
      return NextResponse.json(
        { 
          success: false, 
          message: `API Error: ${errorMsg}` 
        },
        { status: 502 }
      );
    }

  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Route Error]', error);
    }
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
