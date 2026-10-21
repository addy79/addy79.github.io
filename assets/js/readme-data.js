/**
 * Project README Documentation Store & Modal Controller
 * Provides visitors full, public access to the technical README files of all projects.
 */

const PROJECT_READMES = {
  "pioneer-rov": {
    repo: "addy79/pioneer-rov",
    title: "Pioneer ROV: Underwater Exploration Submersible",
    badge: "2027 Marine Robotics Challenge",
    content: `# Pioneer ROV: Underwater Exploration Submersible
**Target Competition:** 2027 Marine Robotics Challenge
**Role:** Team Leader & Mechatronics Engineer

## System Overview
Pioneer ROV is an autonomous and tethered underwater robotics vehicle engineered for the 2027 Marine Robotics Challenge. The platform is designed for long-duration aquatic inspection, subsea manipulation, and high-bandwidth sensor telemetry under extreme hydrodynamic pressures.

## Mechatronics Architecture
- **Propulsion:** 6 brushless thrusters configured in a full vectoring matrix (4 horizontal vectored at 45°, 2 vertical) providing 6-DOF maneuverability.
- **Power Stage:** 48V LiFePO4 battery pack with onboard buck-boost regulation down to isolated 12V and 5V logic rails (up to 60A peak surge).
- **Communication & Telemetry:** Full-duplex differential RS-485 / 100BASE-T Ethernet tether protocol transmitting IMU attitude, depth pressure (MS5837), leak detection, and 1080p low-latency video feed.
- **Embedded Control:** Dual-STM32 architecture partitioning real-time thruster PID control from navigation sensor polling.
- **Chassis & Ballast:** CNC-milled HDPE frame with high-precision cast acrylic cylindrical pressure housing rated for 50m depth with dynamic syntactic foam trim buoyancy.

## Manipulator Subsystem
- 2-DOF high-torque waterproof claw driven by sealed coreless servomotors for retrieving underwater challenge payloads.`
  },

  "self-balancing": {
    repo: "addy79/self-balancing-robot",
    title: "Self-Balancing Inverted Pendulum Robot",
    badge: "STM32 & Kalman Filtering",
    content: `# Two-Wheeled Self-Balancing Inverted Pendulum Robot
**Firmware Architecture:** STM32 ARM Cortex-M4 @ 168 MHz
**Sensors:** MPU6050 6-Axis IMU (I2C fast-mode 400 kHz)

## Control Architecture
The robot maintains vertical equilibrium through a high-frequency discrete Kalman filter fusing accelerometer tilt angles with integrated gyroscope angular rates:

$$\\hat{\\theta}_{k} = \\hat{\\theta}_{k|k-1} + K_k (z_k - H \\hat{\\theta}_{k|k-1})$$

### Cascaded PID Control Loop (200 Hz):
1. **Inner Balance Loop (PD):** High-speed attitude recovery calculating corrective wheel torque from tilt error and angular velocity.
2. **Outer Velocity / Position Loop (PI):** Optical quadrature encoder feedback loop that adjusts baseline tilt target to prevent drift and achieve stationary holding.

## Hardware Specifications
- **Microcontroller:** STM32F401RE ARM Cortex-M4
- **Actuators:** Dual 12V brushed DC gearmotors with 330 RPM output and 13-CPR hall-effect magnetic encoders (495 counts/rev after 30:1 gearbox).
- **Motor Driver:** Dual H-bridge TB6612FNG with low on-resistance MOSFETs.
- **Safety Features:** Software pitch angle kill-switch (|tilt| > 45°), brownout protection, and watchdog timer.`
  },

  "quadruped": {
    repo: "addy79/quadruped-robot",
    title: "12-DOF Quadruped Walking Robot",
    badge: "Dynamic Legged Locomotion",
    content: `# 12-DOF Quadruped Locomotion Robot
**Limb Configuration:** 4 legs × 3 active degrees of freedom (Coxa roll, Femur pitch, Tibia pitch) = 12 DOF
**Chassis Material:** Carbon-fiber plates with CNC-milled 6061 aluminum joint brackets.

## Kinematics & Trajectory Generation
- **Analytical Inverse Kinematics:** Solves closed-form joint angles $(\\theta_1, \\theta_2, \\theta_3)$ for any 3D Cartesian foot coordinate $(x, y, z)$ relative to the hip shoulder frame.
- **Bézier Curve Foot Gait:** Foot swing trajectories are generated via 12-point parametric Bézier curves:
$$B(t) = \\sum_{i=0}^{n} \\binom{n}{i} (1-t)^{n-i} t^i P_i, \\quad t \\in [0, 1]$$
Ensures zero impact jerk on touchdown and smooth ground clearance during dynamic trotting.
- **IMU Torso Stabilization:** Real-time roll/pitch attitude compensation using a complementary-filtered IMU to adjust body stance dynamically over uneven terrain.`
  },

  "micromouse": {
    repo: "addy79/micromouse",
    title: "Autonomous Micromouse Maze Solver",
    badge: "Competition Labyrinth Navigation",
    content: `# Autonomous Micromouse Maze Solver
**Target Specification:** IEEE 16×16 Competition Maze Labyrinth
**Chassis:** Custom 4-layer FR4 integrated PCB chassis with micro-coreless DC motors.

## Navigation & Algorithms
- **Dynamic Flood-Fill Algorithm:** Maintains a 16×16 potential cost matrix. Cells update in real time after every wall discovery, recalculating minimum-distance Manhattan potential fields to the 4-cell center target.
- **Diagonal Run Optimization:** During speed runs, the robot computes smooth diagonal dash trajectories through open intersections instead of orthogonal step-turns.
- **IR Sensing Suite:** 4 matched pairs of 940 nm infrared emitter LEDs and phototransistors with 38 kHz ambient-light modulation cancellation. Measures front, 45° diagonal, and side wall distances with millimeter resolution.
- **Motion Profiling:** Trapezoidal / S-curve velocity profiling with optical encoder tick interrupts maintaining closed-loop heading correction.`
  },

  "scara-robot": {
    repo: "addy79/scara-robot",
    title: "4-DOF SCARA Robotic Assembly Manipulator",
    badge: "Planar Kinematics & Assembly",
    content: `# 4-DOF SCARA Assembly Manipulator
**Configuration:** Selective Compliance Articulated Robot Arm (RRPR)
**Payload Capacity:** 1.2 kg at maximum reach of 450 mm.

## Kinematic Analysis
- **Forward Kinematics:**
  $$x = L_1 \\cos(\\theta_1) + L_2 \\cos(\\theta_1 + \\theta_2)$$
  $$y = L_1 \\sin(\\theta_1) + L_2 \\sin(\\theta_1 + \\theta_2)$$
  $$z = d_3, \\quad \\phi = \\theta_1 + \\theta_2 + \\theta_4$$
- **Inverse Kinematics:** Closed-form trigonometric solution determining shoulder and elbow angles with dual elbow-up / elbow-down posture branches.

## Mechanical Hardware
- **Shoulder & Elbow Joints:** High-torque NEMA 17 stepper motors coupled to 5:1 GT2 timing belt reduction pulleys.
- **Z-Axis Lift:** 8 mm lead ground ballscrew with anti-backlash nut providing rigid vertical positioning.
- **End-Effector:** Integrated vacuum venturi ejector cup with electronic solenoid blow-off valve for high-speed pick-and-place cycles.`
  },

  "stm32-foc": {
    repo: "addy79/stm32-foc-driver",
    title: "STM32 FOC Brushless Servo Driver",
    badge: "Field-Oriented Control",
    content: `# STM32 Field-Oriented Control (FOC) Brushless Servo Driver
**Microcontroller:** STM32 ARM Cortex-M4 running cascaded FOC loops @ 20 kHz
**Power Stage:** 24V-48V bus, 60A peak, low $R_{DS(on)}$ N-channel MOSFET half-bridges

## Control Pipeline
1. **Current Sensing:** Low-side inline precision current shunts amplified through differential op-amps; ADC samples synchronized with PWM center-alignment.
2. **Clarke & Park Transformations:** Converts three-phase stator currents $(I_a, I_b, I_c)$ into rotating $d-q$ frame components $(I_d, I_q)$.
3. **Space Vector PWM (SVPWM):** Calculates optimal inverter switching vectors to maximize bus voltage utilization and minimize harmonic acoustic motor noise.
4. **Encoder Integration:** High-speed SPI interface polling an AS5048A 14-bit magnetic rotary encoder (16,384 counts/revolution).

## Telemetry
- Isolated CAN bus transceiver supporting CANopen-style velocity/position setpoint frames and real-time current telemetry broadcasting.`
  },

  "haptic-stylus": {
    repo: "addy79/haptic-teleoperation-stylus",
    title: "3-DOF Force-Feedback Haptic Stylus",
    badge: "Bilateral Impedance Control",
    content: `# 3-DOF Force-Feedback Haptic Teleoperation Stylus
**Kinematic Architecture:** 3-DOF precision CNC aluminum pantograph linkage
**Transmission:** Zero-backlash capstan cable drives with direct-drive low-cogging brushless gimbal motors

## Cyber-Physical Simulation Bridge
- **Godot OpenXR Integration:** Streams 3D Cartesian tip coordinates to an OpenXR virtual spatial environment over low-latency UDP sockets (<2 ms loop time).
- **Force Reflection Algorithm:** When the virtual stylus contacts a simulated surface, the physics engine computes penetration depth $\\delta$ and surface normal $\\hat{n}$. The haptic controller reflects a proportional impedance restoring force:
$$\\vec{F} = -k \\delta \\hat{n} - b \\vec{v}$$
- **Texture Emulation:** Modulates micro-sinusoidal torque perturbations to emulate surface roughness (sandpaper, metal, rubber, and glass).`
  },

  "delta-vision-sorter": {
    repo: "addy79/delta-vision-sorter",
    title: "Delta Robot High-Speed Vision Sorter",
    badge: "Parallel Kinematics & TinyML",
    content: `# High-Speed Delta Robot Sorting Cell with Computer Vision
**Kinematic Architecture:** 3-DOF parallel Delta robot with carbon-fiber parallelogram linkages
**Throughput:** Up to 120 picks per minute with synchronized dynamic conveyor tracking

## Perception & Trajectory Architecture
- **Overhead Machine Vision:** Industrial camera running OpenCV / TinyML color and geometric contour segmentation. Extracts object center-of-mass $(X, Y)$ and orientation angle $\\psi$.
- **Conveyor Belt Synchronization:** Reads optical quadrature encoder interrupts from the moving conveyor belt drive shaft to predict workpiece pickup rendezvous points.
- **Trajectory Planning:** Quintic polynomial motion curves guarantee continuous acceleration and jerk-free travel:
$$s(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5$$
- **End-Effector:** High-flow vacuum venturi suction cup with instantaneous air blow-off release.`
  },

  "cnc-wire-bender": {
    repo: "addy79/cnc-wire-bender",
    title: "Automated CNC 3D Wire Bending Machine",
    badge: "Desktop Mechatronics & G-Code",
    content: `# Automated Desktop 3D CNC Wire Bending Machine
**Wire Capacity:** 0.8 mm – 2.5 mm spring steel, brass, and copper wire
**Architecture:** 3-Axis coordinated mechatronic motion (Feed, Rotate, Bend) + Pneumatic Shear

## Mechanical Subsystems
- **Pinch Feeder:** Dual knurled hardened steel rollers driven by a high-torque NEMA 23 stepper with adjustable eccentric clamping tension.
- **Coaxial Rotary Bending Die:** Center tooling pin with an orbiting eccentric bending pin driven through anti-backlash spur gearing, achieving $0.1^\\circ$ angular resolution.
- **Pneumatic Shear Cutter:** Double-acting pneumatic cylinder with guillotine tool steel blade triggered automatically at the end of each programmed wire sequence.
- **Firmware:** ESP32 embedded G-code interpreter supporting linear feed (\`G1\`), rotary coordinate rotation (\`G0\`), and wire bending angle execution (\`G2/G3\`).`
  },

  "digitwin1": {
    repo: "addy79/digitwin1",
    title: "Digitwin1: Cyber-Physical Actuator Digital Twin",
    badge: "The Bridge Era",
    content: `# Digitwin1: Cyber-Physical 1-DOF Robotic Actuator
**Architecture:** Real-time physical test bench linked to Godot OpenXR spatial simulation
**Embedded Node:** Raspberry Pi Zero controlling physical hardware via hardware PWM

## Core Features
1. **Bidirectional UDP Socket Bridge:** Sub-millisecond packet streaming communicating target angles, commanded torque, and telemetry.
2. **Spatial Visualizer:** Godot OpenXR simulation mirroring physical actuator movement with live joint limit arc displays.
3. **Safety Interlocks:** Dynamic velocity clamping, over-current trip detection, and physical limit switch verification.`
  },

  "brushlesslab": {
    repo: "addy79/brushlesslab",
    title: "BrushlessLab: 3-Phase BLDC Diagnostic Bench",
    badge: "Motor Diagnostics & XR",
    content: `# BrushlessLab: Virtual BLDC Motor Diagnostic Bench
**Platform:** Godot Engine & OpenXR Spatial Computing
**Domain:** Actuator characterization & electromagnetic diagnostics

## 6 Diagnostic Stations
1. **Winding Resistance:** Milliohm 4-wire Kelvin measurement validation across phases U, V, and W.
2. **Back-EMF Oscilloscope:** Tri-phase sinusoidal back-EMF waveform scope visualization during unpowered spin-down.
3. **Hall Sensor Calibration:** 60°/120° electrical phasing alignment checks.
4. **Dynamometer Loading Stand:** Variable torque load characterization measuring efficiency and thermal rise.
5. **Bearing Envelope Analysis:** High-frequency vibration demodulation detecting raceway fluting and ball defects.`
  },

  "vrmechanics": {
    repo: "addy79/vrmechanics",
    title: "VRMechanics: Teardown Trainer",
    badge: "Reverse-Engineering & OpenXR",
    content: `# VRMechanics: Teardown & Reverse-Engineering Trainer
**Platform:** Godot 4.x & OpenXR Spatial VR
**Core Rule:** Realistic technician reverse-engineering — fasteners first, safety disconnects, and proper tool sequencing.

## 5 Complete Mechanical Teardowns
- **Precision Cycloidal Gearbox (9 Steps):** Hex socket bolts, eccentric drive pin inspection, needle roller removal, cycloidal disc balance verification.
- **Electric Motor (9 Steps):** Power disconnect first, press-fit fan puller, slotted brush caps, rotor extraction.
- **6-DOF Robot Arm (10 Steps):** Wire harness disconnects, servo horn bolts, progressive tip-to-base joint disassembly.
- **VR Headset (11 Steps):** Magnetic facial interface, Torx chassis screws, battery disconnect safety rule.
- **Modern Smartphone (15 Steps):** SIM tray removal, thermal adhesive heating, flex connector spudger prying, battery isolation.`
  },

  "vrfields": {
    repo: "addy79/vrfields",
    title: "VRFields: GPU-Accelerated Vector Calculus in VR",
    badge: "GLSL Compute & Maxwell Physics",
    content: `# VRFields: GPU-Accelerated Vector Calculus in VR
**Renderer:** Godot OpenXR with GLSL Compute Shaders
**Research Focus:** Real-time spatial vector field evaluation comparing GPU compute vs CPU baselines.

## 5 Interactive Topics
1. **Vector Fields:** 3D vector arrow lattices advected on GPU with real-time div & curl probes.
2. **Divergence & Curl Volume:** Ray-marched volumetric density clouds representing $\\nabla \\cdot \\mathbf{F}$ and $\\nabla \\times \\mathbf{F}$.
3. **Gradient & Tangent Planes:** Spatial surfaces $z = f(x, y)$ with dynamic level curves and steepest ascent vectors.
4. **Parametric Surfaces:** GPU-computed $r(u, v)$ meshes with Gaussian and Mean curvature color maps.
5. **Solids of Revolution:** Dynamic profile revolution around the axis with Riemann cross-section disk slicing.`
  },

  "mmlab-vr": {
    repo: "addy79/mmvr",
    title: "MMLabVR: Mechanics of Materials in VR",
    badge: "OpenXR & Materials Science",
    content: `# MMLabVR: Mechanics of Materials in Virtual Reality
**Platform:** Godot OpenXR & Meta Quest
**Curriculum Coverage:** 10 Academic Mechanics of Materials chapters + 11 interactive physical lab experiment benches.

## Core Features
- **Tensile & Compression Testing:** Virtual universal testing machine applying axial loading to standard dogbone specimens with real-time von Mises stress heatmaps.
- **Torsion Drive Stand:** Angle-of-twist vs applied torque measurement along cylindrical shafts.
- **Mohr's Circle Stress Transformation:** 3D interactive Mohr's circle showing principal stresses $\\sigma_1, \\sigma_2$ and maximum in-plane shear $\\tau_{\\max}$.
- **Beam Deflection & Shear Benches:** Point and distributed loading on simply supported and cantilever beams.`
  },

  "calc-vr": {
    repo: "addy79/vr-calculus",
    title: "CalcVR: Multivariable Calculus in 3D VR",
    badge: "3D Mathematical Visualization",
    content: `# CalcVR: Multivariable Calculus in 3D Virtual Reality
**Platform:** Godot Engine & OpenXR (Package: com.example.vrcalculus)

## Interactive 3D Math Topics
1. **3D Surface Plotter:** Type any mathematical function $f(x, y)$ to generate smooth 3D surfaces with movable tangent planes and gradient vectors $\\nabla f$.
2. **Solids of Revolution:** Sweeps profile curves $y = f(x)$ around the coordinate axis with sliding cross-section disks and disk-method volume integration.
3. **Spatial Vector Fields:** 3D grid of directional arrows with a handheld probe measuring divergence and curl in real time.
4. **Parametric Curves:** 3D tube paths $r(t)$ with animated velocity $r'(t)$ and acceleration $r''(t)$ tangent vectors.`
  },

  "vrscent": {
    repo: "addy79/vrscent",
    title: "VRScent: Multisensory Science Labs in VR",
    badge: "Olfactory VR & Chemistry",
    content: `# VRScent: Multisensory Science & Olfactory Labs in VR
**Platform:** Godot OpenXR & Wi-Fi Olfactory Hardware Display Driver
**Focus:** Pharmacognosy, perfumery, and forensic science training.

## Scientific Stations
1. **Wafting & Vapour Dispersion:** Simulates evaporation and air currents; tracks human exposure in parts-per-million (ppm) comparing wafting vs direct inhalation.
2. **Medicinal Herb Garden (Pharmacognosy):** 7 medicinal plants (peppermint, lavender, clove, eucalyptus, etc.) with volatile constituent extraction cards.
3. **Perfumer's Organ:** Formulates top, heart, and base notes according to Raoult's law evaporation curves.
4. **Forensic Safety Lab:** Demonstrates dangerous situations where olfactory senses fail (deadly odorless carbon monoxide, olfactory fatigue under $H_2S$, and genetic anosmia for cyanide).`
  },

  "coassembly": {
    repo: "addy79/coassembly",
    title: "CoAssembly: Networked Spatial Engineering Lab",
    badge: "Multiplayer OpenXR Workspace",
    content: `# CoAssembly: Multi-User Networked CAD Assembly in VR
**Platform:** Godot OpenXR Multiplayer Architecture
**Networking:** Low-latency UDP state synchronization

## Features
- **Synchronized Mechanical Assembly:** Multiple distributed engineers simultaneously inspect, grab, and assemble mechanical components in shared virtual space.
- **Real-Time Spatial Audio:** Positional 3D voice audio matching physical user locations in the virtual laboratory.
- **Constrained Joint Kinematics:** Preserves rotational and prismatic assembly limits across the network.`
  },

  "bldc-outrunner": {
    repo: "addy79/freecad",
    title: "BLDC Outrunner Motor: Stator & Rotor Assembly",
    badge: "FreeCAD Parametric Assembly",
    content: `# High-Torque Brushless Outrunner Motor Assembly
**CAD Software:** FreeCAD v0.21 / v1.0
**Model Type:** Fully Parametric Solid Model

## Mechanical Specifications
- **Stator:** 12-slot 0.2mm silicon steel lamination stack with parametric tooth shoe angle and winding slot area.
- **Rotor Bell:** 14-pole CNC anodized 6061 aluminum rotor casing housing N52 curved neodymium magnets.
- **Bearings:** Dual high-precision deep groove ball bearings (NMB) with dynamic press-fit tolerances.
- **Airgap:** 0.35 mm radial tolerance maintained over 360° concentricity.`
  },

  "harmonic-drive": {
    repo: "addy79/freecad",
    title: "Harmonic Strain-Wave Gear Reducer",
    badge: "Zero-Backlash Robotics Transmission",
    content: `# Harmonic Strain-Wave Gear Reducer (Zero-Backlash)
**CAD Software:** FreeCAD & SolidWorks
**Reduction Ratio:** 100:1

## Mechanical Architecture
- **Wave Generator:** Precision elliptical cam bearing assembly inducing an elliptical strain wave.
- **Flexspline:** Thin-walled, high-yield alloy steel flexible cup with external involute teeth.
- **Circular Spline:** Rigid internal ring gear featuring 2 additional teeth ($Z_{flex} = 200$, $Z_{circ} = 202$).
- **Performance:** Zero backlash, exceptionally high torque density, and coaxial input/output alignment.`
  },

  "cycloidal-drive": {
    repo: "addy79/freecad",
    title: "Epicycloidal Speed Reducer",
    badge: "High-Shock Robotics Transmission",
    content: `# Precision Epicycloidal Speed Reducer
**CAD Software:** FreeCAD Parametric Expression Engine
**Reduction Ratio:** 29:1

## Mathematical Formulation
The cycloid disk pitch profile is derived from parametric epicycloid equations:
$$x(\\theta) = R \\cos(\\theta) - R_r \\cos(\\theta + \\psi) - e \\cos((N+1)\\theta)$$
$$y(\\theta) = R \\sin(\\theta) - R_r \\sin(\\theta + \\psi) - e \\sin((N+1)\\theta)$$

## Components
- Dual counterbalanced 180° out-of-phase cycloidal discs eliminating radial shaft vibrations.
- Needle roller pin ring housing with 30 hardened ground pins.
- Output drive plate with floating roller pins transferring pure planetary torque.`
  },

  "stewart-platform": {
    repo: "addy79/freecad",
    title: "6-DOF Stewart Hexapod Platform",
    badge: "Parallel Kinematics & Simulation",
    content: `# 6-DOF Stewart Hexapod Platform
**CAD Software:** FreeCAD Assembly4 & Kinematics
**Degrees of Freedom:** 6 (Heave, Surge, Sway, Pitch, Roll, Yaw)

## Kinematic Formulation
Closed-form inverse kinematics solving linear actuator lengths $\\mathbf{l}_i$ from desired platform pose $\\mathbf{T} = [\\mathbf{R} | \\mathbf{p}]$:
$$\\mathbf{l}_i = \\mathbf{p} + \\mathbf{R} \\mathbf{b}_i - \\mathbf{a}_i$$
where $\\mathbf{a}_i$ and $\\mathbf{b}_i$ denote base and platform universal joint anchor coordinates.

## Hardware
- 6 high-precision ball screw linear actuators with closed-loop optical position feedback.
- 12 high-angle spherical rod-end joints with 45° angular cone clearance.`
  },

  "delta-robot": {
    repo: "addy79/freecad",
    title: "3-DOF Delta Parallel Robot",
    badge: "High-Speed Parallel Manipulator",
    content: `# 3-DOF High-Speed Delta Robot
**CAD Software:** FreeCAD Parametric Modeling
**Application:** High-speed pick-and-place packaging and sorting.

## Kinematic Analysis
- Three actuated parallel arms driven by direct-drive rotary actuators at 120° base separation.
- Lightweight carbon-fiber tubular parallelogram linkages maintaining planar end-effector orientation:
$$\\sum (x_i - x)^2 + (y_i - y)^2 + (z_i - z)^2 = L^2$$
- Up to 150 picks per minute with sub-millimeter positional repeatability.`
  },

  "robot-arm-6dof": {
    repo: "addy79/freecad",
    title: "6-DOF Industrial Robotic Manipulator",
    badge: "Articulated Industrial Arm",
    content: `# 6-DOF Articulated Robotic Manipulator
**CAD Software:** FreeCAD & SolidWorks
**Payload Capacity:** 3.5 kg at full 650 mm reach.

## Kinematic Model
- Complete Denavit-Hartenberg (DH) parameterization table ($a_i, \\alpha_i, d_i, \\theta_i$).
- Closed-form Pieper's solution for spherical wrist decoupling position $(x, y, z)$ from orientation roll-pitch-yaw $(\\phi, \\theta, \\psi)$.
- Actuation: Harmonic drive reduction on axes 1–3 and cycloidal reduction on axes 4–6.`
  },

  "freecad-suite": {
    repo: "addy79/freecad",
    title: "Precision CAD Engineering Portfolio",
    badge: "Parametric Mechanical Assemblies",
    content: `# Precision CAD & Mechanical Engineering Suite
**CAD Systems:** FreeCAD v0.21/v1.0, SolidWorks, OpenSCAD
**Assemblies:** 100+ parametric mechanisms engineered with ISO/DIN standards and manufacturing tolerances.

## Featured Mechanisms
- Harmonic strain-wave and epicycloidal zero-backlash robotics reducers.
- Stewart 6-DOF hexapod platforms and Delta parallel manipulators.
- Internal combustion engines: Crossplane 90° V8, Inline-4 DOHC 16V, Wankel Rotary, and Axial Jet Engine.
- Precision Horology: Flying Tourbillon escapement with dynamic balance wheel.
- Geneva indexing drives, globoid worm reduction gearboxes, and Conrad-cage ball bearings.`
  },

  "early-games": {
    repo: "addy79/games",
    title: "Early Interactive Games & Physics Engines",
    badge: "Childhood & Early Coding Era",
    content: `# Early Interactive Games & Physics Engines (~Ages 10–16)
**Languages:** C++, Python, Godot, Pygame, Custom OpenGL
**Focus:** Custom discrete 2D/3D physics engines, rigid-body collision response, and pathfinding.

## Archive Highlights
- **Racer3D:** 3D pseudo-physics arcade racing engine with tire traction friction models and raycast suspension.
- **Tower Defense Grid:** A* grid pathfinding with dynamic enemy flow-field routing and spatial projectile ballistics.
- **Asteroid Storm:** 2D Newtonian inertial physics with vector velocity integration and elastic particle collisions.
- **Dungeon Crawler & Platformer Engines:** Pixel-perfect tilemap collisions, state machines, and level editor tooling.`
  }
};

