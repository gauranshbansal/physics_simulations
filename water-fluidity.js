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

    cols = Math.ceil(width / CONFIG.spacingX) + 2;
    rows = Math.ceil(height / CONFIG.spacingY) + 2;
    nodes = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({
          bx: c * CONFIG.spacingX, // Base X
          by: r * CONFIG.spacingY, // Base Y
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

  window.addEventListener('resize', () => {
    isMobile = checkIsMobile();
    initGrid();
  });

  function updatePhysics(timeNow) {
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
      const alpha = CONFIG.baseAlpha + rowEnergy * (CONFIG.highlightAlpha - CONFIG.baseAlpha);
      ctx.strokeStyle = `rgba(165, 180, 252, ${alpha.toFixed(3)})`; // Soft indigo-white tint
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
        const alpha = (CONFIG.baseAlpha * 0.75) + colEnergy * (CONFIG.highlightAlpha - CONFIG.baseAlpha);
        ctx.strokeStyle = `rgba(165, 180, 252, ${alpha.toFixed(3)})`;
        ctx.stroke();
      }
    }

    // Draw subtle intersection nodes where ripple energy is active
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.energy > 0.08) {
        ctx.fillStyle = `rgba(199, 210, 254, ${(n.energy * 0.35).toFixed(3)})`;
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
