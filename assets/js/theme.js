/**
 * Theme switcher supporting light, dark, and system preference
 * Compatible with al-folio data-theme and data-theme-setting specifications
 */

(function () {
  function getStoredTheme() {
    return localStorage.getItem("theme") || "system";
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function resolveTheme(setting) {
    if (setting === "system") {
      return getSystemTheme();
    }
    return setting;
  }

  function updateIcons(setting, activeTheme) {
    const icon = document.getElementById("theme-toggle-icon");
    if (!icon) return;

    if (setting === "system") {
      icon.className = activeTheme === "dark" ? "fa-solid fa-circle-half-stroke" : "fa-solid fa-circle-half-stroke";
      icon.title = "Current: System theme (" + activeTheme + ")";
    } else if (setting === "dark") {
      icon.className = "fa-solid fa-moon";
      icon.title = "Current: Dark mode";
    } else {
      icon.className = "fa-solid fa-sun";
      icon.title = "Current: Light mode";
    }
  }

  window.applyTheme = function (setting) {
    if (!setting) {
      setting = getStoredTheme();
    }
    const resolved = resolveTheme(setting);
    document.documentElement.setAttribute("data-theme-setting", setting);
    document.documentElement.setAttribute("data-theme", resolved);
    updateIcons(setting, resolved);
  };

  window.toggleTheme = function () {
    const current = getStoredTheme();
    let next = "light";
    if (current === "light") {
      next = "dark";
    } else if (current === "dark") {
      next = "system";
    } else {
      next = "light";
    }
    localStorage.setItem("theme", next);
    window.applyTheme(next);
  };

  // Immediate execution before DOM is parsed to prevent flickering
  const initial = getStoredTheme();
  const resolved = resolveTheme(initial);
  document.documentElement.setAttribute("data-theme-setting", initial);
  document.documentElement.setAttribute("data-theme", resolved);

  // Listen to OS system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (getStoredTheme() === "system") {
      window.applyTheme("system");
    }
  });

  // Once DOM is loaded, setup button
  document.addEventListener("DOMContentLoaded", function () {
    updateIcons(getStoredTheme(), resolveTheme(getStoredTheme()));
  });
})();
