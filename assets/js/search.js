/**
 * Client-side Spotlight / Ctrl+K search modal
 */

const SEARCH_INDEX = [
  {
    title: "Digitwin1: Hardware-in-the-Loop Cyber-Physical Digital Twin",
    category: "Projects / Robotics",
    url: "/projects/#digitwin1",
    keywords: "godot openxr raspberry pi zero udp actuator digital twin hil robotics controls hardware python"
  },
  {
    title: "VRMechanics: Virtual Mechanical Teardown & Inspection",
    category: "Projects / VR Simulation",
    url: "/projects/#vrmechanics",
    keywords: "vrmechanics godot openxr vr education assembly disassembly cycloidal gearbox robot arm bldc motor"
  },
  {
    title: "VRFields: Real-Time Electromagnetic Vector Field Visualizer",
    category: "Projects / VR Simulation",
    url: "/projects/#vrfields",
    keywords: "vrfields godot openxr maxwell electromagnetic physics shaders vector fields simulation flux"
  },
  {
    title: "BrushlessLab: BLDC Motor Diagnostics & Bench Testing",
    category: "Projects / Mechatronics",
    url: "/projects/#brushlesslab",
    keywords: "brushlesslab bldc motor testing back-emf hall sensor dyno torque winding diagnostic"
  },
  {
    title: "Parametric CAD Suite (44 Complex Mechanical Assemblies)",
    category: "Projects / CAD & Mechanical",
    url: "/projects/#freecad-suite",
    keywords: "freecad cad cycloidal drive harmonic drive planetary gearbox stewart platform delta robot tourbillon jet engine wankel"
  },
  {
    title: "Pioneer ROV: Autonomous Underwater Vehicle",
    category: "Projects / Robotics",
    url: "/projects/#pioneer-rov",
    keywords: "rov underwater robotics aui robotics club pioneer telemetry thruster control marine"
  },
  {
    title: "CoAssembly: Multi-User Networked Engineering VR Lab",
    category: "Projects / VR Simulation",
    url: "/projects/#coassembly",
    keywords: "coassembly godot vr networking multi-user collaborative spatial audio engineering"
  },
  {
    title: "Racer3D: Real-Time Physics & Vehicle Dynamics Engine",
    category: "Projects / Systems & Games",
    url: "/projects/#racer3d",
    keywords: "racer3d vehicle dynamics simulation physics raycast suspension godot python"
  },
  {
    title: "The Body: Mechatronics & Hardware Skills",
    category: "Technical Skills",
    url: "/#technical-skills",
    keywords: "freecad solidworks cswp cycloidal gearboxes stm32 raspberry pi bldc 3d printing pcb design hardware"
  },
  {
    title: "The Brains: Autonomy, Controls & Simulation Skills",
    category: "Technical Skills",
    url: "/#technical-skills",
    keywords: "godot 4 openxr inverse kinematics pid controls trajectory planning physics simulation c# python udp"
  },
  {
    title: "Digitwin1 Academic Proposal & Architecture Report",
    category: "Publications & Proposals",
    url: "/publications/#digitwin1",
    keywords: "digitwin1 proposal cyber-physical paper rachid lghoul aui report actuator"
  },
  {
    title: "AUI Robotics Club Pioneer ROV Technical Report",
    category: "Publications & Proposals",
    url: "/publications/#pioneer-rov",
    keywords: "rov proposal marine robotics aui egypt regional strategy technical report"
  },
  {
    title: "Curriculum Vitae / Resume",
    category: "CV",
    url: "/cv/",
    keywords: "education al akhawayn university aui bsge general engineering alx software engineering skills experience"
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
    matches = SEARCH_INDEX.slice(0, 5); // default suggestions
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

  // Keyboard navigation
  window.addEventListener("keydown", function (e) {
    // Open on Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const modal = document.getElementById("search-modal-backdrop");
      if (modal && modal.style.display === "flex") {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    }

    // Close on Escape
    if (e.key === "Escape") {
      closeSearchModal();
    }
  });

  // Close modal when clicking on backdrop outside the box
  const backdrop = document.getElementById("search-modal-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        closeSearchModal();
      }
    });
  }
});
