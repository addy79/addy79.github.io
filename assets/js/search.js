/**
 * Client-side Spotlight / Ctrl+K search modal
 */

const SEARCH_INDEX = [
  {
    title: "Digitwin1: Hardware-in-the-Loop Cyber-Physical Digital Twin",
    category: "Projects / Cyber-Physical Bridge",
    url: "/projects/#digitwin1",
    keywords: "godot openxr raspberry pi zero udp actuator digital twin hil robotics controls hardware python"
  },
  {
    title: "VRMechanics: Virtual Mechanical Teardown & Inspection",
    category: "Projects / XR Simulation",
    url: "/projects/#vrmechanics",
    keywords: "vrmechanics godot openxr vr education assembly disassembly cycloidal gearbox robot arm bldc motor"
  },
  {
    title: "FreeCAD Mechanism Suite (44 Parametric Assemblies)",
    category: "Projects / CAD & Hardware",
    url: "/projects/#freecad-suite",
    keywords: "freecad cad cycloidal drive harmonic drive planetary gearbox stewart platform delta robot tourbillon jet engine wankel"
  },
  {
    title: "BrushlessLab: 3-Phase BLDC Motor Diagnostic Bench",
    category: "Projects / Mechatronics",
    url: "/projects/#brushlesslab",
    keywords: "brushlesslab bldc motor testing back-emf hall sensor dyno torque winding diagnostic"
  },
  {
    title: "Pioneer ROV: Autonomous Underwater Exploration Vehicle",
    category: "Projects / Robotics Era",
    url: "/projects/#pioneer-rov",
    keywords: "rov underwater robotics aui robotics club pioneer telemetry thruster control marine"
  },
  {
    title: "VRFields: Real-Time Maxwell Vector Field Simulation",
    category: "Projects / XR Simulation",
    url: "/projects/#vrfields",
    keywords: "vrfields godot openxr maxwell electromagnetic physics shaders vector fields simulation flux"
  },
  {
    title: "Racer3D: Vehicle Dynamics & Raycast Suspension Engine",
    category: "Projects / Systems & Games",
    url: "/projects/#racer3d",
    keywords: "racer3d vehicle dynamics simulation physics raycast suspension godot python"
  },
  {
    title: "Game Dev Archive: 16 Algorithmic & Systems Games",
    category: "Projects / Early Games Era",
    url: "/projects/#games-archive",
    keywords: "games platformer breakout space invaders tetris tower defense dungeon crawler godot python"
  },
  {
    title: "Autonomous Line Follower & Obstacle Bot",
    category: "Projects / Robotics Era",
    url: "/projects/#line-follower",
    keywords: "robot arduino ultrasonic sensors line follower competition chassis motor driver"
  },
  {
    title: "Tools of the Trade (Hardware & Software)",
    category: "Skills",
    url: "/#tools-of-the-trade",
    keywords: "freecad solidworks kicad arduino raspberry pi stm32 c++ python godot openxr linux"
  },
  {
    title: "The Obsession Timeline (Age 4 to 23)",
    category: "About / Journey",
    url: "/#timeline",
    keywords: "eras childhood games robots xr cyber-physical digital twin aui alx"
  },
  {
    title: "Curriculum Vitae / Resume",
    category: "CV",
    url: "/cv/",
    keywords: "education al akhawayn university aui bsge general engineering mechatronics alx resume pdf"
  }
];

function openSearchModal() {
  const modal = document.getElementById("search-modal-backdrop");
  if (!modal) return;
  modal.style.display = "flex";
  const input = document.getElementById("search-query-input");
  if (input) {
    input.value = "";
    input.focus();
    renderSearchResults("");
  }
}

function closeSearchModal() {
  const modal = document.getElementById("search-modal-backdrop");
  if (!modal) return;
  modal.style.display = "none";
}

function renderSearchResults(query) {
  const container = document.getElementById("search-results-container");
  if (!container) return;

  query = query.trim().toLowerCase();
  let matches = [];

  if (!query) {
    matches = SEARCH_INDEX.slice(0, 5);
  } else {
    matches = SEARCH_INDEX.filter(item => {
      return item.title.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query) ||
             item.keywords.toLowerCase().includes(query);
    });
  }

  if (matches.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-muted" style="color: var(--global-text-color-light);">No results found for "<strong>${escapeHtml(query)}</strong>"</div>`;
    return;
  }

  let html = "";
  matches.forEach((item, index) => {
    html += `
      <a href="${item.url}" class="search-result-item ${index === 0 ? 'selected' : ''}" onclick="closeSearchModal()">
        <div class="search-result-title">${escapeHtml(item.title)}</div>
        <div class="search-result-meta"><i class="fa-solid fa-folder-open mr-1"></i> ${escapeHtml(item.category)}</div>
      </a>
    `;
  });

  container.innerHTML = html;
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-query-input");
  if (input) {
    input.addEventListener("input", function (e) {
      renderSearchResults(e.target.value);
    });
  }

  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const modal = document.getElementById("search-modal-backdrop");
      if (modal && modal.style.display === "flex") {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    }
    if (e.key === "Escape") {
      closeSearchModal();
    }
  });

  const backdrop = document.getElementById("search-modal-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        closeSearchModal();
      }
    });
  }
});
