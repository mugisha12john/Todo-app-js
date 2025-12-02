// theme-toggle.js
const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

const storedTheme = localStorage.getItem("theme"); // "dark" or "light" or null
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Resolve initial theme: stored > system > default light
const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");

if (initialTheme === "dark") {
  root.classList.add("dark");
  toggleBtn.setAttribute("aria-pressed", "true");
} else {
  root.classList.remove("dark");
  toggleBtn.setAttribute("aria-pressed", "false");
}

toggleBtn.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleBtn.setAttribute("aria-pressed", String(isDark));
});
