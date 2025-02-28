declare global {
  interface Window {
    gtag: (
      command: "event",
      action: string,
      params: {
        event_category: string;
        event_label?: string;
        value?: number;
      }
    ) => void;
  }
}

type EventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const trackEvent = ({ action, category, label, value }: EventParams) => {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// Predefined event categories
export const ANALYTICS_CATEGORIES = {
  NAVIGATION: "Navigation",
  INTERACTION: "Interaction",
  ENGAGEMENT: "Engagement",
  SOCIAL: "Social",
} as const;

// Example usage:
// trackEvent({
//   action: 'click',
//   category: ANALYTICS_CATEGORIES.NAVIGATION,
//   label: 'Home Menu',
// });