/**
 * Open README Modal
 */
function openReadmeModal(projectId) {
  const data = PROJECT_READMES[projectId];
  if (!data) return;

  let modal = document.getElementById("readme-modal");
  if (!modal) {
    createReadmeModalMarkup();
    modal = document.getElementById("readme-modal");
  }

  document.getElementById("readme-modal-title").innerText = data.title;
  document.getElementById("readme-modal-repo").innerText = data.repo;
  document.getElementById("readme-modal-badge").innerText = data.badge;

  // Simple clean markdown formatting
  const formattedHtml = formatReadmeMarkdown(data.content);
  document.getElementById("readme-modal-body").innerHTML = formattedHtml;

  document.getElementById("readme-modal-backdrop").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReadmeModal() {
  const backdrop = document.getElementById("readme-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function createReadmeModalMarkup() {
  const modalHTML = `
  <div id="readme-modal-backdrop" class="readme-modal-backdrop" onclick="if(event.target===this) closeReadmeModal()">
    <div class="readme-modal">
      <div class="readme-modal-header">
        <div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="badge-tag" style="margin:0;" id="readme-modal-badge">README</span>
            <span class="small text-muted font-mono" id="readme-modal-repo">addy79/repo</span>
          </div>
          <h3 class="readme-modal-title" id="readme-modal-title">Project README</h3>
        </div>
        <button class="toggle-btn" onclick="closeReadmeModal()" title="Close (Esc)" style="border:none; padding: 4px 8px;">
          <i class="fa-solid fa-xmark fa-lg"></i>
        </button>
      </div>
      <div class="readme-modal-body" id="readme-modal-body"></div>
      <div class="readme-modal-footer">
        <span class="text-muted small"><i class="fa-solid fa-lock text-warning mr-1"></i> Private Repository Documentation &bull; Official README Spec</span>
        <button class="btn-folio" onclick="closeReadmeModal()">Close</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeReadmeModal();
    }
  });
}

function formatReadmeMarkdown(md) {
  // Simple regex-based markdown parser for headings, code, lists, and bold text
  let html = md
    .replace(/^### (.*$)/gim, '<h4 class="mt-3 mb-2 font-weight-bold">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="mt-4 mb-2 font-weight-bold text-danger" style="font-size:1.25rem;">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="mt-2 mb-3 font-weight-bold" style="font-size:1.45rem;">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code class="px-1 py-0.5 rounded bg-dark-subtle">$1</code>')
    .replace(/^\- (.*$)/gim, '<li class="ml-3">$1</li>')
    .replace(/\n\n/gim, '</p><p class="mb-2">');

  return '<div class="markdown-body p-2"><p>' + html + '</p></div>';
}
