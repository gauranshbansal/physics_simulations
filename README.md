# 🌌 Interactive Physics & Computational Simulations

A curated collection of interactive, client-side computational physics engines, numerical solvers, and virtual laboratory experiments developed by **Gauransh Bansal**.

Built purely with modern **HTML5, Canvas API, WebGL, Tailwind CSS, and Vanilla JavaScript** — zero external dependencies, running instantly in any web browser.

---

## 🚀 Live Hub / Gallery

To explore all simulations in an interactive glassmorphism UI, simply open **[`index.html`](index.html)** in any browser.

```bash
# Optional: serve locally with python
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## 🧪 Included Simulations

### 1. 🌊 [Glacial Lake Outburst Flood (GLOF) Simulator](glacier_outburst_simulation.html)
* **File:** `glacier_outburst_simulation.html`
* **Topic:** Geophysics, Hydrodynamics, Dam-Break Outburst Modeling (*Trishuli River Valley*)
* **Features:** Real-time dam breach mechanics, fluid wave propagation, elevation profile graphing, downstream discharge rates, and valley impact modeling.

### 2. ☢️ [Geiger-Müller Virtual Physics Laboratory](geiger_muller_laboratory.html)
* **File:** `geiger_muller_laboratory.html`
* **Topic:** Nuclear Physics, Radiation Detection & Statistical Physics
* **Features:** Voltage characteristic curves (starting potential, Geiger plateau, continuous discharge), dead time calculations, inverse-square law verification, Poisson/Gaussian radiation statistics, and selectable radioactive isotopes ($lpha, eta, \gamma$).

### 3. 🎵 [Chaos as Music & Nonlinear Attractors](chaos_as_music.html)
* **File:** `chaos_as_music.html`
* **Topic:** Nonlinear Dynamics, Chaos Theory & Algorithmic Audio Sonification
* **Features:** Real-time Lorenz and Rössler attractor trajectory calculations, 3D phase-space visualization, real-time audio synthesizer mapped to coordinates $(\dot{x}, \dot{y}, \dot{z})$, Lyapunov exponent tracking.

### 4. 🌀 [Phase Space Laboratory](phase_space_lab.html)
* **File:** `phase_space_lab.html`
* **Topic:** Classical Mechanics, Hamiltonian Systems & Dynamical Systems
* **Features:** Interactive vector field mapping, multi-particle trajectory tracing, energy conservation validation, limit cycles, and Hamiltonian flow phase portraits.

### 5. ⚖️ [Same Equation, Different Reality](same_equation_different_reality.html)
* **File:** `same_equation_different_reality.html`
* **Topic:** Harmonic Oscillators Across Physical Domains
* **Features:** Explores how a single differential equation ($\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = F(t)$) manifests identically across mechanics (damped pendulum), electronics (RLC circuits), optics (Lorentz oscillator), and quantum systems.

### 6. 📐 [ODE Numerical Integration Methods](ode_methods_simulator.html)
* **File:** `ode_methods_simulator.html`
* **Topic:** Computational Physics & Numerical Analysis
* **Features:** Real-time side-by-side benchmark comparison of integration algorithms: **Euler**, **Euler-Cromer**, **Runge-Kutta 4th Order (RK4)**, and **Verlet/Leapfrog**, with phase drift and global truncation error metrics.

### 7. 🎯 [Newton-Raphson & Root-Finding Simulator](newton_raphson_simulator.html)
* **File:** `newton_raphson_simulator.html`
* **Topic:** Numerical Mathematics & Convergence Basins
* **Features:** Step-by-step tangent line geometry visualization, convergence animation, failure modes (local extrema cycles, inflection traps), and complex fractal basin boundaries.

---

## 🛠️ Architecture & Tech Stack

* **Rendering:** HTML5 2D Canvas & WebGL
* **Styling:** Tailwind CSS + Custom Physical / Tactile Glassmorphic Design System
* **Mathematics:** Custom pure JS numerical integrators (RK4, Verlet, Root solvers)
* **Audio:** Web Audio API synth oscillators for chaos sonification
* **Zero Dependencies:** No node_modules, no bundlers, 100% portable single-file architecture.

---

## 🌐 Deploying to GitHub Pages

To publish this entire suite live on GitHub:
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/physics-simulations.git
   git push -u origin main
   ```
2. In your repository on GitHub:
   * Go to **Settings** > **Pages**
   * Under **Build and deployment** > **Source**, select **Deploy from a branch**
   * Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
3. Your interactive simulations suite will be live worldwide at `https://<your-username>.github.io/physics-simulations/`!

---

## 📄 License

Copyright © 2026 Gauransh Bansal. See [`LICENSE`](LICENSE) for terms.
