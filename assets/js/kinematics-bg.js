/**
 * Interactive Kinematic Node Mesh Background Canvas
 * Inspired by mechatronics coordinate frames, kinematic linkages, and CAN/UDP data pulses.
 * Pure Vanilla Canvas - High Performance, 60fps, Theme Adaptive, Zero Dependencies.
 */

(function () {
  'use strict';

  // Check reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'kinematics-bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Style canvas to stay fixed in background
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  let width = 0;
  let height = 0;
  let dpr = 1;

  // Kinematic parameters
  const NODE_COUNT_BASE = 55;
  let nodes = [];
  let pulses = [];
  const MAX_LINK_DIST = 140;
  const MOUSE_REACH = 170;

  const mouse = {
    x: -9999,
    y: -9999,
    active: false,
    hoveredNode: null
  };

  // Node class representing kinematic joint nodes
  class KinematicNode {
    constructor(x, y) {
      this.x = x ?? Math.random() * width;
      this.y = y ?? Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.baseRadius = Math.random() * 1.6 + 1.8;
      this.radius = this.baseRadius;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.isAccent = Math.random() < 0.22; // 22% of nodes are active crimson telemetry hubs
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce smoothly off boundaries with soft margin
      if (this.x < 10) { this.x = 10; this.vx *= -1; }
      else if (this.x > width - 10) { this.x = width - 10; this.vx *= -1; }
      if (this.y < 10) { this.y = 10; this.vy *= -1; }
      else if (this.y > height - 10) { this.y = height - 10; this.vy *= -1; }

      // Gentle interactive mouse force (elastic tether / avoidance)
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_REACH && dist > 1) {
          const force = (MOUSE_REACH - dist) / MOUSE_REACH;
          const pushX = (dx / dist) * force * 0.85;
          const pushY = (dy / dist) * force * 0.85;
          this.x += pushX;
          this.y += pushY;
        }
      }

      this.pulsePhase += 0.03;
    }
  }

  // Telemetry pulse packet traveling along active linkages
  class TelemetryPulse {
    constructor(fromNode, toNode) {
      this.from = fromNode;
      this.to = toNode;
      this.progress = 0;
      this.speed = Math.random() * 0.015 + 0.012;
      this.dead = false;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.dead = true;
      }
    }

    draw(themeIsDark) {
      const curX = this.from.x + (this.to.x - this.from.x) * this.progress;
      const curY = this.from.y + (this.to.y - this.from.y) * this.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = themeIsDark ? '#ef4444' : '#dc2626';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = themeIsDark ? 8 : 4;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    // Calculate node density based on screen dimensions
    const count = Math.min(Math.floor((width * height) / 18000), 75);
    initNodes(Math.max(count, 35));
  }

  function initNodes(targetCount) {
    nodes = [];
    pulses = [];
    for (let i = 0; i < targetCount; i++) {
      nodes.push(new KinematicNode());
    }
  }

  // Mouse & touch tracking
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', resize, { passive: true });

  // Main rendering loop
  let lastTime = 0;
  function animate(time) {
    requestAnimationFrame(animate);

    // Limit to ~60 fps
    if (time - lastTime < 14) return;
    lastTime = time;

    const themeIsDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Clear frame
    ctx.clearRect(0, 0, width, height);

    // Update nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
    }

    // Spawn telemetry pulses occasionally between connected nodes
    if (pulses.length < 8 && Math.random() < 0.05 && nodes.length > 2) {
      const idxA = Math.floor(Math.random() * nodes.length);
      const nodeA = nodes[idxA];
      // Find a nearby node
      for (let j = 0; j < nodes.length; j++) {
        if (idxA === j) continue;
        const nodeB = nodes[j];
        const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
        if (dist < MAX_LINK_DIST) {
          pulses.push(new TelemetryPulse(nodeA, nodeB));
          break;
        }
      }
    }

    // Draw linkages
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);

        if (dist < MAX_LINK_DIST) {
          const alpha = (1 - dist / MAX_LINK_DIST) * (themeIsDark ? 0.35 : 0.22);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);

          if (a.isAccent || b.isAccent) {
            ctx.strokeStyle = themeIsDark
              ? `rgba(239, 68, 68, ${alpha * 0.9})`
              : `rgba(220, 38, 38, ${alpha * 0.75})`;
          } else {
            ctx.strokeStyle = themeIsDark
              ? `rgba(148, 163, 184, ${alpha * 0.6})`
              : `rgba(100, 116, 139, ${alpha * 0.5})`;
          }
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw mouse tether links
      if (mouse.active) {
        const mDist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (mDist < MOUSE_REACH) {
          const mAlpha = (1 - mDist / MOUSE_REACH) * (themeIsDark ? 0.6 : 0.4);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(239, 68, 68, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Draw pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.update();
      p.draw(themeIsDark);
      if (p.dead) {
        pulses.splice(i, 1);
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const pulseSize = Math.sin(n.pulsePhase) * 0.6;
      const r = Math.max(n.radius + pulseSize, 1);

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

      if (n.isAccent) {
        ctx.fillStyle = themeIsDark ? '#ef4444' : '#dc2626';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = themeIsDark ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle outer targeting ring for telemetry hubs
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = themeIsDark ? 'rgba(239, 68, 68, 0.35)' : 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else {
        ctx.fillStyle = themeIsDark ? 'rgba(203, 213, 225, 0.65)' : 'rgba(71, 85, 105, 0.55)';
        ctx.fill();
      }
    }

    // Subtle end-effector crosshair at mouse cursor
    if (mouse.active) {
      const chSize = 7;
      ctx.strokeStyle = themeIsDark ? 'rgba(239, 68, 68, 0.7)' : 'rgba(239, 68, 68, 0.55)';
      ctx.lineWidth = 1.2;

      // Small targeting crosshair
      ctx.beginPath();
      ctx.moveTo(mouse.x - chSize, mouse.y);
      ctx.lineTo(mouse.x + chSize, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - chSize);
      ctx.lineTo(mouse.x, mouse.y + chSize);
      ctx.stroke();

      // Outer ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 11, 0, Math.PI * 2);
      ctx.strokeStyle = themeIsDark ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }
  }

  // Initialize and start animation
  resize();
  requestAnimationFrame(animate);
})();
