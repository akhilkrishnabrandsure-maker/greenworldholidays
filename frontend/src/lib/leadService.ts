export interface EnquiryData {
  name?: string;
  phone: string;
  email?: string;
  destination?: string;
  package?: string;
  vehicle?: string;
  pickup?: string;
  travelDate?: string;
  travellers?: string;
  message?: string;
  source: string;
}

export interface LeadResponse {
  success: boolean;
  message?: string;
}

function generateLeadId(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `GWH-${yyyy}${mm}${dd}-${randomNum}`;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('gwh_session_id');
  if (!sessionId) {
    sessionId = `sess_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('gwh_session_id', sessionId);
  }
  return sessionId;
}

function getDeviceType(userAgent: string): string {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) return 'Tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) return 'Mobile';
  return 'Desktop';
}

function getBrowserName(userAgent: string): string {
  if (userAgent.indexOf("Firefox") > -1) return "Firefox";
  if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
  if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
  if (userAgent.indexOf("Trident") > -1) return "Internet Explorer";
  if (userAgent.indexOf("Edge") > -1) return "Edge";
  if (userAgent.indexOf("Chrome") > -1) return "Chrome";
  if (userAgent.indexOf("Safari") > -1) return "Safari";
  return "Unknown";
}

export async function saveEnquiry(data: EnquiryData): Promise<LeadResponse> {
  if (typeof window === 'undefined') return { success: false, message: 'Server-side call' };

  // Duplicate Check
  const lastSubmissionKey = `last_enquiry_${data.phone}`;
  const lastSubmissionStr = sessionStorage.getItem(lastSubmissionKey);
  if (lastSubmissionStr) {
    const lastSubmissionTime = parseInt(lastSubmissionStr, 10);
    const timeDiff = Date.now() - lastSubmissionTime;
    if (timeDiff < 5 * 60 * 1000) { // 5 minutes
      return { 
        success: false, 
        message: "You've recently submitted an enquiry. Our team will contact you shortly."
      };
    }
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userAgent = navigator.userAgent;

    const payload = {
      ...data,
      leadId: generateLeadId(),
      sessionId: getSessionId(),
      pageUrl: window.location.href,
      pageTitle: document.title,
      clientTime: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      device: getDeviceType(userAgent),
      browser: getBrowserName(userAgent),
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmTerm: urlParams.get('utm_term') || '',
      utmContent: urlParams.get('utm_content') || '',
      status: 'New'
    };

    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      sessionStorage.setItem(lastSubmissionKey, Date.now().toString());
      return { success: true };
    } else {
      return { 
        success: false, 
        message: result.message || "There was a problem submitting your enquiry."
      };
    }
  } catch (err) {
    return { success: false, message: "An unexpected network error occurred. Please try again." };
  }
}
