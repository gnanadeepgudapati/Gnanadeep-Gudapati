# 3D Interactive Hex Background

A self-contained, portable Three.js background layer for any web project.

## Folder Structure

```
background/
├── index.html          ← Standalone preview (open directly in browser)
├── hex-background.js   ← All Three.js logic, self-contained IIFE
├── three.min.js        ← Three.js r128 (local, no CDN needed)
└── logos_/
    ├── ai-genai/       ← OpenAI, Anthropic, HuggingFace, LangChain, Milvus, spaCy
    ├── backend/        ← Python, FastAPI, Flask, Node.js, WebSockets
    ├── database/       ← PostgreSQL, MongoDB, Redis, Elasticsearch, Cassandra
    ├── devops/         ← Docker, Kubernetes, AWS, GitHub Actions, Spark, Databricks
    ├── data-ml/        ← Pandas, NumPy, Jupyter, XGBoost, scikit-learn, Power BI, Tableau, MLflow, Pinecone
    └── frontend/       ← React, JavaScript, TypeScript, Tailwind, HTML5, CSS3, Git, GitHub, SQL
```

## Usage in Any Project

### Option A — Iframe embed (simplest, zero conflicts)

```html
<iframe
  src="./background/index.html"
  style="position:fixed;inset:0;width:100%;height:100%;border:none;z-index:0;"
  title="background">
</iframe>

<!-- Your UI layers go on top -->
<div style="position:relative;z-index:10;">
  <!-- portfolio content here -->
</div>
```

### Option B — Direct script embed (React / Vite / any SPA)

1. Copy the entire `background/` folder into your project's `public/` directory.
2. In your main HTML (`index.html`) add before `</body>`:

```html
<!-- Add the vignette div -->
<div id="hex-vignette" style="
  position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    linear-gradient(to right, #141413 0%, transparent 18%, transparent 82%, #141413 100%),
    linear-gradient(to bottom, #141413 0%, transparent 22%);
"></div>

<!-- Load Three.js then the background -->
<script src="/background/three.min.js"></script>
<script src="/background/hex-background.js"></script>
```

3. Make sure your app root has `position: relative; z-index: 10;`

### Option C — React component wrapper

```jsx
import { useEffect } from 'react';

export default function HexBackground() {
  useEffect(() => {
    // Three.js must be loaded globally first
    const threeScript = document.createElement('script');
    threeScript.src = '/background/three.min.js';
    threeScript.onload = () => {
      const bgScript = document.createElement('script');
      bgScript.src = '/background/hex-background.js';
      document.body.appendChild(bgScript);
    };
    document.body.appendChild(threeScript);
  }, []);

  return (
    <div
      id="hex-vignette"
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          linear-gradient(to right, #141413 0%, transparent 18%, transparent 82%, #141413 100%),
          linear-gradient(to bottom, #141413 0%, transparent 22%)
        `,
      }}
    />
  );
}
```

Then render `<HexBackground />` as the very first child of your app root.

## Features
- **Zero network requests** — all assets (Three.js, SVGs) are local
- **Stationary camera** — plane never wiggles, safe for overlaid UI
- **Cursor interaction** — hexagons lift toward the mouse with cubic falloff
- **Infinite-look edges** — CSS vignette + Three.js fog dissolves the borders
- **Tech icon belt** — 40 unique logos, no repeats, anchored to the visible bottom rows
- **Warm Charcoal theme** — `#141413` dark, light horizon gradient
