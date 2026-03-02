/**
 * Flatten nested locale object to dot-notation keys.
 * Strings stay as-is; arrays/objects are JSON.stringify'd so they can be stored in DB.
 */
export function flattenLocale(obj: unknown, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj === null || obj === undefined) return out;
  if (typeof obj === "string") {
    if (prefix) out[prefix] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    if (prefix) out[prefix] = JSON.stringify(obj);
    return out;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (typeof v === "string") {
        out[key] = v;
      } else if (Array.isArray(v) || (v !== null && typeof v === "object")) {
        out[key] = JSON.stringify(v);
      } else if (v !== null && v !== undefined) {
        out[key] = String(v);
      }
    }
    return out;
  }
  return out;
}

/**
 * Recursively flatten so nested objects become dot keys (e.g. notFound.quickLinks.home).
 */
export function flattenLocaleDeep(obj: unknown, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj === null || obj === undefined) return out;
  if (typeof obj === "string") {
    if (prefix) out[prefix] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    if (prefix) out[prefix] = JSON.stringify(obj);
    return out;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (typeof v === "string") {
        out[key] = v;
      } else if (v !== null && typeof v === "object") {
        Object.assign(out, flattenLocaleDeep(v, key));
      } else if (v !== null && v !== undefined) {
        out[key] = String(v);
      }
    }
    return out;
  }
  return out;
}

/** Get unique section names (first segment of each key) in a stable order. */
export function getSectionsFromFlatKeys(flatKeys: string[]): string[] {
  const seen = new Set<string>();
  const sections: string[] = [];
  const order = [
    "common",
    "nav",
    "header",
    "menu",
    "footer",
    "preFooter",
    "notFound",
    "alt",
    "home",
    "services",
    "about",
    "contact",
    "projects",
    "resources",
    "faq",
    "leo",
    "approche",
    "hero",
    "capabilities",
    "manifesto",
    "trinity",
    "cta",
    "testimonials",
    "whoWeServe",
    "clients",
    "startProject",
    "expertise",
    "artsCulture",
    "agencies",
    "media",
    "lab",
    "bureau",
    "studio",
    "seo",
    "pwa",
    "other",
  ];
  const orderSet = new Set(order);
  for (const o of order) {
    if (flatKeys.some((k) => k.startsWith(o + ".") || k === o)) {
      seen.add(o);
      sections.push(o);
    }
  }
  for (const key of flatKeys) {
    const seg = key.split(".")[0];
    if (seg && !seen.has(seg)) {
      seen.add(seg);
      sections.push(seg);
    }
  }
  return sections;
}

/** Filter flat keys that belong to a section (prefix match). */
export function getKeysInSection(flatKeys: string[], section: string): string[] {
  return flatKeys.filter((k) => k === section || k.startsWith(section + ".")).sort();
}
