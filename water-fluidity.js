(function () {
  const canvas = document.getElementById('water-fluid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // --- SUBTLETY & PHYSICS TUNING ---
  const CONFIG = {
    spacingX: 38,          // Distance between vertical string nodes
    spacingY: 38,          // Distance between horizontal strings
    springTension: 0.035,  // How fast strings snap back to rest
    damping: 0.92,         // Velocity decay (higher = longer oscillation)
    spread: 0.18,          // How much neighboring nodes pull each other
    mouseRadius: 130,      // Reach of cursor hover interaction
    mouseStrength: 0.18,   // Subtlety of direct cursor push
    rippleSpeed: 3.2,      // Expansion speed of hover ripples
    rippleStrength: 1.4,   // Peak displacement of a ripple wave
    baseAlpha: 0.045,      // Resting opacity of strings (very subtle)
    highlightAlpha: 0.16,  // Max opacity when displaced by a ripple
    drawVertical: true,    // true = woven string frame, false = horizontal strings only

    // --- MOBILE AUTONOMOUS AMBIENT FLOW ---
    mobileWaveSpeed: 0.0013,    // Slow, meditative harmonic wave pace
    mobileWaveStrength: 0.038,  // Amplitude of the natural undulating flow
    mobileTouchRadius: 100      // Touch interaction radius on mobile screens
  };

  let width = 0, height = 0, cols = 0, rows = 0;
  let nodes = [];
  let ripples = [];

  function checkIsMobile() {
    return window.innerWidth <= 820 || window.matchMedia('(pointer: coarse)').matches;
  }
  let isMobile = checkIsMobile();

  const mouse = {
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999,
    lastRippleTime: 0
  };

  function initGrid() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const marginCols = 2;
    const marginRows = 2;
    cols = Math.ceil(width / CONFIG.spacingX) + marginCols * 2 + 1;
    rows = Math.ceil(height / CONFIG.spacingY) + marginRows * 2 + 1;
    nodes = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({
          bx: (c - marginCols) * CONFIG.spacingX, // Base X (extends safely offscreen)
          by: (r - marginRows) * CONFIG.spacingY, // Base Y (extends safely offscreen)
          dx: 0,                   // Displacement X
          dy: 0,                   // Displacement Y
          vx: 0,                   // Velocity X
          vy: 0,                   // Velocity Y
          energy: 0                // Visual highlight intensity
        });
      }
    }
  }

  // Track cursor or touch across the window so pointer-events-none stays intact
  function handlePointerMove(clientX, clientY) {
    if (mouse.lastX === -9999) {
      mouse.lastX = clientX;
      mouse.lastY = clientY;
    }
    mouse.vx = clientX - mouse.lastX;
    mouse.vy = clientY - mouse.lastY;
    mouse.x = clientX;
    mouse.y = clientY;
    mouse.lastX = clientX;
    mouse.lastY = clientY;

    const speed = Math.hypot(mouse.vx, mouse.vy);
    const now = performance.now();

    // Spawn subtle harmonic ripples as the cursor / touch moves
    if (speed > 2.5 && now - mouse.lastRippleTime > 90) {
      ripples.push({
        x: mouse.x,
        y: mouse.y,
        radius: 4,
        maxRadius: 220 + Math.min(speed * 4, 140),
        strength: Math.min(speed * 0.08, CONFIG.rippleStrength),
        wavelength: 42
      });
      if (ripples.length > 10) ripples.shift();
      mouse.lastRippleTime = now;
    }
  }

  window.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('touchend', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // --- SUBTLE THERMAL RED TINT & CYBERPUNK HEATING (5s -> 6s -> 10s hold Easter Egg) ---
  let isPressed = false;
  let pressStartTime = 0;
  let heatStage = 0; // 0.0 = cold (default), 1.0 = subtle dim red (6s), 2.0 = neon cyberpunk red (10s)

  function onPointerDown(e) {
    isPressed = true;
    pressStartTime = performance.now();
  }

  function onPointerUp() {
    isPressed = false;
    pressStartTime = 0;
  }

  window.addEventListener('mousedown', onPointerDown, { passive: true });
  window.addEventListener('mouseup', onPointerUp, { passive: true });
  window.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });
  window.addEventListener('touchcancel', onPointerUp, { passive: true });

  window.addEventListener('resize', () => {
    isMobile = checkIsMobile();
    initGrid();
  });

  function updatePhysics(timeNow) {
    // 0. Hold-duration check: 5s subtle red -> 6s heating -> 10s neon cyberpunk red
    let targetStage = 0;
    if (isPressed && pressStartTime > 0) {
      const heldMs = timeNow - pressStartTime;
      if (heldMs >= 6000) {
        // Heating phase from 6s to 10s (stage 1.0 -> 2.0)
        targetStage = 1.0 + Math.min(1.0, (heldMs - 6000) / 4000);
      } else if (heldMs >= 5000) {
        // Subtle dim red tint phase from 5s to 6s (stage 0.0 -> 1.0)
        targetStage = (heldMs - 5000) / 1000;
      }
    }

    // Zero-overhead fast exit: when idle and cold, skip all thermal computation
    if (!isPressed && heatStage < 0.001) {
      heatStage = 0;
    } else {
      heatStage += (targetStage - heatStage) * (isPressed ? 0.04 : 0.035);
    }

    // Micro thermal vibration when actively heating (between 6s and 10s)
    if (heatStage > 1.02) {
      const heatFactor = heatStage - 1.0;
      const thermalAmp = heatFactor * 0.022;
      const t = timeNow * 0.015;
      for (let i = 0; i < nodes.length; i += 4) { // Sparsely sample every 4th node for zero lag
        nodes[i].vx += Math.sin(t + i) * thermalAmp;
        nodes[i].vy += Math.cos(t * 1.3 + i) * thermalAmp;
      }
    }

    // 1. Advance active radial ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].radius += CONFIG.rippleSpeed;
      if (ripples[i].radius > ripples[i].maxRadius) {
        ripples.splice(i, 1);
      }
    }

    // 2. Mobile autonomous natural flowy wiggle (gentle ambient harmonic breeze)
    if (isMobile) {
      const t = timeNow * CONFIG.mobileWaveSpeed;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const n = nodes[idx];

          // Diagonal traveling multi-harmonic undulation
          const phaseX = c * 0.22 + r * 0.15 + t;
          const phaseY = r * 0.25 - c * 0.13 + t * 0.8;

          n.vx += Math.cos(phaseY) * CONFIG.mobileWaveStrength;
          n.vy += Math.sin(phaseX) * CONFIG.mobileWaveStrength;
        }
      }
    }

    // 3. Local node spring physics + cursor & ripple forces
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const n = nodes[idx];

        // Hooke's law restoring force to original grid anchor
        n.vx += -n.dx * CONFIG.springTension;
        n.vy += -n.dy * CONFIG.springTension;

        // Direct cursor / touch wake (gentle plucking)
        const cdx = n.bx - mouse.x;
        const cdy = n.by - mouse.y;
        const cDistSq = cdx * cdx + cdy * cdy;
        const maxR = isMobile ? CONFIG.mobileTouchRadius : CONFIG.mouseRadius;

        if (cDistSq < maxR * maxR) {
          const cDist = Math.sqrt(cDistSq) || 1;
          const falloff = Math.pow(1 - cDist / maxR, 2);
          n.vx += mouse.vx * falloff * CONFIG.mouseStrength * 0.25;
          n.vy += mouse.vy * falloff * CONFIG.mouseStrength * 0.25;
        }

        // Radial ripple wave front displacement
        for (let i = 0; i < ripples.length; i++) {
          const rip = ripples[i];
          const rdx = n.bx - rip.x;
          const rdy = n.by - rip.y;
          const dist = Math.hypot(rdx, rdy) || 1;
          const delta = dist - rip.radius;

          if (Math.abs(delta) < rip.wavelength) {
            const lifeFade = 1 - rip.radius / rip.maxRadius;
            const wave = Math.sin((delta / rip.wavelength) * Math.PI);
            const force = wave * rip.strength * lifeFade * 0.15;

            n.vx += (rdx / dist) * force;
            n.vy += (rdy / dist) * force;
          }
        }
      }
    }

    // 4. Coupled string tension (neighbors pull on each other along the string)
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        const idx = r * cols + c;
        const n = nodes[idx];
        const left = nodes[idx - 1];
        const right = nodes[idx + 1];
        const up = nodes[idx - cols];
        const down = nodes[idx + cols];

        const avgDx = (left.dx + right.dx + up.dx + down.dx) * 0.25;
        const avgDy = (left.dy + right.dy + up.dy + down.dy) * 0.25;

        n.vx += (avgDx - n.dx) * CONFIG.spread;
        n.vy += (avgDy - n.dy) * CONFIG.spread;
      }
    }

    // 5. Integrate velocities & damp
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.vx *= CONFIG.damping;
      n.vy *= CONFIG.damping;
      n.dx += n.vx;
      n.dy += n.vy;

      const disp = Math.hypot(n.dx, n.dy);
      n.energy = Math.min(1, disp / 8);
    }

    mouse.vx *= 0.8;
    mouse.vy *= 0.8;
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    // Fast-path for default idle/cold state: zero math, zero memory overhead!
    let strokeColorBase = '165, 180, 252';
    let nodeColorBase = '199, 210, 254';
    let baseAlpha = CONFIG.baseAlpha;
    let highlightAlpha = CONFIG.highlightAlpha;

    if (heatStage > 0.001) {
      if (heatStage <= 1.0) {
        // Stage 1: 5s-6s (subtle dim red tint, exact identical dimness)
        const t = heatStage;
        const rVal = Math.round(165 * (1 - t) + 218 * t);
        const gVal = Math.round(180 * (1 - t) + 148 * t);
        const bVal = Math.round(252 * (1 - t) + 162 * t);
        strokeColorBase = `${rVal}, ${gVal}, ${bVal}`;

        const rNode = Math.round(199 * (1 - t) + 235 * t);
        const gNode = Math.round(210 * (1 - t) + 172 * t);
        const bNode = Math.round(254 * (1 - t) + 182 * t);
        nodeColorBase = `${rNode}, ${gNode}, ${bNode}`;
      } else {
        // Stage 2: 6s-10s (heating up to neon cyberpunk red, bright yet non-distracting)
        const h = Math.min(1.0, heatStage - 1.0);
        // [218, 148, 162] -> [255, 26, 74] (neon cyberpunk crimson-red)
        const rVal = Math.round(218 + (255 - 218) * h);
        const gVal = Math.round(148 + (26 - 148) * h);
        const bVal = Math.round(162 + (74 - 162) * h);
        strokeColorBase = `${rVal}, ${gVal}, ${bVal}`;

        const rNode = Math.round(235 + (255 - 235) * h);
        const gNode = Math.round(172 + (60 - 172) * h);
        const bNode = Math.round(182 + (110 - 182) * h);
        nodeColorBase = `${rNode}, ${gNode}, ${bNode}`;

        // Gentle neon luminosity scaling (0.045 -> 0.11 base, remaining refined & non-distracting)
        baseAlpha = CONFIG.baseAlpha + 0.065 * h;
        highlightAlpha = CONFIG.highlightAlpha + 0.14 * h;
      }
    }

    // Draw Horizontal Strings
    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      let rowEnergy = 0;

      for (let c = 0; c < cols; c++) {
        const n = nodes[r * cols + c];
        const x = n.bx + n.dx;
        const y = n.by + n.dy;
        if (n.energy > rowEnergy) rowEnergy = n.energy;

        if (c === 0) {
          ctx.moveTo(x, y);
        } else {
          const prev = nodes[r * cols + (c - 1)];
          const cx = (prev.bx + prev.dx + x) * 0.5;
          const cy = (prev.by + prev.dy + y) * 0.5;
          ctx.quadraticCurveTo(prev.bx + prev.dx, prev.by + prev.dy, cx, cy);
        }
      }
      const alpha = baseAlpha + rowEnergy * (highlightAlpha - baseAlpha);
      ctx.strokeStyle = `rgba(${strokeColorBase}, ${alpha.toFixed(3)})`;
      ctx.stroke();
    }

    // Draw Vertical Strings (completes the woven string-frame look)
    if (CONFIG.drawVertical) {
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        let colEnergy = 0;

        for (let r = 0; r < rows; r++) {
          const n = nodes[r * cols + c];
          const x = n.bx + n.dx;
          const y = n.by + n.dy;
          if (n.energy > colEnergy) colEnergy = n.energy;

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            const prev = nodes[(r - 1) * cols + c];
            const cx = (prev.bx + prev.dx + x) * 0.5;
            const cy = (prev.by + prev.dy + y) * 0.5;
            ctx.quadraticCurveTo(prev.bx + prev.dx, prev.by + prev.dy, cx, cy);
          }
        }
        const alpha = (baseAlpha * 0.75) + colEnergy * (highlightAlpha - baseAlpha);
        ctx.strokeStyle = `rgba(${strokeColorBase}, ${alpha.toFixed(3)})`;
        ctx.stroke();
      }
    }

    // Draw subtle intersection nodes where ripple energy is active
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.energy > 0.08) {
        ctx.fillStyle = `rgba(${nodeColorBase}, ${(n.energy * (0.35 + 0.25 * Math.max(0, heatStage - 1))).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.bx + n.dx, n.by + n.dy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function animate(timeNow) {
    updatePhysics(timeNow || performance.now());
    render();
    requestAnimationFrame(animate);
  }

  initGrid();
  animate(performance.now());
})();
