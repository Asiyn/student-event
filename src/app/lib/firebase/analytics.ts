import { firebaseApp } from "./client";

export async function initAnalytics() {
  if (typeof window === "undefined") return null;

  const analytics = await import("firebase/analytics");
  const supported = await analytics.isSupported();
  if (!supported) return null;

  return analytics.getAnalytics(firebaseApp);
}
