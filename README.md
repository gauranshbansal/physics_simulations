# 🌌 Gauransh Bansal Labs — Interactive Physics & Computational Simulations

<p align="center">
  <img src="hero_labs.jpg" alt="Gauransh Bansal Labs — Interactive Physics Simulation Suite" width="920" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 16px 40px rgba(0,0,0,0.6);">
</p>

> **A curated collection of client-side computational physics engines, generative ecosystems, numerical solvers, and interactive virtual laboratories engineered by [Gauransh Bansal](https://www.linkedin.com/in/gauransh-bansal-a71223239/).**

Built entirely with modern **HTML5 Canvas, WebGL, Three.js, Tailwind CSS, Web Audio API, and Vanilla JavaScript** — zero dependencies, fully portable, and running natively in any modern browser.

<p align="center">
  <a href="index.html"><img src="https://img.shields.io/badge/Live%20Library-13%20Simulations-blue.svg?style=flat-square" alt="13 Simulations"></a>
  <img src="https://img.shields.io/badge/Architecture-100%25%20Client--Side-green.svg?style=flat-square" alt="Client-Side">
  <img src="https://img.shields.io/badge/Engines-Three.js%20%7C%20Canvas2D%20%7C%20WebAudio-orange.svg?style=flat-square" alt="Engines">
  <img src="https://img.shields.io/badge/Author-M.Sc.%20Physics%20(DU)-purple.svg?style=flat-square" alt="Author">
</p>

---

## 🌟 Featured Simulation

<p align="center">
  <img src="lumos_featured_laboratory.jpg" alt="Featured Simulation — LUMOS: Molecular Spectroscopy Laboratory" width="920" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 16px 40px rgba(0,0,0,0.6);">
</p>

### 🔮 [LUMOS: Molecular Spectroscopy Laboratory](lumos_molecular_spectroscopy.html)
* **File:** [`lumos_molecular_spectroscopy.html`](lumos_molecular_spectroscopy.html)
* **Topic:** Quantum Chemistry, Molecular Spectroscopy, Rotational Microwave & Vibrational Infrared Quantum Transitions
* **Features:** An immersive first-person 3D alchemical laboratory where students wield a magical wand to interrogate diatomic molecules ($^1\text{H}^{35}\text{Cl}$, $^1\text{H}^{79}\text{Br}$, $^1\text{H}^{127}\text{I}$, $^{12}\text{C}^{16}\text{O}$), reveal blackboard derivations, decode Hedwig's experimental parchment scrolls, and solve the 4-compound archive vault puzzle.

---

## 📖 The Story & Development Philosophy

Over the past month, I have dedicated myself tirelessly to building, refining, and documenting this simulation suite. This repository reflects a modern, **human-in-the-loop, AI-augmented scientific workflow**:

```text
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

1. **Rigorous Theoretical Grounding:** Every simulator begins with deep mathematical and physical derivations—whether deriving Navier-Stokes / Shallow Water approximations for outburst floods, modeling non-linear Lorenz attractor trajectories, or calculating Poisson/Gaussian radiation decay statistics.
2. **AI-Assisted Prototyping (Google Antigravity & Gemini):** I leverage Google Antigravity / Gemini for rapid scaffolding, generating mathematical translation layers and canvas rendering primitives.
3. **Multi-Pass Numerical & Physical Refinement:** From the initial scaffold, I iteratively refactor, stress-test, and tune numerical integrators (transitioning from naive Euler to symplectic Verlet and adaptive RK4), implementing boundary conditions, debugging phase drift, optimizing frame rates, and styling with a tactile glassmorphic design system.
4. **End-to-End Educational Communication:** For each simulator, I script, film, and edit a comprehensive video breakdown explaining the underlying physics and numerical mechanics, published on my **[LinkedIn profile](https://www.linkedin.com/in/gauransh-bansal-a71223239/)**.

---

### 💡 Note on Methodology vs. Academic Repositories

> **A Note on Authenticity:**  
> This repository represents a fusion of deep physics intuition with modern generative development. Unlike my **B.Sc. and M.Sc. physics repositories** (which were coded 100% natively by hand in C++, Fortran, Scilab, and Python), this project explores how a physicist can act as an **architect and orchestrator**—combining domain expertise with AI-assisted code generation to build complex, full-stack visual laboratories at high velocity without sacrificing mathematical rigor.

---

## 🚀 Live Hub / Gallery

To explore all 13 simulations in an interactive glassmorphic UI, simply open **[`index.html`](index.html)** in any browser or visit the **[About Me](about.html)** page to explore the author's background and pursuits.

```bash
# Optional: serve locally
python -m http.server 8000
# Visit: http://localhost:8000
```

---

## 🧪 Simulation Catalog (13 Laboratories)

### 1. 🔮 [LUMOS: Molecular Spectroscopy Laboratory](lumos_molecular_spectroscopy.html)
<p align="center">
  <img src="lumos_molecular_spectroscopy.png" alt="LUMOS Molecular Spectroscopy 3D Lab" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`lumos_molecular_spectroscopy.html`](lumos_molecular_spectroscopy.html)
* **Badge:** Quantum Chemistry & Spectroscopy
* **Description:** First-person 3D quantum laboratory with wand-directed light beams, diatomic potential curves, rotational/vibrational energy level excitation, and blackboard derivations.

---

### 2. ⚖️ [Same Equation, Different Reality](same_equation_different_reality.html)
<p align="center">
  <img src="same_equation_different_reality.png" alt="Same Equation, Different Reality" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`same_equation_different_reality.html`](same_equation_different_reality.html)
* **Badge:** Universal Systems Lab
* **Features:** Explores how a single second-order differential equation ($\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = F(t)$) manifests identically across mechanics (damped pendulum), electronics (RLC circuits), optics (Lorentz oscillator), and acoustic resonance.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 3. ⚡ [The World of Capacitors](unconventional_capacitors.html)
<p align="center">
  <img src="world_of_capacitors.png" alt="The World of Capacitors Simulation" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`unconventional_capacitors.html`](unconventional_capacitors.html)
* **Badge:** Electrostatics & Nanotechnology
* **Features:** From canonical parallel-plate, cylindrical, and spherical geometries to unconventional fractal and quantum capacitance realities. Interactive field-line plotting, dielectric boundary conditions, and dielectric breakdown thresholds.

---

### 4. ☢️ [Geiger-Müller Virtual Physics Laboratory](geiger_muller_laboratory.html)
<p align="center">
  <img src="geiger_muller_laboratory.jpeg" alt="Geiger-Müller Virtual Physics Laboratory" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`geiger_muller_laboratory.html`](geiger_muller_laboratory.html)
* **Badge:** Nuclear & Plasma Physics
* **Features:** Full voltage characteristic curves (starting potential, Geiger plateau, continuous discharge), Townsend avalanche multiplication, dead time kinetics, inverse-square law verification, Poisson/Gaussian statistics, and selectable isotopes ($\alpha, \beta, \gamma$).
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 5. 🎵 [Chaos as Music & Nonlinear Attractors](chaos_as_music.html)
<p align="center">
  <img src="chaos_as_music.png" alt="Chaos as Music & Nonlinear Attractors" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`chaos_as_music.html`](chaos_as_music.html)
* **Badge:** Scientific Instrument & Sonification
* **Features:** Real-time Lorenz and Rössler attractor trajectory calculations, 3D phase-space visualization, Web Audio API synthesizer mapped to dynamical coordinates ($x, y, z$), and Lyapunov exponent tracking.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 6. 🌐 [Landscape of Futures (Chaos & Complexity)](lof.html)
<p align="center">
  <img src="landscape_of_futures.png" alt="Landscape of Futures Simulation" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`lof.html`](lof.html)
* **Badge:** WebGL Ultra Edition
* **Features:** Visual exploration of deterministic chaotic systems and bifurcation regimes, demonstrating how microscopic perturbations in initial states cascade into divergent macro-scale trajectories.

---

### 7. 🌀 [Phase Space Laboratory](phase_space_lab.html)
<p align="center">
  <img src="phase_space_lab.png" alt="Phase Space Laboratory" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`phase_space_lab.html`](phase_space_lab.html)
* **Badge:** Dynamical Systems Lab
* **Features:** Interactive vector field mapping, multi-particle trajectory tracing, energy conservation validation, limit cycles, and Hamiltonian flow phase portraits.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 8. 🌊 [Glacial Lake Outburst Flood (GLOF) Simulator](glacier_outburst_simulation.html)
<p align="center">
  <img src="glacier_outburst_simulation.png" alt="Glacial Lake Outburst Flood Simulator" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`glacier_outburst_simulation.html`](glacier_outburst_simulation.html)
* **Badge:** Environmental Geophysics
* **Features:** Real-time moraine dam breach mechanics, fluid surge wave propagation, elevation profile graphing, downstream discharge rates, and valley impact modeling across the *Trishuli River Valley*.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 9. 📐 [ODE Numerical Integration Methods](ode_methods_simulator.html)
<p align="center">
  <img src="ode_methods_simulator.png" alt="ODE Numerical Integration Methods Benchmark" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`ode_methods_simulator.html`](ode_methods_simulator.html)
* **Badge:** Numerical Methods
* **Features:** Real-time side-by-side benchmark comparison of integration algorithms: **Euler**, **Euler-Cromer**, **Runge-Kutta 4th Order (RK4)**, and **Verlet/Leapfrog**, with phase drift and global truncation error metrics.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 10. 🎯 [Newton-Raphson & Root-Finding Simulator](newton_raphson_simulator.html)
<p align="center">
  <img src="newton_raphson_simulator.png" alt="Newton-Raphson Root-Finding Simulator" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`newton_raphson_simulator.html`](newton_raphson_simulator.html)
* **Badge:** Numerical Methods
* **Features:** Step-by-step tangent line geometry visualization, convergence animation, failure modes (local extrema cycles, inflection traps), and complex fractal basin boundaries.
* **Breakdown:** Documented with video analysis on [LinkedIn](https://www.linkedin.com/in/gauransh-bansal-a71223239/).

---

### 11. 🌿 [AETHERIA: Living Digital Terrarium (2D Generative Life)](aetheria_terrarium_2d.html)
<p align="center">
  <img src="aetheria_terrarium_2d.png" alt="AETHERIA 2D Terrarium Simulation" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`aetheria_terrarium_2d.html`](aetheria_terrarium_2d.html)
* **Badge:** Emergence & Sonification
* **Features:** Flocking herbivore boids with quadtree-accelerated spatial awareness, neural apex predators, multi-segment inverse-kinematics sinusoidal leviathans, nutrient spore flora lifecycle, genetic mutation inheritance across generations, and an ambient pentatonic generative Web Audio synthesizer.

---

### 12. 🌌 [AETHERIA 3D: The Infinite Cosmos](aetheria_cosmos_3d.html)
<p align="center">
  <img src="aetheria_cosmos_3d.png" alt="AETHERIA 3D Cosmos Simulation" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`aetheria_cosmos_3d.html`](aetheria_cosmos_3d.html)
* **Badge:** WebGL & 3D Spatial Audio
* **Features:** Built with Three.js WebGL: 3D multi-tiered gravitational wells, volumetric stardust fields, celestial flocking swarms with 3D obstacle avoidance, luminous energy bloom shaders, cosmic spine leviathans, interactive orbital controls, and spatial audio sonification.

---

### 13. 🔮 [4D Manifold Projection & Relativistic Dynamics](manifold_4d_projection.html)
<p align="center">
  <img src="manifold_4d_projection.png" alt="4D Manifold Projection & Relativistic Dynamics" width="850" style="border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
</p>

* **File:** [`manifold_4d_projection.html`](manifold_4d_projection.html)
* **Badge:** Differential Geometry & Relativity
* **Features:** Higher-dimensional stereographic projections, geodesic particle flows, 4D rotation hyperplanes (SO(4) rotation transformations), and phase-space sonification.

---

## 🛠️ Tech Stack & Architecture

* **Visual Engine:** HTML5 2D Canvas & Three.js WebGL with responsive high-DPI scaling.
* **Ambient String-Frame Wave Physics:** Custom 2D harmonic wave-mesh and spring-damper string engine (`water-fluidity.js`) featuring Hooke's restoring tension, interactive cursor plucking/ripples on desktop, and autonomous flowy ambient undulation on mobile devices.
* **UI/UX Design:** Custom Tailwind CSS with a dark glassmorphic theme.
* **Numerical Mathematics:** Custom numerical integrators (Euler-Cromer, RK4, Symplectic Verlet, Newton-Raphson solvers).
* **Audio Sonification:** Native Web Audio API polyphonic synthesizers with pentatonic scales.
* **Security & IP Protection:** Built-in anti-framing framebusting, domain locking, and anti-scraping protections.
* **Portability:** Zero build tools or npm dependencies; 100% portable single-file architecture.

---

## 👤 Author & Connect

**Gauransh Bansal**  
*M.Sc. Physics — Department of Physics & Astrophysics, University of Delhi*  
* **LinkedIn:** [linkedin.com/in/gauransh-bansal-a71223239](https://www.linkedin.com/in/gauransh-bansal-a71223239/)  
* **GitHub:** [github.com/gauranshbansal](https://github.com/gauranshbansal)  
* **Academic Portfolio:** [academicportfolio.pages.dev](https://academicportfolio.pages.dev)  
* **Story & Profile:** Open [`about.html`](about.html) for more about the author.

---

## 📄 License & Proprietary Notice

Copyright © 2026 Gauransh Bansal. All rights reserved.  
This software and associated simulations are proprietary intellectual property. See [`LICENSE`](LICENSE) for terms.
