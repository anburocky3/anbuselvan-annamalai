export type ChatSfx = "popup" | "mic-start" | "mic-stop";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  return audioContext;
}

export function playChatSfx(type: ChatSfx): void {
  try {
    const context = getAudioContext();
    if (!context) return;
    void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const isMic = type !== "popup";
    const startFrequency =
      type === "mic-stop" ? 440 : type === "mic-start" ? 520 : 660;
    const endFrequency =
      type === "mic-stop" ? 330 : type === "mic-start" ? 740 : 880;
    const duration = isMic ? 0.12 : 0.2;
    const now = context.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      endFrequency,
      now + duration,
    );
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(isMic ? 0.045 : 0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch {
    // Browsers can block audio until the visitor interacts with the page.
  }
}
