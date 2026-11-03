/**
 * Main application scripts for addy79.github.io
 * Handles scroll progress, category filtering, interactive project pinning, BibTeX copying, and abstract toggling.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Scroll progress bar
  const progressBar = document.getElementById("progress");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      progressBar.value = progress;
    });
  }

  // 2. Interactive Project Pinning & Filtering
  initProjectPinning();

  // 3. Navbar Mobile Toggle
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector("#navbarNav");
  if (toggler && collapse) {
    toggler.addEventListener("click", function () {
      collapse.classList.toggle("show");
    });
  }
});

function getPinnedProjects() {
  const saved = localStorage.getItem("pinned_projects");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  // Default pinned projects
  return [
    "pioneer-rov",
    "self-balancing",
    "quadruped",
    "micromouse",
    "scara-robot",
    "digitwin1",
    "stm32-foc",
    "haptic-stylus",
    "delta-vision-sorter",
    "cnc-wire-bender",
    "brushlesslab",
    "vrmechanics",
    "mmlab-vr",
    "calc-vr",
    "vrscent"
  ];
}

function savePinnedProjects(list) {
  localStorage.setItem("pinned_projects", JSON.stringify(list));
}

function togglePin(projectId) {
  let pinned = getPinnedProjects();
  if (pinned.includes(projectId)) {
    pinned = pinned.filter(id => id !== projectId);
    showToast(`Unpinned project.`);
  } else {
    pinned.push(projectId);
    showToast(`Pinned project to Featured!`);
  }
  savePinnedProjects(pinned);
  updatePinUI();

  // If currently on pinned filter, refresh filter
  const activeBtn = document.querySelector(".filter-btn.active");
  if (activeBtn && activeBtn.getAttribute("data-filter") === "filter-pinned") {
    applyFilter("filter-pinned");
  }
}

function updatePinUI() {
  const pinned = getPinnedProjects();
  document.querySelectorAll(".project-grid-item").forEach(card => {
    const id = card.id;
    const pinBtn = card.querySelector(".btn-pin");
    if (pinBtn) {
      if (pinned.includes(id)) {
        pinBtn.innerHTML = '<i class="fa-solid fa-star text-warning"></i> Pinned';
        pinBtn.classList.add("pinned");
        card.classList.add("filter-pinned");
      } else {
        pinBtn.innerHTML = '<i class="fa-regular fa-star"></i> Pin';
        pinBtn.classList.remove("pinned");
        card.classList.remove("filter-pinned");
      }
    }
  });
}

function applyFilter(filter) {
  const projectCards = document.querySelectorAll(".project-grid-item");
  const pinned = getPinnedProjects();

  projectCards.forEach(card => {
    if (filter === "all") {
      card.style.display = "";
      card.style.opacity = "1";
    } else if (filter === "filter-pinned") {
      if (pinned.includes(card.id)) {
        card.style.display = "";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    } else if (card.classList.contains(filter)) {
      card.style.display = "";
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
    }
  });
}

function initProjectPinning() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  updatePinUI();

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.getAttribute("data-filter");
        applyFilter(filter);
      });
    });

    // Handle direct link to a category filter like #filter-xr or #filter-robotics
    const hash = window.location.hash;
    if (hash && hash.startsWith("#filter-")) {
      const targetFilter = hash.substring(1);
      const targetBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
      if (targetBtn) {
        filterBtns.forEach(b => b.classList.remove("active"));
        targetBtn.classList.add("active");
        applyFilter(targetFilter);
      }
    }
  }
}

// Toast notification function
function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check mr-2 text-info"></i> ${message}`;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2600);
}

// Copy BibTeX to clipboard
function copyBibtex(id) {
  const elem = document.getElementById(id);
  if (!elem) return;
  const text = elem.innerText || elem.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("BibTeX citation copied to clipboard!");
  }).catch(err => {
    console.error("Failed to copy:", err);
  });
}

// Toggle Abstract accordion
function toggleAbstract(id) {
  const elem = document.getElementById(id);
  if (!elem) return;
  if (elem.style.display === "block") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  }
}

// ==========================================================================
// Interactive Simulation & XR Lab Runner
// ==========================================================================
const LAB_APPS = {
  calcvr: {
    title: "CalcVR: Multivariable Calculus in 3D",
    badge: "Godot 4 • WebXR",
    url: "/apps/calcvr/index.html",
    apkUrl: "https://github.com/addy79/vr-calculus/releases/download/v1.0.0/vr-calculus-quest.apk",
    controls: "🖥️ Desktop: WASD to fly • Right-Click + Drag to rotate • Scroll to zoom | 🥽 Quest: Click 'Enter VR'"
  },
  vrfields: {
    title: "VRFields: Maxwell Vector Engine",
    badge: "GLSL Compute • WebXR",
    url: "/apps/vrfields/index.html",
    apkUrl: "https://github.com/addy79/vrfields/releases/download/v1.0.0/vrfields-quest.apk",
    controls: "🖥️ Desktop: WASD to fly • Right-Click + Drag to rotate • Click probes | 🥽 Quest: Click 'Enter VR'"
  },
  vrmechanics: {
    title: "VRMechanics: Teardown & Inspection",
    badge: "Godot 4 • OpenXR / WebXR",
    url: "/apps/vrmechanics/index.html",
    apkUrl: "https://github.com/addy79/vrmechanics/releases/download/v1.0.0/vrmechanics-quest.apk",
    controls: "🖥️ Desktop: WASD to fly • Right-Click to look • Click parts to inspect/disassemble | 🥽 Quest: Click 'Enter VR'"
  },
  mmlabvr: {
    title: "MMLabVR: Mechanics of Materials Lab",
    badge: "Godot 4 • 11 Test Benches",
    url: "/apps/mmlabvr/index.html",
    apkUrl: "https://github.com/addy79/MMLabVR/releases/download/v1.0.0/mmlabvr-quest.apk",
    controls: "🖥️ Desktop: WASD to fly • Right-Click to look • Interact with test rigs | 🥽 Quest: Click 'Enter VR'"
  },
  coassembly: {
    title: "CoAssembly: Networked Spatial Lab",
    badge: "Godot 4 • Collaborative CAD",
    url: "/apps/coassembly/index.html",
    apkUrl: "https://github.com/addy79/CoAssembly/releases/download/v1.0.0/coassembly-quest.apk",
    controls: "🖥️ Desktop: WASD to move • Right-Click to look • Manipulate components | 🥽 Quest: Click 'Enter VR'"
  }
};

let currentLabAppKey = null;

function scrollToLab() {
  const lab = document.getElementById("interactive-lab");
  if (!lab) return;
  lab.scrollIntoView({ behavior: "smooth", block: "start" });
  lab.classList.add("highlight-pulse");
  setTimeout(() => {
    lab.classList.remove("highlight-pulse");
  }, 1800);
}

function launchLabApp(key) {
  const app = LAB_APPS[key];
  if (!app) return;
  currentLabAppKey = key;

  let modal = document.getElementById("lab-modal-backdrop");
  if (!modal) {
    createLabModalMarkup();
    modal = document.getElementById("lab-modal-backdrop");
  }

  document.getElementById("lab-modal-title-text").innerText = app.title;
  document.getElementById("lab-modal-badge").innerText = app.badge;
  document.getElementById("lab-modal-controls-text").innerText = app.controls;
  
  const savedUrl = localStorage.getItem(`lab_url_${key}`) || app.url;
  const iframe = document.getElementById("lab-runner-frame");
  if (iframe) {
    iframe.src = savedUrl;
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLabRunner() {
  const modal = document.getElementById("lab-modal-backdrop");
  if (modal) {
    modal.classList.remove("active");
    const iframe = document.getElementById("lab-runner-frame");
    if (iframe) {
      iframe.src = "about:blank";
    }
    document.body.style.overflow = "";
  }
}

function toggleLabFullscreen() {
  const modalBox = document.getElementById("lab-modal-box");
  if (modalBox) {
    modalBox.classList.toggle("fullscreen-mode");
  }
}

function openLabInNewTab() {
  if (!currentLabAppKey) return;
  const app = LAB_APPS[currentLabAppKey];
  const url = localStorage.getItem(`lab_url_${currentLabAppKey}`) || app.url;
  window.open(url, "_blank", "noopener,noreferrer");
}

function createLabModalMarkup() {
  const modalHTML = `
  <div id="lab-modal-backdrop" class="lab-modal-backdrop" onclick="if(event.target===this) closeLabRunner()">
    <div id="lab-modal-box" class="lab-modal">
      <div class="lab-modal-header">
        <h3 class="lab-modal-title">
          <span class="pulse-dot"></span>
          <span id="lab-modal-title-text">Interactive XR Lab</span>
          <span class="badge-tag ml-2" id="lab-modal-badge">WebXR</span>
        </h3>
        <div class="d-flex align-items-center gap-2">
          <button class="btn-folio" onclick="openLabInNewTab()" title="Open in separate tab (Recommended for Meta Quest Browser full immersion)">
            <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> New Tab
          </button>
          <button class="btn-folio" onclick="toggleLabFullscreen()" title="Toggle full window">
            <i class="fa-solid fa-expand"></i>
          </button>
          <button class="btn-folio" onclick="closeLabRunner()" title="Close runner">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="lab-modal-ctrls">
        <span id="lab-modal-controls-text">Desktop: WASD to fly &bull; Right-Click to orbit | Quest: Click "Enter VR"</span>
        <span><kbd>Esc</kbd> to exit</span>
      </div>
      <div class="lab-viewport-wrap">
        <iframe id="lab-runner-frame" class="lab-iframe" src="about:blank" allow="xr-spatial-tracking; fullscreen; autoplay; keyboard-map"></iframe>
      </div>
      <div class="lab-secret-banner">
        <div>
          <i class="fa-solid fa-server text-success mr-1"></i>
          <span><strong>Direct Self-Hosted Runtime:</strong> Running directly on addy79.github.io (No external accounts or redirects).</span>
        </div>
        <button class="btn-folio" onclick="closeLabRunner()">
          <i class="fa-solid fa-circle-xmark mr-1"></i> Exit Runner
        </button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLabRunner();
    }
  });
}

// Auto-scroll or launch via URL hash/query
window.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;
  if (hash === "#interactive-lab" || hash === "#try-apps") {
    if (window.location.pathname.includes("/projects")) {
      window.location.replace("/lab/");
      return;
    }
    setTimeout(scrollToLab, 250);
  }
  const params = new URLSearchParams(window.location.search);
  const appParam = params.get("app");
  if (appParam && LAB_APPS[appParam]) {
    setTimeout(() => {
      launchLabApp(appParam);
    }, 400);
  }
});


