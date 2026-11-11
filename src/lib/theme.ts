// Shared by the toggle and by the inline script that runs before the first paint.
export const THEME_KEY = "shopboard-theme-v1";

// Runs in <head> so the page never flashes the wrong theme. Saved choice first, then the system's.
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;
