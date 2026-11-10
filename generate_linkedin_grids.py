"""
Generate ultra-high-resolution LinkedIn post images featuring a grid of Gauransh Bansal's
interactive physics and computational simulators in action.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SIMS_DIR = r"C:\Users\gaura\Downloads\Simulations"
FONTS_DIR = r"C:\Windows\Fonts"

FONT_BOLD = os.path.join(FONTS_DIR, "segoeuib.ttf")
FONT_REGULAR = os.path.join(FONTS_DIR, "segoeui.ttf")
FONT_MONO = os.path.join(FONTS_DIR, "consola.ttf")

# 11 Curated Interactive Simulators
SIMULATIONS = [
    {
        "id": "manifold_4d",
        "title": "4D Manifold Projection",
        "subtitle": "Riemannian Geometry & Relativistic Geodesics",
        "badge": "RELATIVITY & 4D GEOMETRY",
        "color": (6, 182, 212),       # Cyan
        "file": "manifold_working.png",
        "crop": "left"
    },
    {
        "id": "phase_space",
        "title": "Phase Space Laboratory",
        "subtitle": "RK4 Vector Fields, Limit Cycles & Equilibria",
        "badge": "DYNAMICAL SYSTEMS",
        "color": (168, 85, 247),     # Purple
        "file": "phase_space_lab.png",
        "crop": "center"
    },
    {
        "id": "geiger_muller",
        "title": "Geiger-Müller Virtual Lab",
        "subtitle": "Townsend Avalanches & Dead Time Kinetics",
        "badge": "NUCLEAR & PLASMA PHYSICS",
        "color": (16, 185, 129),     # Emerald
        "file": "geiger_muller_laboratory.jpeg",
        "crop": "left"
    },
    {
        "id": "chaos_music",
        "title": "Chaos as Music",
        "subtitle": "Logistic Map Bifurcation & Dynamical Synth",
        "badge": "NONLINEAR DYNAMICS",
        "color": (245, 158, 11),     # Amber
        "file": "chaos_as_music.png",
        "crop": "center"
    },
    {
        "id": "lof",
        "title": "Landscape of Futures",
        "subtitle": "Nonlinear Basins of Attraction & Destinies",
        "badge": "CHAOS THEORY & FRACTALS",
        "color": (244, 63, 94),      # Rose
        "file": "Screenshot.png",
        "crop": "left"
    },
    {
        "id": "glof",
        "title": "Glacial Outburst (GLOF)",
        "subtitle": "Dam Breach Hydrodynamics & Surge Flow",
        "badge": "ENVIRONMENTAL GEOPHYSICS",
        "color": (14, 165, 233),     # Sky blue
        "file": "glacier_outburst_simulation.png",
        "crop": "glof"
    },
    {
        "id": "aetheria_2d",
        "title": "AETHERIA: Terrarium 2D",
        "subtitle": "Emergent Flocking, Leviathans & Genetics",
        "badge": "ARTIFICIAL LIFE",
        "color": (52, 211, 153),     # Light Emerald
        "file": "aetheria_terrarium_2d.png",
        "crop": "center"
    },
    {
        "id": "aetheria_3d",
        "title": "AETHERIA 3D: Cosmos",
        "subtitle": "Celestial Swarms & Multi-tier Gravity Wells",
        "badge": "3D WEBGL & SPATIAL AUDIO",
        "color": (129, 140, 248),    # Indigo
        "file": "aetheria_cosmos_3d.png",
        "crop": "center"
    },
    {
        "id": "same_equation",
        "title": "Same Equation, Different Reality",
        "subtitle": "Harmonic Resonance Across 6 Physical Domains",
        "badge": "PHYSICAL UNIFICATION",
        "color": (234, 179, 8),      # Gold
        "file": "same eqn difff reality.png",
        "crop": "same_eqn"
    },
    {
        "id": "ode_methods",
        "title": "ODE Numerical Solvers",
        "subtitle": "Euler, Heun & RK4 Comparative Benchmark",
        "badge": "COMPUTATIONAL METHODS",
        "color": (45, 212, 191),     # Teal
        "file": "ode_methods_simulator.png",
        "crop": "left"
    },
    {
        "id": "newton_raphson",
        "title": "Newton-Raphson Lab",
        "subtitle": "Tangent Line Convergence & Fractal Basins",
        "badge": "NUMERICAL CALCULUS",
        "color": (56, 189, 248),     # Sky
        "file": "newton_raphson_simulator.png",
        "crop": "left"
    }
]


def create_gradient_backdrop(width, height):
    """Create a dark, atmospheric cosmic background with subtle radial glows and grid."""
    base = Image.new("RGBA", (width, height), (3, 4, 8, 255))
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw_glow = ImageDraw.Draw(glow)

    # Ambient radial spots
    spots = [
        (int(width * 0.15), int(height * 0.12), int(width * 0.4), (30, 27, 75, 60)),    # Indigo top-left
        (int(width * 0.85), int(height * 0.30), int(width * 0.45), (15, 23, 42, 65)),   # Slate mid-right
        (int(width * 0.25), int(height * 0.65), int(width * 0.5), (25, 15, 50, 55)),    # Purple mid-left
        (int(width * 0.82), int(height * 0.85), int(width * 0.45), (6, 78, 59, 40)),    # Emerald bot-right
        (int(width * 0.50), int(height * 0.05), int(width * 0.6), (12, 74, 110, 45))    # Sky top-mid
    ]

    for sx, sy, r, col in spots:
        draw_glow.ellipse([sx - r, sy - r, sx + r, sy + r], fill=col)

    glow = glow.filter(ImageFilter.GaussianBlur(radius=int(width * 0.10)))
    base = Image.alpha_composite(base, glow)

    # Subtle computational grid lines
    grid_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    grid_step = 64
    for x in range(0, width, grid_step):
        grid_draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 3), width=1)
    for y in range(0, height, grid_step):
        grid_draw.line([(0, y), (width, y)], fill=(255, 255, 255, 3), width=1)

    base = Image.alpha_composite(base, grid_layer)
    return base


def prepare_card_image(sim, target_w, target_h):
    """Load and intelligently crop simulator screenshot to fit target card area."""
    path = os.path.join(SIMS_DIR, sim["file"])
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    target_aspect = target_w / target_h

    if sim["crop"] == "glof":
        # For GLOF: crop top portion where avalanche, lake, dam breach, and telemetry are
        crop_h = int(w / target_aspect)
        crop_y1 = 35
        crop_y2 = min(h, crop_y1 + crop_h)
        cropped = im.crop((0, crop_y1, w, crop_y2))
    elif sim["crop"] == "same_eqn":
        # For Same Equation: center horizontally
        crop_w = int(h * target_aspect)
        left = max(0, (w - crop_w) // 2)
        cropped = im.crop((left, 0, left + crop_w, h))
    elif sim["crop"] == "left":
        # Left-aligned crop (vital for preserving left sidebars and controls in ODE, Newton-Raphson, Manifold, Geiger-Muller)
        new_w = int(h * target_aspect)
        if new_w <= w:
            cropped = im.crop((0, 0, new_w, h))
        else:
            new_h = int(w / target_aspect)
            cropped = im.crop((0, 0, w, new_h))
    else:
        # Default center crop
        current_aspect = w / h
        if current_aspect > target_aspect:
            new_w = int(h * target_aspect)
            left = (w - new_w) // 2
            cropped = im.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target_aspect)
            top = (h - new_h) // 2
            cropped = im.crop((0, top, w, top + new_h))

    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    return resized


def draw_rounded_mask(width, height, radius):
    """Helper to create a smooth anti-aliased rounded mask."""
    mask = Image.new("L", (width * 2, height * 2), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, width * 2, height * 2], radius=radius * 2, fill=255)
    return mask.resize((width, height), Image.Resampling.LANCZOS)


def render_suite_showcase_card(card_w, card_h, img_w, img_h):
    """Create the 12th card: Master Suite & Architecture overview."""
    card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)

    # Card background with indigo glow border
    draw.rounded_rectangle(
        [0, 0, card_w, card_h],
        radius=20,
        fill=(12, 16, 32, 245),
        outline=(129, 140, 248, 120),
        width=2
    )

    # Top visual container
    top_container = Image.new("RGBA", (img_w, img_h), (8, 11, 24, 255))
    top_draw = ImageDraw.Draw(top_container)

    # Ambient radial inside top container
    glow_inner = Image.new("RGBA", (img_w, img_h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_inner)
    glow_draw.ellipse(
        [img_w // 2 - 200, img_h // 2 - 130, img_w // 2 + 200, img_h // 2 + 130],
        fill=(79, 70, 229, 75)
    )
    glow_inner = glow_inner.filter(ImageFilter.GaussianBlur(radius=50))
    top_container = Image.alpha_composite(top_container, glow_inner)
    top_draw = ImageDraw.Draw(top_container)

    # Central physics orbit rings
    cx, cy = img_w // 2, img_h // 2 - 25
    top_draw.ellipse([cx - 75, cy - 75, cx + 75, cy + 75], outline=(129, 140, 248, 150), width=2)
    top_draw.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], outline=(99, 102, 241, 75), width=1)
    top_draw.line([(cx - 130, cy), (cx + 130, cy)], fill=(129, 140, 248, 100), width=1)
    top_draw.line([(cx, cy - 130), (cx, cy + 130)], fill=(129, 140, 248, 100), width=1)

    # Center monogram
    f_center = ImageFont.truetype(FONT_BOLD, 36)
    top_draw.text((cx - 24, cy - 25), "GB", fill=(255, 255, 255, 255), font=f_center)

    # Metrics badges row at bottom of image container
    f_mono = ImageFont.truetype(FONT_MONO, 13)
    metrics = [
        ("11 LIVE ENGINES", (6, 182, 212)),
        ("100% CLIENT-SIDE", (16, 185, 129)),
        ("THREE.JS + CANVAS", (168, 85, 247)),
        ("WEB AUDIO SYNTH", (245, 158, 11))
    ]

    bx_start = 22
    by = img_h - 42
    b_spacing = (img_w - 44) // 4
    for i, (text, col) in enumerate(metrics):
        bx = bx_start + i * b_spacing
        b_w = b_spacing - 10
        top_draw.rounded_rectangle([bx, by, bx + b_w, by + 28], radius=6, fill=(15, 23, 42, 210), outline=(*col, 150), width=1)
        top_draw.text((bx + 8, by + 6), text, fill=(*col, 255), font=f_mono)

    # Mask and paste top container
    mask = draw_rounded_mask(img_w, img_h, 14)
    card.paste(top_container, (14, 14), mask)

    # Information section below
    f_cat = ImageFont.truetype(FONT_BOLD, 13)
    f_title = ImageFont.truetype(FONT_BOLD, 22)
    f_sub = ImageFont.truetype(FONT_REGULAR, 15)

    info_y = 14 + img_h + 14
    draw = ImageDraw.Draw(card)

    # Category Pill
    draw.rounded_rectangle([18, info_y, 180, info_y + 24], radius=6, fill=(99, 102, 241, 35), outline=(129, 140, 248, 140), width=1)
    draw.ellipse([27, info_y + 8, 35, info_y + 16], fill=(129, 140, 248, 255))
    draw.text((42, info_y + 4), "SUITE ARCHITECTURE", fill=(199, 210, 254, 255), font=f_cat)

    # Title & Subtitle
    draw.text((18, info_y + 32), "Physics Simulations Suite", fill=(255, 255, 255, 255), font=f_title)
    draw.text((18, info_y + 62), "Explore all 11 simulators live at gauranshbansal.github.io", fill=(148, 163, 184, 255), font=f_sub)

    return card


def render_simulator_card(sim, card_w, card_h, img_w, img_h):
    """Create a single sleek glassmorphic card for a simulator."""
    card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)

    col = sim["color"]

    # Glassmorphic Card Base
    draw.rounded_rectangle(
        [0, 0, card_w, card_h],
        radius=20,
        fill=(11, 15, 28, 245),
        outline=(*col, 80),
        width=1
    )

    # Top Screenshot Container
    prepared_img = prepare_card_image(sim, img_w, img_h)

    # Subtle border around the screenshot
    img_draw = ImageDraw.Draw(prepared_img)
    img_draw.rounded_rectangle(
        [0, 0, img_w - 1, img_h - 1],
        radius=14,
        outline=(255, 255, 255, 25),
        width=1
    )

    # Paste image with rounded mask
    mask = draw_rounded_mask(img_w, img_h, 14)
    card.paste(prepared_img, (14, 14), mask)

    # Info Area
    f_cat = ImageFont.truetype(FONT_BOLD, 13)
    f_title = ImageFont.truetype(FONT_BOLD, 22)
    f_sub = ImageFont.truetype(FONT_REGULAR, 15)

    info_y = 14 + img_h + 14
    draw = ImageDraw.Draw(card)

    # Badge measurement
    badge_text = sim["badge"]
    badge_w = int(draw.textlength(badge_text, font=f_cat)) + 36

    # Category Pill
    draw.rounded_rectangle([18, info_y, 18 + badge_w, info_y + 24], radius=6, fill=(*col, 30), outline=(*col, 140), width=1)
    draw.ellipse([27, info_y + 8, 35, info_y + 16], fill=(*col, 255))
    draw.text((42, info_y + 4), badge_text, fill=(*col, 255), font=f_cat)

    # Title & Subtitle
    draw.text((18, info_y + 32), sim["title"], fill=(255, 255, 255, 255), font=f_title)
    draw.text((18, info_y + 62), sim["subtitle"], fill=(148, 163, 184, 255), font=f_sub)

    return card


def build_linkedin_grid_4x5():
    """Build the master 4:5 portrait LinkedIn post image (2160 x 2700 px)."""
    W = 2160
    H = 2700
    canvas = create_gradient_backdrop(W, H)
    draw = ImageDraw.Draw(canvas)

    # Header
    cx_brand = 80
    cy_brand = 85
    draw.ellipse([cx_brand, cy_brand, cx_brand + 64, cy_brand + 64], fill=(15, 23, 42, 230), outline=(6, 182, 212, 180), width=2)
    f_mono_logo = ImageFont.truetype(FONT_BOLD, 28)
    draw.text((cx_brand + 14, cy_brand + 13), "GB", fill=(241, 245, 249, 255), font=f_mono_logo)

    f_author = ImageFont.truetype(FONT_BOLD, 20)
    f_status = ImageFont.truetype(FONT_BOLD, 15)
    f_h1 = ImageFont.truetype(FONT_BOLD, 52)
    f_subhead = ImageFont.truetype(FONT_REGULAR, 22)
    f_tag = ImageFont.truetype(FONT_BOLD, 15)

    draw.text((cx_brand + 82, cy_brand + 10), "GAURANSH BANSAL", fill=(226, 232, 240, 255), font=f_author)
    draw.text((cx_brand + 82, cy_brand + 36), "M.Sc. Physics, University of Delhi • Computational Physics & Numerical Systems", fill=(148, 163, 184, 255), font=ImageFont.truetype(FONT_REGULAR, 16))

    # Live Badge (Top Right)
    live_badge_w = 340
    live_badge_x = W - live_badge_w - 80
    draw.rounded_rectangle([live_badge_x, cy_brand + 10, live_badge_x + live_badge_w, cy_brand + 54], radius=22, fill=(16, 185, 129, 25), outline=(16, 185, 129, 140), width=2)
    draw.ellipse([live_badge_x + 18, cy_brand + 27, live_badge_x + 28, cy_brand + 37], fill=(16, 185, 129, 255))
    draw.text((live_badge_x + 38, cy_brand + 21), "11 SIMULATORS LIVE IN BROWSER", fill=(52, 211, 153, 255), font=f_status)

    # Main Headline
    draw.text((80, 185), "Interactive Physics & Computational Simulations Suite", fill=(255, 255, 255, 255), font=f_h1)
    draw.text((80, 255), "A curated collection of client-side physics engines, nonlinear dynamics, generative artificial life, and numerical solvers.", fill=(148, 163, 184, 255), font=f_subhead)

    # Tech Stack Badges Row
    tech_tags = [
        ("HTML5 Canvas", (56, 189, 248)),
        ("Three.js WebGL", (168, 85, 247)),
        ("Web Audio API", (245, 158, 11)),
        ("RK4 & Symplectic Integrators", (16, 185, 129)),
        ("Zero Dependencies", (244, 63, 94)),
        ("100% Client-Side", (99, 102, 241))
    ]

    tag_x = 80
    tag_y = 305
    for text, col in tech_tags:
        t_len = int(draw.textlength(text, font=f_tag)) + 28
        draw.rounded_rectangle([tag_x, tag_y, tag_x + t_len, tag_y + 32], radius=8, fill=(15, 23, 42, 190), outline=(*col, 120), width=1)
        draw.text((tag_x + 14, tag_y + 6), text, fill=(226, 232, 240, 255), font=f_tag)
        tag_x += t_len + 14

    draw.line([(80, 365), (W - 80, 365)], fill=(255, 255, 255, 18), width=1)

    # Cards Grid: 3 columns x 4 rows
    cols = 3
    rows = 4
    grid_x0 = 80
    grid_y0 = 400
    gap_x = 35
    gap_y = 35

    card_w = (W - 2 * grid_x0 - (cols - 1) * gap_x) // cols  # 643 px
    card_h = 505
    img_w = card_w - 28
    img_h = 370

    for idx in range(12):
        r = idx // cols
        c = idx % cols
        pos_x = grid_x0 + c * (card_w + gap_x)
        pos_y = grid_y0 + r * (card_h + gap_y)

        if idx < len(SIMULATIONS):
            card_img = render_simulator_card(SIMULATIONS[idx], card_w, card_h, img_w, img_h)
        else:
            card_img = render_suite_showcase_card(card_w, card_h, img_w, img_h)

        canvas.paste(card_img, (pos_x, pos_y), card_img)

    # Footer
    foot_y = H - 95
    draw.line([(80, foot_y - 25), (W - 80, foot_y - 25)], fill=(255, 255, 255, 18), width=1)

    f_foot_bold = ImageFont.truetype(FONT_BOLD, 18)
    f_foot_reg = ImageFont.truetype(FONT_REGULAR, 17)
    f_foot_mono = ImageFont.truetype(FONT_MONO, 17)

    draw.text((80, foot_y), "Engineered by Gauransh Bansal", fill=(255, 255, 255, 255), font=f_foot_bold)
    draw.text((80, foot_y + 26), "Theoretical derivation + AI-augmented rapid prototyping + physical numerical verification", fill=(148, 163, 184, 255), font=f_foot_reg)

    draw.text((W - 80 - 740, foot_y + 12), "🌐 Live Suite: gauranshbansal.github.io/physics_simulations", fill=(56, 189, 248, 255), font=f_foot_mono)

    out_path = os.path.join(SIMS_DIR, "linkedin_post_simulations_grid_4x5.png")
    canvas.save(out_path, quality=95)
    print(f"Generated 4:5 LinkedIn Grid: {out_path} ({W}x{H})")
    return out_path


def build_linkedin_grid_1x1():
    """Build a 1:1 square format (2160 x 2160 px) with 3 columns x 4 rows wide cards."""
    W = 2160
    H = 2160
    canvas = create_gradient_backdrop(W, H)
    draw = ImageDraw.Draw(canvas)

    # Header
    cx_brand = 70
    cy_brand = 50
    draw.ellipse([cx_brand, cy_brand, cx_brand + 54, cy_brand + 54], fill=(15, 23, 42, 230), outline=(6, 182, 212, 180), width=2)
    draw.text((cx_brand + 12, cy_brand + 11), "GB", fill=(241, 245, 249, 255), font=ImageFont.truetype(FONT_BOLD, 24))

    draw.text((cx_brand + 70, cy_brand + 5), "GAURANSH BANSAL • INTERACTIVE PHYSICS & SIMULATIONS SUITE", fill=(226, 232, 240, 255), font=ImageFont.truetype(FONT_BOLD, 19))
    draw.text((cx_brand + 70, cy_brand + 29), "11 Client-Side Computational Laboratories • HTML5 Canvas, WebGL, Three.js & Web Audio API", fill=(148, 163, 184, 255), font=ImageFont.truetype(FONT_REGULAR, 15))

    badge_x = W - 70 - 290
    draw.rounded_rectangle([badge_x, cy_brand + 8, badge_x + 290, cy_brand + 46], radius=19, fill=(16, 185, 129, 25), outline=(16, 185, 129, 140), width=2)
    draw.ellipse([badge_x + 16, cy_brand + 22, badge_x + 24, cy_brand + 30], fill=(16, 185, 129, 255))
    draw.text((badge_x + 34, cy_brand + 17), "11 ENGINES LIVE IN BROWSER", fill=(52, 211, 153, 255), font=ImageFont.truetype(FONT_BOLD, 13))

    draw.line([(70, 125), (W - 70, 125)], fill=(255, 255, 255, 18), width=1)

    # 3 columns x 4 rows for wide, natural screenshot proportions
    cols = 3
    rows = 4
    grid_x0 = 70
    grid_y0 = 145
    gap_x = 28
    gap_y = 24

    card_w = (W - 2 * grid_x0 - (cols - 1) * gap_x) // cols  # 648 px
    card_h = 465
    img_w = card_w - 24
    img_h = 335

    for idx in range(12):
        r = idx // cols
        c = idx % cols
        pos_x = grid_x0 + c * (card_w + gap_x)
        pos_y = grid_y0 + r * (card_h + gap_y)

        if idx < len(SIMULATIONS):
            card_img = render_simulator_card(SIMULATIONS[idx], card_w, card_h, img_w, img_h)
        else:
            card_img = render_suite_showcase_card(card_w, card_h, img_w, img_h)

        canvas.paste(card_img, (pos_x, pos_y), card_img)

    # Footer
    foot_y = H - 60
    draw.line([(70, foot_y - 15), (W - 70, foot_y - 15)], fill=(255, 255, 255, 18), width=1)
    draw.text((70, foot_y), "Engineered by Gauransh Bansal • M.Sc. Physics, University of Delhi", fill=(226, 232, 240, 255), font=ImageFont.truetype(FONT_BOLD, 16))
    draw.text((W - 70 - 640, foot_y), "🌐 Live Suite: gauranshbansal.github.io/physics_simulations", fill=(56, 189, 248, 255), font=ImageFont.truetype(FONT_MONO, 16))

    out_path = os.path.join(SIMS_DIR, "linkedin_post_simulations_grid_1x1.png")
    canvas.save(out_path, quality=95)
    print(f"Generated 1:1 LinkedIn Grid: {out_path} ({W}x{H})")
    return out_path


def build_linkedin_grid_16x9():
    """Build a 16:9 widescreen format (2560 x 1440 px) with 4 columns x 3 rows wide cards."""
    W = 2560
    H = 1440
    canvas = create_gradient_backdrop(W, H)
    draw = ImageDraw.Draw(canvas)

    # Header
    draw.ellipse([60, 40, 60 + 52, 40 + 52], fill=(15, 23, 42, 230), outline=(6, 182, 212, 180), width=2)
    draw.text((60 + 12, 40 + 10), "GB", fill=(241, 245, 249, 255), font=ImageFont.truetype(FONT_BOLD, 22))

    draw.text((125, 42), "GAURANSH BANSAL  |  INTERACTIVE PHYSICS & COMPUTATIONAL SIMULATIONS SUITE", fill=(226, 232, 240, 255), font=ImageFont.truetype(FONT_BOLD, 18))
    draw.text((125, 67), "11 Production Client-Side Physics Engines & Numerical Solvers • HTML5 Canvas, WebGL, Three.js & Web Audio API", fill=(148, 163, 184, 255), font=ImageFont.truetype(FONT_REGULAR, 15))

    badge_x = W - 60 - 280
    draw.rounded_rectangle([badge_x, 45, badge_x + 280, 45 + 38], radius=19, fill=(16, 185, 129, 25), outline=(16, 185, 129, 140), width=2)
    draw.ellipse([badge_x + 14, 45 + 14, badge_x + 24, 45 + 24], fill=(16, 185, 129, 255))
    draw.text((badge_x + 34, 45 + 10), "11 ENGINES LIVE & DEPLOYED", fill=(52, 211, 153, 255), font=ImageFont.truetype(FONT_BOLD, 12))

    draw.line([(60, 110), (W - 60, 110)], fill=(255, 255, 255, 18), width=1)

    # 4 columns x 3 rows = 12 cards!
    cols = 4
    rows = 3
    grid_x0 = 60
    grid_y0 = 130
    gap_x = 24
    gap_y = 20

    card_w = (W - 2 * grid_x0 - (cols - 1) * gap_x) // cols  # 592 px
    card_h = 390
    img_w = card_w - 24
    img_h = 265

    for idx in range(12):
        r = idx // cols
        c = idx % cols
        pos_x = grid_x0 + c * (card_w + gap_x)
        pos_y = grid_y0 + r * (card_h + gap_y)

        if idx < len(SIMULATIONS):
            card_img = render_simulator_card(SIMULATIONS[idx], card_w, card_h, img_w, img_h)
        else:
            card_img = render_suite_showcase_card(card_w, card_h, img_w, img_h)

        canvas.paste(card_img, (pos_x, pos_y), card_img)

    # Footer
    foot_y = H - 50
    draw.line([(60, foot_y - 12), (W - 60, foot_y - 12)], fill=(255, 255, 255, 18), width=1)
    draw.text((60, foot_y), "Engineered by Gauransh Bansal • M.Sc. Physics, University of Delhi", fill=(226, 232, 240, 255), font=ImageFont.truetype(FONT_BOLD, 15))
    draw.text((W - 60 - 620, foot_y), "🌐 Live Suite: gauranshbansal.github.io/physics_simulations", fill=(56, 189, 248, 255), font=ImageFont.truetype(FONT_MONO, 15))

    out_path = os.path.join(SIMS_DIR, "linkedin_post_simulations_grid_16x9.png")
    canvas.save(out_path, quality=95)
    print(f"Generated 16:9 LinkedIn Grid: {out_path} ({W}x{H})")
    return out_path


if __name__ == "__main__":
    build_linkedin_grid_4x5()
    build_linkedin_grid_1x1()
    build_linkedin_grid_16x9()
