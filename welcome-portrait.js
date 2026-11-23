'use strict';

globalThis.createWelcomePortrait = function createWelcomePortrait() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const texture = globalThis.welcomePortraitTexture;
  if (motion.matches || !texture) return null;

  const size = 256;
  const relief = document.createElement('canvas');
  relief.width = relief.height = size;
  const surface = relief.getContext('2d', { willReadFrequently: true });
  const frame = surface.createImageData(size, size);
  const firstAppearance = 2200;
  const interval = 16000;
  const duration = 3900;
  const bandHeight = 8;
  const bandOffsets = new Float32Array(size / bandHeight);
  const depth = new Float32Array(size * size);
  const eyePixels = [];
  let lastGaze;
  let portrait;

  function smooth(value) {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  }

  const image = new Image();
  image.onload = () => {
    surface.drawImage(image, 0, 0, size, size);
    const pixels = surface.getImageData(0, 0, size, size).data;
    const { eyes } = texture;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const index = row * size + col;
        const p = index * 4;
        const opacity = pixels[p + 3] / 255;
        const tone = (0.2126 * pixels[p] + 0.7152 * pixels[p + 1] + 0.0722 * pixels[p + 2]) / 255;
        const x = col / size;
        const y = row / size;
        const dome = smooth(1 - Math.hypot((x - 0.5) * 2.08, (y - 0.49) * 1.45));
        depth[index] = opacity * (0.35 * dome + 0.30 * tone);
        const light = tone ** 1.16;
        const silver = 66 * light ** 2;
        pixels[p] = 3 + 83 * light + silver;
        pixels[p + 1] = 9 + 151 * light + silver;
        pixels[p + 2] = 12 + 140 * light + silver;
        let weight = 0;
        for (const eye of eyes) {
          const d = ((x - eye.x) / eye.rx) ** 2 + ((y - eye.y) / eye.ry) ** 2;
          weight = Math.max(weight, smooth(1 - d));
        }
        if (weight) eyePixels.push({ index, col, row, weight });
      }
    }
    portrait = pixels;
  };
  image.src = texture.url;

  // Slide texture inside the eye sockets. The head and eyelid edges stay fixed.
  function setGaze(gaze) {
    if (gaze === lastGaze) return;
    lastGaze = gaze;
    frame.data.set(portrait);
    for (const { index, col, row, weight } of eyePixels) {
      const sourceX = Math.max(0, Math.min(size - 1.001, col - 4.8 * gaze * weight));
      const lower = Math.floor(sourceX);
      const blend = sourceX - lower;
      const source = (row * size + lower) * 4;
      for (let c = 0; c < 3; c++) {
        frame.data[index * 4 + c] = portrait[source + c] * (1 - blend) + portrait[source + c + 4] * blend;
      }
    }
    surface.putImageData(frame, 0, 0);
  }

  let startedAt;
  let amount = 0, gaze = 0, charge = 0, clock = 0;
  let left = 0, top = 0, extent = 0, centerX = 0, eyeY = 0;

  function drawBands(ctx, elapsed, breakup) {
    const scale = extent / size;
    for (let band = 0; band < bandOffsets.length; band++) {
      const row = band * bandHeight;
      const fragment = Math.sin((band + 1) * 63.17);
      const movement = 0.74 + 0.26 * Math.sin(elapsed / 145 + band * 1.7);
      const proximity = Math.max(0, 1 - Math.abs(top + row * scale - eyeY) / (extent * 0.23));
      const shear = gaze * proximity * Math.sin(band * 2.1 + clock) * 0.014;
      const drift = extent * (shear + fragment * 0.44 * breakup * movement);
      bandOffsets[band] = drift;

      const y = top + row * scale;
      ctx.globalAlpha = amount * (0.82 - breakup * Math.abs(fragment) * 0.36);
      ctx.drawImage(relief, 0, row, size, bandHeight, left + drift, y, extent, bandHeight * scale);

      if (band % 4 === 1) {
        ctx.globalAlpha = amount * breakup * (0.60 + 0.33 * Math.abs(fragment));
        ctx.fillStyle = fragment > 0 ? '#8afcf4' : '#5fff8d';
        const edge = left + extent * (fragment > 0 ? 0.74 : 0.19) + drift * 1.6;
        const length = extent * (0.035 + Math.abs(fragment) * 0.12);
        ctx.fillRect(edge, y + scale, length, Math.max(1, scale * 0.85));
        ctx.fillRect(edge + length + 5, y + scale, Math.max(2, length * 0.12), Math.max(1, scale * 0.85));
      }
    }
  }

  return {
    draw(ctx, now, width, height) {
      startedAt ??= now;
      const sinceFirst = now - startedAt - firstAppearance;
      const elapsed = sinceFirst % interval;
      if (!portrait || motion.matches || sinceFirst <= 0 || elapsed >= duration) {
        amount = 0;
        return false;
      }

      amount = smooth(elapsed / 800) * (1 - smooth((elapsed - 2830) / (duration - 2830)));
      const lookLeft = smooth((elapsed - 510) / 510);
      const lookRight = smooth((elapsed - 1460) / 700);
      const lookCenter = smooth((elapsed - 2780) / 760);
      gaze = (-lookLeft + 2 * lookRight) * (1 - lookCenter);
      charge = amount * Math.abs(gaze);
      clock = elapsed / 180;

      extent = Math.min(height * 0.93, width * 1.06);
      centerX = width / 2;
      left = centerX - extent / 2;
      top = height * 0.46 - extent / 2;
      eyeY = top + extent * (texture.eyes[0].y + texture.eyes[1].y) / 2;

      setGaze(gaze);
      ctx.save();
      const assemble = (1 - smooth(elapsed / 870)) * 0.88;
      const tear = smooth((elapsed - 2610) / 760) * 0.96;
      drawBands(ctx, elapsed, Math.min(1, assemble + tear));
      ctx.restore();
      return true;
    },

    bend(xs, ys, point) {
      const x = xs[point], y = ys[point];
      const dx = (x - centerX) / extent;
      const dy = (y - eyeY) / extent;
      if (Math.abs(dx) > 1.38 || Math.abs(dy) > 0.71) return;
      const localY = (y - top) / extent * size;

      if (localY >= 0 && localY < size) {
        const band = Math.floor(localY / bandHeight);
        const localX = (x - left - bandOffsets[band]) / extent * size;
        if (localX >= 0 && localX < size) {
          const col = Math.min(size - 2, Math.floor(localX));
          const row = Math.min(size - 2, Math.floor(localY));
          const i = row * size + col;
          const u = Math.min(1, localX - col), v = Math.min(1, localY - row);
          const a = depth[i] * (1 - u) + depth[i + 1] * u;
          const b = depth[i + size] * (1 - u) + depth[i + size + 1] * u;
          ys[point] -= (a * (1 - v) + b * v) * extent * 0.20 * amount;
        }
      }

      // Feed the glance into the existing flow as a broad, traveling horizontal pull.
      const direction = Math.sign(gaze);
      const downstream = dx * direction;
      const corridor = smooth((downstream + 0.14) * 4) * smooth((1.36 - downstream) * 1.7)
        * smooth((0.56 - Math.abs(dy)) * 2.1);
      if (!corridor || !charge) return;
      const strength = extent * charge * corridor;
      xs[point] += direction * strength * 0.13;
      ys[point] += strength * (dy * 0.39 + 0.069 * Math.sin(downstream * 12 - clock * 2));
    },

    textOpacity() {
      return 1 - 0.98 * amount;
    }
  };
};
