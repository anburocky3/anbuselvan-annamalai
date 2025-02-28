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

export const ANALYTICS_ACTIONS = {
  REVEAL_EMAIL: "reveal_email",
  MENU_CLICK: "menu_click",
  DOWNLOAD_RESUME: "download_resume",
  SOCIAL_LINK_CLICK: "social_link_click",
  FORM_SUBMIT: "form_submit",
  SECTION_VIEW: "section_view",
  PORTFOLIO_VIEW: "portfolio_view",
  CONTACT_INITIATE: "contact_initiate",
} as const;

export const ANALYTICS_CATEGORIES = {
  NAVIGATION: "navigation",
  INTERACTION: "interaction",
  ENGAGEMENT: "engagement",
  SOCIAL: "social",
} as const;

type EventParams = {
  action: (typeof ANALYTICS_ACTIONS)[keyof typeof ANALYTICS_ACTIONS];
  category: (typeof ANALYTICS_CATEGORIES)[keyof typeof ANALYTICS_CATEGORIES];
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

// Example usage:
// trackEvent({
//   action: 'click',
//   category: ANALYTICS_CATEGORIES.NAVIGATION,
//   label: 'Home Menu',
// });
