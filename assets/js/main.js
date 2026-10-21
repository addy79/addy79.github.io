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
  return ["digitwin1", "freecad-suite", "vrmechanics", "brushlesslab"];
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
      card.style.display = "block";
      card.style.opacity = "1";
    } else if (filter === "filter-pinned") {
      if (pinned.includes(card.id)) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    } else if (card.classList.contains(filter)) {
      card.style.display = "block";
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
      btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.getAttribute("data-filter");
        applyFilter(filter);
      });
    });
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
// Interactive Cyber Terminal Logic
// ==========================================================================

const TERMINAL_COMMANDS = {
  "help": `Available commands:
  <span class="terminal-text-red">asmae --status</span>    Check active system telemetry &amp; missions
  <span class="terminal-text-red">asmae --robots</span>    Inspect autonomous &amp; mechatronic robotics
  <span class="terminal-text-red">asmae --bridge</span>    View cyber-physical digital twin architecture
  <span class="terminal-text-red">asmae --stack</span>     List hardware, CAD, firmware &amp; engine tools
  <span class="terminal-text-red">asmae --contact</span>   Get communication channels
  <span class="terminal-text-cyan">clear</span>            Clear terminal window`,

  "asmae --status": `<span class="terminal-text-success">[TELEMETRY STATUS: NOMINAL]</span>
  • <span class="terminal-text-bold">Operator:</span> Asmae El Harti — General Engineer • Mechatronics
  • <span class="terminal-text-bold">Base:</span> Al Akhawayn University in Ifrane (AUI, Class of '27)
  • <span class="terminal-text-bold">Current Mission:</span> Pioneer ROV Team Leader &amp; Mechatronics Engineer
  • <span class="terminal-text-bold">Active Bridge:</span> Digitwin1 OpenXR spatial sync via sub-millisecond UDP sockets
  • <span class="terminal-text-bold">Cadence:</span> Designing from first principles -> Parametric CAD -> Solder/Firmware -> Spatial Simulation`,

  "status": `<span class="terminal-text-success">[TELEMETRY STATUS: NOMINAL]</span>
  • <span class="terminal-text-bold">Operator:</span> Asmae El Harti — General Engineer • Mechatronics
  • <span class="terminal-text-bold">Base:</span> Al Akhawayn University in Ifrane (AUI, Class of '27)
  • <span class="terminal-text-bold">Current Mission:</span> Pioneer ROV Team Leader &amp; Mechatronics Engineer
  • <span class="terminal-text-bold">Active Bridge:</span> Digitwin1 OpenXR spatial sync via sub-millisecond UDP sockets
  • <span class="terminal-text-bold">Cadence:</span> Designing from first principles -> Parametric CAD -> Solder/Firmware -> Spatial Simulation`,

  "asmae --robots": `<span class="terminal-text-yellow">[AUTONOMOUS &amp; MECHATRONIC ROBOTICS FLEET]</span>
  ├── <span class="terminal-text-bold">Pioneer ROV</span> [Team Leader &amp; Mechatronics] -> 6-Thruster Vectoring, Power Distribution, Subsea Telemetry
  ├── <span class="terminal-text-bold">Digitwin1</span> -> 1-DOF Cyber-Physical Actuator HIL Digital Twin (UDP Sockets + OpenXR)
  ├── <span class="terminal-text-bold">Self-Balancing Robot</span> -> Inverted Pendulum, Discrete Kalman Filter, 200 Hz PID Loop
  ├── <span class="terminal-text-bold">Micromouse Maze Solver</span> -> Flood-Fill Optimal Pathfinding, Infrared Odometry
  ├── <span class="terminal-text-bold">SCARA Manipulator</span> -> 4-DOF Planar Kinematics, Timing-Belt Reduction, Microstepping
  └── <span class="terminal-text-bold">Quadruped Locomotion</span> -> 12-DOF Bezier Curve Foot Trajectories &amp; Dynamic Trot Gait
  <span class="terminal-text-dim">*(Terrestrial, subsea, parallel &amp; serial robotic manipulators)*</span>`,

  "robots": `<span class="terminal-text-yellow">[AUTONOMOUS &amp; MECHATRONIC ROBOTICS FLEET]</span>
  ├── <span class="terminal-text-bold">Pioneer ROV</span> [Team Leader &amp; Mechatronics] -> 6-Thruster Vectoring, Power Distribution, Subsea Telemetry
  ├── <span class="terminal-text-bold">Digitwin1</span> -> 1-DOF Cyber-Physical Actuator HIL Digital Twin (UDP Sockets + OpenXR)
  ├── <span class="terminal-text-bold">Self-Balancing Robot</span> -> Inverted Pendulum, Discrete Kalman Filter, 200 Hz PID Loop
  ├── <span class="terminal-text-bold">Micromouse Maze Solver</span> -> Flood-Fill Optimal Pathfinding, Infrared Odometry
  ├── <span class="terminal-text-bold">SCARA Manipulator</span> -> 4-DOF Planar Kinematics, Timing-Belt Reduction, Microstepping
  └── <span class="terminal-text-bold">Quadruped Locomotion</span> -> 12-DOF Bezier Curve Foot Trajectories &amp; Dynamic Trot Gait
  <span class="terminal-text-dim">*(Terrestrial, subsea, parallel &amp; serial robotic manipulators)*</span>`,

  "asmae --bridge": `<span class="terminal-text-cyan">[CYBER-PHYSICAL BRIDGE ARCHITECTURE]</span>
  Physical Embedded Hardware (STM32 / ESP32 / Raspberry Pi)
     │
     │  <span class="terminal-text-dim">&lt;-- Low-latency UDP Sockets / Sub-millisecond Telemetry --&gt;</span>
     ▼
  Godot Engine &amp; OpenXR Spatial Simulation
     │
     │  <span class="terminal-text-dim">&lt;-- Dynamic Joint Limits &bull; Torque Feedback &bull; Safety Interlocks --&gt;</span>
     ▼
  Hardware-in-the-Loop (HIL) Real-Time Synchronization`,

  "bridge": `<span class="terminal-text-cyan">[CYBER-PHYSICAL BRIDGE ARCHITECTURE]</span>
  Physical Embedded Hardware (STM32 / ESP32 / Raspberry Pi)
     │
     │  <span class="terminal-text-dim">&lt;-- Low-latency UDP Sockets / Sub-millisecond Telemetry --&gt;</span>
     ▼
  Godot Engine &amp; OpenXR Spatial Simulation
     │
     │  <span class="terminal-text-dim">&lt;-- Dynamic Joint Limits &bull; Torque Feedback &bull; Safety Interlocks --&gt;</span>
     ▼
  Hardware-in-the-Loop (HIL) Real-Time Synchronization`,

  "asmae --stack": `<span class="terminal-text-red">[TECHNICAL ARSENAL]</span>
  • <span class="terminal-text-bold">Mechanical &amp; CAD:</span> FreeCAD (Parametric), SolidWorks, KiCAD, 3D Printing (FDM/Resin), FEA
  • <span class="terminal-text-bold">Electronics:</span> Raspberry Pi, STM32, Arduino, ESP32, Oscilloscopes, BLDC Drivers, Dynos
  • <span class="terminal-text-bold">Engines &amp; XR:</span> Godot (Preferred Engine), Unity, OpenXR, GPU Maxwell Shaders
  • <span class="terminal-text-bold">Languages:</span> Python, C, C++, C#, GDScript, JavaScript/TypeScript, Bash, Linux
  • <span class="terminal-text-bold">Human Languages:</span> Arabic (Native), French (Fluent / Academic), English (Bilingual / Professional)`,

  "stack": `<span class="terminal-text-red">[TECHNICAL ARSENAL]</span>
  • <span class="terminal-text-bold">Mechanical &amp; CAD:</span> FreeCAD (Parametric), SolidWorks, KiCAD, 3D Printing (FDM/Resin), FEA
  • <span class="terminal-text-bold">Electronics:</span> Raspberry Pi, STM32, Arduino, ESP32, Oscilloscopes, BLDC Drivers, Dynos
  • <span class="terminal-text-bold">Engines &amp; XR:</span> Godot (Preferred Engine), Unity, OpenXR, GPU Maxwell Shaders
  • <span class="terminal-text-bold">Languages:</span> Python, C, C++, C#, GDScript, JavaScript/TypeScript, Bash, Linux
  • <span class="terminal-text-bold">Human Languages:</span> Arabic (Native), French (Fluent / Academic), English (Bilingual / Professional)`,

  "asmae --contact": `<span class="terminal-text-success">[COMMUNICATION CHANNELS]</span>
  • <span class="terminal-text-bold">Email:</span> <a href="mailto:a.elharti@aui.ma" style="color:#f87171;">a.elharti@aui.ma</a>
  • <span class="terminal-text-bold">GitHub:</span> <a href="https://github.com/addy79" target="_blank" style="color:#f87171;">github.com/addy79</a>
  • <span class="terminal-text-bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/asmae-el-harti-9b76b2268/" target="_blank" style="color:#f87171;">linkedin.com/in/asmae-el-harti-9b76b2268</a>
  • <span class="terminal-text-bold">Location:</span> Al Akhawayn University, Ifrane, Morocco`,

  "contact": `<span class="terminal-text-success">[COMMUNICATION CHANNELS]</span>
  • <span class="terminal-text-bold">Email:</span> <a href="mailto:a.elharti@aui.ma" style="color:#f87171;">a.elharti@aui.ma</a>
  • <span class="terminal-text-bold">GitHub:</span> <a href="https://github.com/addy79" target="_blank" style="color:#f87171;">github.com/addy79</a>
  • <span class="terminal-text-bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/asmae-el-harti-9b76b2268/" target="_blank" style="color:#f87171;">linkedin.com/in/asmae-el-harti-9b76b2268</a>
  • <span class="terminal-text-bold">Location:</span> Al Akhawayn University, Ifrane, Morocco`
};

