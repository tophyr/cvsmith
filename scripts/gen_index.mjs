import fs from "node:fs";

const cv = JSON.parse(fs.readFileSync("public/data/cv.json", "utf8"));

const template = fs.readFileSync("index.html.template", "utf8");

function prependHttp(url) {
  return url.startsWith("http") ? url : `https://${url}`
}

function prependWww(url) {
  return url.startsWith("www.") ? url : `www.${url}`
}

function appendSlash(url) {
  return url.endsWith("/") ? url : `${url}/`
}

// Decide what you want to expose from cv.json
const title = cv.name;
const ogTitle = `${cv.name}: ${cv.title}`.trim();
const ogDesc = cv.contact_info.website;
const ogUrl = prependHttp(prependWww(appendSlash(cv.contact_info.website)))

const out = template
  .replaceAll("__TITLE__", escapeHtml(title))
  .replaceAll("__OG_TITLE__", escapeHtml(ogTitle))
  .replaceAll("__OG_DESC__", escapeHtml(ogDesc))
  .replaceAll("__OG_URL__", escapeHtml(ogUrl))

fs.writeFileSync("index.html", out);

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
