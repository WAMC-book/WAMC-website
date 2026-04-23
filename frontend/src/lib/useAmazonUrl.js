import { useEffect, useState } from "react";
import { AMAZON_URLS } from "@/lib/constants";

const CA_TZ_HINTS = [
  "Toronto",
  "Montreal",
  "Vancouver",
  "Edmonton",
  "Halifax",
  "Winnipeg",
  "Regina",
  "St_Johns",
  "Moncton",
];

function detectRegion() {
  if (typeof navigator === "undefined") return "us";
  try {
    const lang = (navigator.language || "").toLowerCase();
    if (lang.endsWith("-ca") || lang === "fr-ca" || lang === "en-ca") return "ca";
    const langs = navigator.languages || [];
    if (langs.some((l) => l.toLowerCase().endsWith("-ca"))) return "ca";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (CA_TZ_HINTS.some((h) => tz.includes(h))) return "ca";
  } catch {
    return "us";
  }
  return "us";
}

export default function useAmazonUrl() {
  // Amazon USA is always the primary selling page; Canada is offered as an alt
  const primary = AMAZON_URLS.us;
  const alt = AMAZON_URLS.ca;
  const altLabel = "Amazon Canada";
  const primaryLabel = "Amazon USA";

  return { region: "us", primary, alt, altLabel, primaryLabel };
}