function executeTerminalCommand(cmd) {
  const terminalBody = document.getElementById("terminal-body");
  const input = document.getElementById("terminal-cmd-input");
  if (!terminalBody) return;

  cmd = cmd.trim();
  if (!cmd) return;

  if (cmd.toLowerCase() === "clear") {
    terminalBody.innerHTML = `<div class="terminal-text-dim">Terminal cleared. Type <span class="terminal-text-red">help</span> for commands.</div>`;
    if (input) input.value = "";
    return;
  }

  const outputBlock = document.createElement("div");
  outputBlock.className = "terminal-output-block";

  const echo = document.createElement("div");
  echo.className = "terminal-cmd-echo";
  echo.innerHTML = `<span class="terminal-text-red">asmae@aui-mechatronics:~$</span> ${escapeHtml(cmd)}`;
  outputBlock.appendChild(echo);

  const response = document.createElement("div");
  const cleanCmd = cmd.toLowerCase();

  if (TERMINAL_COMMANDS[cleanCmd]) {
    response.innerHTML = TERMINAL_COMMANDS[cleanCmd];
  } else {
    response.innerHTML = `<span class="terminal-text-red">Command not recognized: '${escapeHtml(cmd)}'</span>. Try <span class="terminal-text-cyan">help</span>, <span class="terminal-text-red">asmae --status</span>, or <span class="terminal-text-yellow">asmae --robots</span>.`;
  }

  outputBlock.appendChild(response);
  terminalBody.appendChild(outputBlock);
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if (input) input.value = "";
}

function runTerminalChip(cmd) {
  executeTerminalCommand(cmd);
}

document.addEventListener("DOMContentLoaded", function () {
  const terminalInput = document.getElementById("terminal-cmd-input");
  if (terminalInput) {
    terminalInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        executeTerminalCommand(this.value);
      }
    });
  }
});

