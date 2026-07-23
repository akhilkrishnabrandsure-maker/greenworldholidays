const WHATSAPP_NUMBER = '918075438808';

export function getDestinationWhatsAppUrl(destinationName: string, context: 'learn-more' | 'enquire' = 'learn-more'): string {
  const message =
    context === 'enquire'
      ? `Hi! I'm interested in ${destinationName}. Please share more details.`
      : `Hi! I'm interested in learning more about the ${destinationName} travel package. Could you please provide more details about the itinerary and pricing?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCustomPackageWhatsAppUrl(): string {
  const message =
    'Hi! I need a custom destination package. Could you please help me create a personalized travel experience?';

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
