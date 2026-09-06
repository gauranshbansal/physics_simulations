# 🌌 Interactive Physics & Computational Simulations Suite

> **A curated collection of client-side computational physics engines, numerical solvers, and interactive virtual laboratories engineered by [Gauransh Bansal](https://www.linkedin.com/in/gauransh-bansal-a71223239/).**

Built entirely with modern **HTML5 Canvas, WebGL, Tailwind CSS, Web Audio API, and Vanilla JavaScript** — zero dependencies, fully portable, and running natively in any modern browser.

---

## 📖 The Story & Development Philosophy

Over the past month, I have dedicated myself tirelessly to building, refining, and documenting this simulation suite. This repository reflects a modern, **human-in-the-loop, AI-augmented scientific workflow**:

```
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│   Theoretical Rigor       │ ───► │  AI Algorithmic Scaffolding│ ───► │   Iterative Engineering   │
│ (Derivation, PDEs, ODEs)  │      │  (Google Antigravity / LLM│      │ (Convergence, Integrators)│
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
                                                                                    │
                                                                                    ▼
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│   Public Video Breakdown  │ ◄─── │   Tactile Glassmorphic UI │ ◄─── │   Physical Verification   │
│   (Scripted, Shot, Edited)│      │   (Interactive Canvas/Audio)│     │   (Boundary Conditions)   │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

1. **Rigorous Theoretical Grounding:** Every simulator begins with deep mathematical and physical derivations—whether deriving the Navier-Stokes / Shallow Water approximations for outburst floods, modeling non-linear Lorenz attractor trajectories, or calculating Poisson/Gaussian radiation decay statistics.
2. **AI-Assisted Prototyping (Google Antigravity & Gemini):** I leverage Google Antigravity / Gemini for rapid scaffolding, generating initial mathematical translation layers and canvas rendering primitives.
3. **Multi-Pass Numerical & Physical Refinement:** From the initial scaffold, I iteratively refactor, stress-test, and refine the codebase. This involves tuning numerical integrators (transitioning from naive Euler to symplectic Verlet and adaptive RK4), implementing strict boundary conditions, debugging phase drift, optimizing frame rates, and styling with a tactile glassmorphic design system.
4. **End-to-End Educational Communication:** For each simulator, I script, film, and edit a comprehensive video breakdown explaining the underlying physics and numerical mechanics, published on my **[LinkedIn profile](https://www.linkedin.com/in/gauransh-bansal-a71223239/)**.

---

### 💡 Note on Methodology vs. Academic Repositories

> **A Note on Authenticity:**  
> This repository represents a fusion of deep physics intuition with modern generative development. Unlike my **B.Sc. and M.Sc. physics repositories** (which were coded 100% natively by hand in C++, Fortran, Scilab, and Python), this project explores how a physicist can act as an **architect and orchestrator**—combining domain expertise with AI-assisted code generation to build complex, full-stack visual laboratories at high velocity without sacrificing mathematical rigor.

---

## 🚀 Live Hub / Gallery

To explore all simulations in an interactive glassmorphism UI, simply open **[`index.html`](index.html)** in any browser.

```bash
# Optional: serve locally
python -m http.server 8000
# Visit: http://localhost:8000
```

---

## 🧪 Simulation Catalog

### 1. 🌊 [Glacial Lake Outburst Flood (GLOF) Simulator](glacier_outburst_simulation.html)
* **File:** `glacier_outburst_simulation.html`
* **Topic:** Geophysics, Hydrodynamics, Dam-Break Outburst Modeling (*Trishuli River Valley*)
* **Features:** Real-time dam breach mechanics, fluid wave propagation, elevation profile graphing, downstream discharge rates, and valley impact modeling.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

### 2. ☢️ [Geiger-Müller Virtual Physics Laboratory](geiger_muller_laboratory.html)
* **File:** `geiger_muller_laboratory.html`
* **Topic:** Nuclear Physics, Radiation Detection & Statistical Physics
* **Features:** Full voltage characteristic curves (starting potential, Geiger plateau, continuous discharge), dead time calculations, inverse-square law verification, Poisson/Gaussian radiation statistics, and selectable radioactive isotopes ($\alpha, \beta, \gamma$).
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

### 3. 🎵 [Chaos as Music & Nonlinear Attractors](chaos_as_music.html)
* **File:** `chaos_as_music.html`
* **Topic:** Nonlinear Dynamics, Chaos Theory & Algorithmic Audio Sonification
* **Features:** Real-time Lorenz and Rössler attractor trajectory calculations, 3D phase-space visualization, Web Audio API synthesizer mapped to dynamical coordinates ($x, y, z$), and Lyapunov exponent tracking.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

### 4. 🌀 [Phase Space Laboratory](phase_space_lab.html)
* **File:** `phase_space_lab.html`
* **Topic:** Classical Mechanics, Hamiltonian Systems & Dynamical Systems
* **Features:** Interactive vector field mapping, multi-particle trajectory tracing, energy conservation validation, limit cycles, and Hamiltonian flow phase portraits.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

### 5. ⚖️ [Same Equation, Different Reality](same_equation_different_reality.html)
* **File:** `same_equation_different_reality.html`
* **Topic:** Harmonic Oscillators Across Physical Domains
* **Features:** Explores how a single second-order differential equation ($\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = F(t)$) manifests identically across mechanics (damped pendulum), electronics (RLC circuits), optics (Lorentz oscillator), and quantum systems.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

### 6. 📐 [ODE Numerical Integration Methods](ode_methods_simulator.html)
* **File:** `ode_methods_simulator.html`
* **Topic:** Computational Physics & Numerical Analysis
* **Features:** Real-time side-by-side benchmark comparison of integration algorithms: **Euler**, **Euler-Cromer**, **Runge-Kutta 4th Order (RK4)**, and **Verlet/Leapfrog**, with phase drift and global truncation error metrics.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

### 7. 🎯 [Newton-Raphson & Root-Finding Simulator](newton_raphson_simulator.html)
* **File:** `newton_raphson_simulator.html`
* **Topic:** Numerical Mathematics & Convergence Basins
* **Features:** Step-by-step tangent line geometry visualization, convergence animation, failure modes (local extrema cycles, inflection traps), and complex fractal basin boundaries.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

## 🛠️ Tech Stack & Architecture

* **Visual Engine:** HTML5 2D Canvas & WebGL with responsive high-DPI scaling.
* **UI/UX Design:** Custom Tailwind CSS with a physical glassmorphic theme.
* **Numerical Mathematics:** Custom numerical integrators (Euler-Cromer, RK4, Symplectic Verlet, Root solvers).
* **Audio Sonification:** Native Web Audio API synth oscillators.
* **Portability:** Zero build tools or npm dependencies; 100% portable single-file architecture.

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/physics-simulations.git
   git push -u origin main
   ```
2. In GitHub:
   * Go to **Settings > Pages**
   * Under **Branch**, choose **`main`** and **`/ (root)`**, then click **Save**.
3. Your interactive simulations suite will be live worldwide at:  
   `https://<your-username>.github.io/physics-simulations/`

---

## 👤 Author & Connect

**Gauransh Bansal**  
*M.Sc. Physics (Department of Physics & Astrophysics, University of Delhi)*  
* **LinkedIn:** [linkedin.com/in/gauransh-bansal-a71223239](https://www.linkedin.com/in/gauransh-bansal-a71223239/)  

---

## 📄 License

Copyright © 2026 Gauransh Bansal. See [`LICENSE`](LICENSE) for terms.
