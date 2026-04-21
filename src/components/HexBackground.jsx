import React, { useEffect, useRef } from 'react';

/**
 * HexBackground — mounts the Three.js 3D hex-floor scene inside the React tree.
 *
 * Strategy:
 *  1. Dynamically inject three.min.js (from public/background/) if not already loaded.
 *  2. Once THREE is on window, run the scene initialisation inline (mirrored from
 *     hex-background.js but scoped so it can be torn down on unmount).
 *  3. Canvas is absolutely positioned, pointer-events none so UI stays interactive.
 *
 * All SVG logos live at /background/logos_/ (served by Vite from public/).
 */

const BASE = '/background/';
function logo(path) { return BASE + 'logos_/' + path; }

export default function HexBackground() {
  const mountedRef = useRef(false);

  useEffect(() => {
    // Guard against double-run in React StrictMode
    if (mountedRef.current) return;
    mountedRef.current = true;

    let animId;
    let renderer;

    function initScene() {
      const THREE = window.THREE;

      // ── Renderer ──────────────────────────────────
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(innerWidth, innerHeight);
      Object.assign(renderer.domElement.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100%', height: '100%',
        zIndex: '0',
        pointerEvents: 'none',
      });
      document.body.appendChild(renderer.domElement);

      // ── Scene ─────────────────────────────────────
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x141413);
      scene.fog = new THREE.Fog(0x141413, 20, 60);

      // ── Camera ────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 200);
      camera.position.set(0, 16, 22);
      camera.lookAt(new THREE.Vector3(0, 0, -8));

      // ── Lighting ──────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const sun = new THREE.DirectionalLight(0xfff8f0, 0.7);
      sun.position.set(10, 30, 15);
      scene.add(sun);

      // ── Gradient colour sampler ───────────────────
      const STOPS = [
        [0.00,  20,  20,  19],
        [0.30,  20,  20,  19],
        [0.50,  28,  28,  26],
        [0.65,  42,  41,  38],
        [0.80,  90,  88,  80],
        [0.90, 143, 141, 130],
        [1.00, 175, 172, 161],
      ];
      function sampleColor(t) {
        t = Math.max(0, Math.min(1, t));
        let i = 0;
        while (i < STOPS.length - 2 && STOPS[i + 1][0] <= t) i++;
        const [pa, ra, ga, ba] = STOPS[i];
        const [pb, rb, gb, bb] = STOPS[i + 1];
        const f = pb === pa ? 0 : (t - pa) / (pb - pa);
        return new THREE.Color(
          (ra + (rb - ra) * f) / 255,
          (ga + (gb - ga) * f) / 255,
          (ba + (bb - ba) * f) / 255,
        );
      }

      // ── Hex geometry helpers ──────────────────────
      const HEX_R  = 1.0;
      const SLAB_D = 0.12;
      const GAP    = 0.09;
      const EFF    = HEX_R + GAP;
      const COL_W  = Math.sqrt(3) * EFF;
      const ROW_H  = EFF * 1.5;

      function makeHexOutline(r) {
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          pts.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a)));
        }
        pts.push(pts[0].clone());
        return new THREE.BufferGeometry().setFromPoints(pts);
      }

      function makeHexShape(r) {
        const s = new THREE.Shape();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          if (i === 0) s.moveTo(r * Math.cos(a), r * Math.sin(a));
          else         s.lineTo(r * Math.cos(a), r * Math.sin(a));
        }
        s.closePath();
        return s;
      }

      const slabGeo = new THREE.ExtrudeGeometry(makeHexShape(HEX_R), {
        depth: SLAB_D, bevelEnabled: false,
      });
      slabGeo.rotateX(-Math.PI / 2);

      const outlineGeo = makeHexOutline(HEX_R + 0.02);

      // ── Tech Icon textures ────────────────────────
      const aiUrls = [
        logo('ai-genai/openai.svg'),
        logo('ai-genai/anthropic.svg'),
        logo('ai-genai/huggingface.svg'),
        logo('ai-genai/langchain.svg'),
        logo('ai-genai/milvus.svg'),
        logo('ai-genai/spacy.svg'),
      ];
      const backendUrls = [
        logo('backend/python.svg'),
        logo('backend/fastapi.svg'),
        logo('backend/flask.svg'),
        logo('backend/nodejs.svg'),
        logo('backend/websockets.svg'),
        logo('database/postgresql.svg'),
        logo('database/mongodb.svg'),
        logo('database/redis.svg'),
        logo('database/elasticsearch.svg'),
        logo('database/cassandra.svg'),
      ];
      const dataDevopsUrls = [
        logo('devops/docker.svg'),
        logo('devops/kubernetes.svg'),
        logo('devops/aws.svg'),
        logo('devops/github-actions.svg'),
        logo('devops/apache-spark.svg'),
        logo('devops/databricks.svg'),
        logo('data-ml/pandas.svg'),
        logo('data-ml/numpy.svg'),
        logo('data-ml/jupyter.svg'),
        logo('data-ml/xgboost.svg'),
        logo('data-ml/scikit-learn.svg'),
        logo('data-ml/powerbi.svg'),
        logo('data-ml/tableau.svg'),
        logo('data-ml/mlflow.svg'),
        logo('data-ml/pinecone.svg'),
      ];
      const frontendUrls = [
        logo('frontend/react.svg'),
        logo('frontend/javascript.svg'),
        logo('frontend/typescript.svg'),
        logo('frontend/tailwind.svg'),
        logo('frontend/html5.svg'),
        logo('frontend/css3.svg'),
        logo('frontend/git.svg'),
        logo('frontend/github.svg'),
        logo('frontend/sql.svg'),
      ];

      const texLoader = new THREE.TextureLoader();
      texLoader.crossOrigin = 'Anonymous';
      const makeMats = (urls) => urls.map(url => {
        const tex = texLoader.load(url);
        tex.minFilter = THREE.LinearFilter;
        return new THREE.MeshBasicMaterial({
          map: tex, transparent: true, opacity: 0.95,
          depthWrite: false, alphaTest: 0.05,
        });
      });

      const allMats = [
        ...makeMats(aiUrls),
        ...makeMats(backendUrls),
        ...makeMats(dataDevopsUrls),
        ...makeMats(frontendUrls),
      ];

      const iconSize = HEX_R * 1.15;
      const iconGeo  = new THREE.PlaneGeometry(iconSize, iconSize);
      iconGeo.rotateX(-Math.PI / 2);

      // ── Icon placement map ────────────────────────
      const iconPlacements = new Map();
      const START_COL = 16;
      for (let i = 0; i < allMats.length; i++) {
        if (i < 20) iconPlacements.set(`31,${START_COL + i}`, allMats[i]);
        else        iconPlacements.set(`30,${START_COL + (i - 20)}`, allMats[i]);
      }

      // ── Build hex grid ────────────────────────────
      const COLS   = 52;
      const ROWS   = 50;
      const Z_FAR  = (0        - ROWS / 2) * ROW_H;
      const Z_NEAR = (ROWS - 1 - ROWS / 2) * ROW_H;

      const hexMeshes   = [];
      const hexOutlines = [];
      const gridGroup   = new THREE.Group();

      const outlineMat = new THREE.LineBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0.20,
      });

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const stagger = (row % 2 === 1) ? COL_W * 0.5 : 0;
          const cx = (col - COLS / 2) * COL_W + stagger;
          const cz = (row - ROWS / 2) * ROW_H;

          const gradT = (cz - Z_FAR) / (Z_NEAR - Z_FAR);
          const col3  = sampleColor(gradT);
          const face  = col3.clone().offsetHSL(0, 0, -0.04);

          const mat  = new THREE.MeshStandardMaterial({
            color: face, roughness: 0.82, metalness: 0.04,
          });
          const mesh = new THREE.Mesh(slabGeo, mat);
          mesh.position.set(cx, 0, cz);
          mesh.userData = { baseColor: face.clone(), targetY: 0, currentY: 0 };
          gridGroup.add(mesh);
          hexMeshes.push(mesh);

          const assignedMat = iconPlacements.get(`${row},${col}`);
          if (assignedMat) {
            const iconMesh = new THREE.Mesh(iconGeo, assignedMat);
            iconMesh.rotation.y = (Math.random() - 0.5) * 0.4;
            iconMesh.position.set(0, SLAB_D + 0.015, 0);
            mesh.add(iconMesh);
          }

          const line = new THREE.Line(outlineGeo, outlineMat.clone());
          line.position.set(cx, SLAB_D, cz);
          gridGroup.add(line);
          hexOutlines.push(line);
        }
      }

      scene.add(gridGroup);

      // ── Mouse interaction ─────────────────────────
      const raycaster   = new THREE.Raycaster();
      const mouseNDC    = new THREE.Vector2();
      const floorPlane  = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const cursorWorld = new THREE.Vector3();
      let mouseActive   = false;

      const onMouseMove = (e) => {
        mouseNDC.set(
           (e.clientX / innerWidth)  * 2 - 1,
          -(e.clientY / innerHeight) * 2 + 1,
        );
        mouseActive = true;
      };
      const onMouseLeave = () => { mouseActive = false; };
      window.addEventListener('mousemove',  onMouseMove);
      window.addEventListener('mouseleave', onMouseLeave);

      const LIFT_HEIGHT = 2.0;
      const LIFT_RADIUS = 5.0;
      const RISE_SPEED  = 0.14;
      const FALL_SPEED  = 0.05;

      // ── Resize ────────────────────────────────────
      const onResize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      };
      window.addEventListener('resize', onResize);

      // ── Animation loop ────────────────────────────
      function animate() {
        animId = requestAnimationFrame(animate);

        if (mouseActive) {
          raycaster.setFromCamera(mouseNDC, camera);
          raycaster.ray.intersectPlane(floorPlane, cursorWorld);
        }

        for (let i = 0; i < hexMeshes.length; i++) {
          const m = hexMeshes[i];
          const d = m.userData;

          if (mouseActive) {
            const dx   = m.position.x - cursorWorld.x;
            const dz   = m.position.z - cursorWorld.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            d.targetY  = dist < LIFT_RADIUS
              ? LIFT_HEIGHT * Math.pow(1 - dist / LIFT_RADIUS, 3)
              : 0;
          } else {
            d.targetY = 0;
          }

          const diff  = d.targetY - d.currentY;
          const speed = diff > 0 ? RISE_SPEED : FALL_SPEED;
          d.currentY += diff * speed;

          m.position.y              = d.currentY;
          hexOutlines[i].position.y = d.currentY + SLAB_D;

          m.material.color.copy(d.baseColor);
          if (d.currentY > 0.05) {
            m.material.color.offsetHSL(0, 0, (d.currentY / LIFT_HEIGHT) * 0.14);
          }
        }

        renderer.render(scene, camera);
      }

      animate();

      // ── Teardown helper ───────────────────────────
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove',  onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize',     onResize);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }

    // ── Load THREE.js then init ────────────────────
    let cleanup = () => {};

    if (window.THREE) {
      cleanup = initScene();
    } else {
      const script = document.createElement('script');
      script.src = '/background/three.min.js';
      script.onload = () => { cleanup = initScene(); };
      document.head.appendChild(script);
    }

    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, []);

  // The canvas is appended directly to <body> by Three.js — no DOM node needed here.
  // The vignette overlay sits on top at z-index 2 to fade the grid edges.
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        background: [
          'linear-gradient(to right,  #141413 0%, transparent 18%, transparent 82%, #141413 100%)',
          'linear-gradient(to bottom, #141413 0%, transparent 22%)',
        ].join(', '),
      }}
    />
  );
}
