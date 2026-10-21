/**
 * Client-side Spotlight / Ctrl+K search modal
 */

const SEARCH_INDEX = [
  {
    title: "Digitwin1: Hardware-in-the-Loop Cyber-Physical Digital Twin",
    category: "Cyber-Physical Bridge",
    url: "/projects/#digitwin1",
    keywords: "godot openxr raspberry pi udp actuator digital twin hil robotics controls hardware python"
  },
  {
    title: "Pioneer ROV: Underwater Exploration Submersible (Team Leader)",
    category: "Robotics Era",
    url: "/projects/#pioneer-rov",
    keywords: "rov underwater robotics aui robotics club pioneer telemetry thruster control marine team leader"
  },
  {
    title: "BrushlessLab: 3-Phase BLDC Motor Diagnostic Bench",
    category: "Mechatronics & XR",
    url: "/projects/#brushlesslab",
    keywords: "brushlesslab bldc motor testing back-emf hall sensor dyno torque winding diagnostic"
  },
  {
    title: "BLDC Outrunner Motor: High-Torque Stator & Rotor Assembly",
    category: "CAD & Mechatronics",
    url: "/projects/#bldc-outrunner",
    keywords: "bldc outrunner motor stator laminations ndfeb rotor bell freecad electromagnets"
  },
  {
    title: "Harmonic Strain-Wave Reducer (Zero Backlash)",
    category: "CAD & Mechanisms",
    url: "/projects/#harmonic-drive",
    keywords: "freecad solidworks harmonic drive strain wave flexspline wave generator zero backlash robotics"
  },
  {
    title: "Epicycloidal Speed Reducer (Zero Backlash)",
    category: "CAD & Mechanisms",
    url: "/projects/#cycloidal-drive",
    keywords: "freecad cycloidal drive epicycloid math needle rollers pin wheel speed reducer"
  },
  {
    title: "Stewart Hexapod Platform (6-DOF)",
    category: "CAD & Robotics",
    url: "/projects/#stewart-platform",
    keywords: "stewart platform parallel kinematics hexapod 6-dof flight simulator freecad"
  },
  {
    title: "Delta 3-DOF Parallel Pick-and-Place Robot",
    category: "CAD & Robotics",
    url: "/projects/#delta-robot",
    keywords: "delta robot parallel kinematics high speed pick place parallelogram freecad"
  },
  {
    title: "6-DOF Industrial Robotic Arm Manipulator",
    category: "CAD & Robotics",
    url: "/projects/#robot-arm-6dof",
    keywords: "robot arm 6dof manipulator forward inverse kinematics dh parameters freecad solidworks"
  },
  {
    title: "Theo Jansen Walking Mechanism (Strandbeest)",
    category: "CAD & Mechanisms",
    url: "/projects/#strandbeest",
    keywords: "strandbeest theo jansen linkage eight-bar kinetic walking mechanism locomotion freecad"
  },
  {
    title: "Compound Planetary Gearbox",
    category: "CAD & Mechanisms",
    url: "/projects/#planetary-gearbox",
    keywords: "planetary gearbox epicyclic gearing sun gear planet carrier freecad"
  },
  {
    title: "5-Speed Synchromesh Manual Transmission",
    category: "CAD & Mechanisms",
    url: "/projects/#gearbox-5speed",
    keywords: "manual transmission gearbox synchromesh dog teeth selector fork automotive freecad"
  },
  {
    title: "Crossplane 90° V8 Internal Combustion Engine",
    category: "CAD & Mechanisms",
    url: "/projects/#v8-engine",
    keywords: "v8 engine crossplane crankshaft piston valvetrain internal combustion freecad"
  },
  {
    title: "Inline-4 DOHC 16-Valve Engine Assembly",
    category: "CAD & Mechanisms",
    url: "/projects/#inline4-engine",
    keywords: "inline 4 engine dohc valvetrain camshafts pistons cylinder head freecad"
  },
  {
    title: "Wankel Rotary Engine & Epitrochoid Housing",
    category: "CAD & Mechanisms",
    url: "/projects/#wankel-engine",
    keywords: "wankel rotary engine rotor eccentric shaft epitrochoid housing apex seals freecad"
  },
  {
    title: "Dual-Spool Axial Compressor Jet Engine Cutaway",
    category: "CAD & Mechanisms",
    url: "/projects/#jet-engine",
    keywords: "jet engine axial compressor combustor turbine stator vanes turbomachinery freecad"
  },
  {
    title: "Open Bevel Gear Automotive Differential",
    category: "CAD & Mechanisms",
    url: "/projects/#differential",
    keywords: "differential bevel gears epicyclic torque distribution automotive freecad"
  },
  {
    title: "Globoid Hourglass Worm Gear Reduction Drive",
    category: "CAD & Mechanisms",
    url: "/projects/#globoid-worm",
    keywords: "globoid worm drive double enveloping high contact hourglass freecad"
  },
  {
    title: "Self-Locking High-Reduction Worm Gearbox",
    category: "CAD & Mechanisms",
    url: "/projects/#worm-drive",
    keywords: "worm drive self locking high ratio bronze wheel freecad"
  },
  {
    title: "Geneva Intermittent Motion Indexing Mechanism",
    category: "CAD & Mechanisms",
    url: "/projects/#geneva-drive",
    keywords: "geneva drive maltese cross intermittent motion cam indexing freecad"
  },
  {
    title: "Slider-Crank Kinematic Linkage with Dynamic Balancing",
    category: "CAD & Mechanisms",
    url: "/projects/#crank-mechanism",
    keywords: "slider crank linkage four bar dynamic balance counterweight freecad"
  },
  {
    title: "Parametric Involute Spur & Helical Gears",
    category: "CAD & Mechanisms",
    url: "/projects/#gears-involute",
    keywords: "involute gears spur helical profile shift pressure angle freecad"
  },
  {
    title: "Deep-Groove Ball Bearing with Conrad Cage",
    category: "CAD & Mechanisms",
    url: "/projects/#ball-bearing",
    keywords: "ball bearing conrad cage iso tolerances rolling elements freecad"
  },
  {
    title: "Tourbillon Horological Escapement Assembly",
    category: "CAD & Mechanisms",
    url: "/projects/#tourbillon",
    keywords: "tourbillon watch movement horology balance wheel escapement cage freecad"
  },
  {
    title: "Gyroid TPMS Lightweight Minimal Surface Matrix",
    category: "CAD & Mechanisms",
    url: "/projects/#gyroid-lattice",
    keywords: "gyroid tpms minimal surface lattice lightweight metamaterial additive 3d printing freecad"
  },
  {
    title: "VRMechanics: Immersive Mechanical Teardown Lab",
    category: "XR & Simulation",
    url: "/projects/#vrmechanics",
    keywords: "vrmechanics godot openxr vr education assembly disassembly cycloidal gearbox robot arm"
  },
  {
    title: "VRFields: Real-Time Maxwell Vector Field Engine",
    category: "XR & Simulation",
    url: "/projects/#vrfields",
    keywords: "vrfields godot openxr maxwell electromagnetic physics shaders vector fields simulation flux"
  },
  {
    title: "CoAssembly: Networked Collaborative Spatial Lab",
    category: "XR & Simulation",
    url: "/projects/#coassembly",
    keywords: "coassembly godot vr networking multi-user collaborative spatial audio engineering"
  },
  {
    title: "Autonomous Line-Tracking Robot (PID Steering)",
    category: "Robotics Era",
    url: "/projects/#line-follower",
    keywords: "robot arduino ir sensor pid line follower motor driver competition"
  },
  {
    title: "Ultrasonic Autonomous Rover (Obstacle Avoidance)",
    category: "Robotics Era",
    url: "/projects/#obstacle-rover",
    keywords: "autonomous rover ultrasonic hc-sr04 obstacle avoidance servo arduino"
  },
  {
    title: "Self-Balancing Inverted Pendulum Robot (Kalman Filter)",
    category: "Robotics & Controls",
    url: "/#timeline",
    keywords: "self balancing robot inverted pendulum stm32 mpu6050 kalman filter pid control motor encoders"
  },
  {
    title: "Autonomous Micromouse Maze Solver (Flood-Fill)",
    category: "Robotics & Algorithms",
    url: "/#timeline",
    keywords: "micromouse maze solver flood-fill algorithm infrared odometry pathfinding robotics"
  },
  {
    title: "SCARA 4-DOF Assembly Manipulator",
    category: "Robotics & Kinematics",
    url: "/#timeline",
    keywords: "scara robot arm selective compliance kinematics pick and place stepper drivers"
  },
  {
    title: "12-DOF Quadruped Locomotion Platform (Gait Dynamics)",
    category: "Robotics & Locomotion",
    url: "/#timeline",
    keywords: "quadruped robot 12-dof bezier curve trot gait inverse kinematics walking robot"
  },
  {
    title: "Interactive Cyber Terminal (Console / CLI)",
    category: "Interactive",
    url: "/#terminal-body",
    keywords: "terminal console cli hacker prompt status robots bridge stack commands"
  },
  {
    title: "Racer3D: Raycast Vehicle Dynamics Simulation",
    category: "Games & Systems",
    url: "/projects/#racer3d",
    keywords: "racer3d vehicle dynamics simulation physics raycast suspension godot"
  },
  {
    title: "Tower Defense Engine: A* Pathfinding & Waves",
    category: "Games & Systems",
    url: "/projects/#tower-defense",
    keywords: "tower defense a-star pathfinding state machine wave logic godot"
  },
  {
    title: "Asteroid Storm Physics Simulator (Newtonian Space)",
    category: "Games & Systems",
    url: "/projects/#asteroid-storm",
    keywords: "asteroid storm newtonian physics space momentum conservation elastic collision godot"
  },
  {
    title: "Procedural BSP Dungeon Crawler Engine",
    category: "Games & Systems",
    url: "/projects/#dungeon-crawler",
    keywords: "dungeon crawler bsp tree procedural generation shadowcasting fov godot"
  },
  {
    title: "Kinematic 2D Platformer Engine (Coyote Time)",
    category: "Games & Systems",
    url: "/projects/#platformer-engine",
    keywords: "platformer kinematic physics character controller coyote time godot"
  },
  {
    title: "Tools of the Trade (Hardware & Software)",
    category: "Skills",
    url: "/#tools-of-the-trade",
    keywords: "freecad solidworks kicad arduino raspberry pi stm32 esp32 godot unity python c++"
  },
  {
    title: "The Obsession Timeline (Age 4 to 23)",
    category: "About / Journey",
    url: "/#timeline",
    keywords: "eras childhood games robots xr cyber-physical digital twin aui mechatronics"
  },
  {
    title: "Curriculum Vitae",
    category: "CV",
    url: "/cv/",
    keywords: "education al akhawayn university aui bsge general engineering mechatronics experience"
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
    matches = SEARCH_INDEX.slice(0, 6);
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
