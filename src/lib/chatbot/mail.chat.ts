export const OWNER_EMAIL = "anbu@cyberdudenetworks.com";

interface MailtoParams {
  visitorEmail: string;
  question: string;
}

export function buildMailto({ visitorEmail, question }: MailtoParams) {
  const subject = "Portfolio Chatbot Question";
  const body = [
    "Hello Anbu,",
    "",
    "Question from your portfolio chatbot:",
    question,
    "",
    `Reply to: ${visitorEmail}`,
  ].join("\n");

  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function buildGmailCompose({ visitorEmail, question }: MailtoParams) {
  const subject = "Portfolio Chatbot Question";
  const body = [
    "Hello Anbu,",
    "",
    "Question from your portfolio chatbot:",
    question,
    "",
    `Reply to: ${visitorEmail}`,
  ].join("\n");

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: OWNER_EMAIL,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildOutlookCompose({ visitorEmail, question }: MailtoParams) {
  const subject = "Portfolio Chatbot Question";
  const body = [
    "Hello Anbu,",
    "",
    "Question from your portfolio chatbot:",
    question,
    "",
    `Reply to: ${visitorEmail}`,
  ].join("\n");

  const params = new URLSearchParams({
    to: OWNER_EMAIL,
    subject,
    body,
  });

  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

export function openMailtoLink(href: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
