export const SITE_URL =
  process.env.REACT_APP_SITE_URL || "https://www.samiur.dev";

export const RESUME_PATH = "/Samiur_Rahman_Resume.pdf";
export const RESUME_FILENAME = "Samiur_Rahman_Resume.pdf";
export const RESUME_URL = `${SITE_URL}${RESUME_PATH}`;

/** Open resume in a new tab and trigger download (same as original behavior). */
export function openResume() {
  window.open(RESUME_PATH, "_blank", "noopener,noreferrer");
  const link = document.createElement("a");
  link.href = RESUME_PATH;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export const CONTACT_EMAIL =
  process.env.REACT_APP_CONTACT_EMAIL || "srahman96@gatech.edu";

/** POST endpoint for the Ask Me Anything feature (Vercel serverless or local proxy). */
export const API_SEARCH_URL =
  process.env.REACT_APP_API_SEARCH_URL || "/api/search";
