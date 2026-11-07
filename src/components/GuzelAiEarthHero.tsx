import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { TranslationSchema } from "../i18n/translations";
import { AI_MODELS } from "../data/models";
import { CONTINENTAL_MODELS } from "../data/continentalModels";
import { AIModel } from "../types";
import {
  Sparkles,
  Zap,
  Globe2,
  Compass,
  ArrowRight,
  RotateCw,
  Sliders,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Flame,
  Layers,
  Radio,
} from "lucide-react";
import {
  AtelierTailorLines,
  AtelierIllustratorStamp,
  CoutureSilhouetteSketch,
  AtelierCropMarks,
  BotanicalIllustratorFlourish,
} from "./IllustratorFlourishes";

interface GuzelAiEarthHeroProps {
  t: TranslationSchema;
  onOpenContactModal?: () => void;
  onScrollToServices?: () => void;
  onOpenStudio: (tab?: string, model?: AIModel) => void;
  onScrollToInteractive?: () => void;
  onScrollToStudio?: () => void;
  onScrollToWebsites?: () => void;
}

interface WorldLocationHub {
  id: string;
  cityName: string;
  country: string;
  lat: number;
  lon: number;
  categoryTitle: string;
  categoryBadge: string;
  colorHex: string;
  model: AIModel;
  highlightTag: string;
  signatureLook: string;
  roasMetric: string;
  soundtrackLabel: string;
}

// Seven real geographic points, each linked to its fictional adult model.
const WORLD_HUBS: WorldLocationHub[] = CONTINENTAL_MODELS.map((entry) => ({
  id: `hub-${entry.id}`,
  cityName: entry.location.toLocaleUpperCase("tr-TR"),
  country: entry.continent,
  lat: entry.lat,
  lon: entry.lon,
  categoryTitle: `${entry.continent.toLocaleUpperCase("tr-TR")} · ${entry.role.toLocaleUpperCase("tr-TR")}`,
  categoryBadge: `🌍 ${entry.continent} · Model Atlası`,
  colorHex: entry.colorHex,
  model: AI_MODELS.find((model) => model.id === `continent-${entry.id}`) || AI_MODELS[0],
  highlightTag: entry.story,
  signatureLook: entry.tags.slice(0, 2).join(" · "),
  roasMetric: "KURGUSAL AI MODEL",
  soundtrackLabel: entry.tags[2] || entry.location,
}));

// Helper: Spherical coordinate mapping for 3D Earth
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const INITIAL_GLOBE_ROTATION = -(WORLD_HUBS[0].lon * Math.PI / 180) - Math.PI / 2;

export const GuzelAiEarthHero: React.FC<GuzelAiEarthHeroProps> = ({
  t,
  onOpenContactModal,
  onScrollToServices,
  onOpenStudio,
}) => {
  const worldHubs = WORLD_HUBS;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active location and interaction states
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentHub = WORLD_HUBS[activeIndex] || WORLD_HUBS[0];

  const [spinSpeedMultiplier, setSpinSpeedMultiplier] = useState<number>(1.0);
  const [ambientSound, setAmbientSound] = useState<boolean>(false);
  const [showIllustratorOverlay, setShowIllustratorOverlay] = useState<boolean>(true);

  // Shared refs for Three.js animation loop to read without stale closures
  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeIndex;

  const targetRotationYRef = useRef<number>(INITIAL_GLOBE_ROTATION);
  const currentRotationYRef = useRef<number>(INITIAL_GLOBE_ROTATION);
  const spinVelocityRef = useRef<number>(0.0014);

  // Audio Synth for ambient sound toggle
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (!ambientSound) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          oscRef.current = osc;
        }
      } catch {
        // AudioContext ignored if blocked by browser policy
      }
      setAmbientSound(true);
    } else {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {
          // ignore
        }
      }
      setAmbientSound(false);
    }
  };

  // Switch to a specific hub with smooth rotation
  const selectHub = useCallback((index: number) => {
    setActiveIndex(index);
    const targetHub = WORLD_HUBS[index];
    const targetY = -(targetHub.lon * (Math.PI / 180)) - Math.PI / 2;
    targetRotationYRef.current = targetY;
  }, []);

  const nextHub = useCallback(() => {
    const nextIdx = (activeIndex + 1) % WORLD_HUBS.length;
    selectHub(nextIdx);
  }, [activeIndex, selectHub]);

  const prevHub = useCallback(() => {
    const prevIdx = (activeIndex - 1 + WORLD_HUBS.length) % WORLD_HUBS.length;
    selectHub(prevIdx);
  }, [activeIndex, selectHub]);

  // =========================================================================
  // THREE.JS 3D REALISTIC EARTH INITIALIZATION & RENDERING
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const width = Math.max(container.clientWidth || window.innerWidth || 800, 320);
      const height = Math.max(container.clientHeight || window.innerHeight || 600, 320);

      // Scene & Camera setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(width < 700 ? 0 : -0.65, 0.25, width < 700 ? 5.3 : 4.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Initial slight axial tilt (Earth's actual tilt ~23.5 degrees = 0.41 rad)
      globeGroup.rotation.x = 0.35;


    // NASA/GSFC Blue Marble, Reto Stöckli: https://svs.gsfc.nasa.gov/2915/
    const earthTexture = new THREE.TextureLoader().load("/assets/earth-blue-marble.png");
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

    // 2. Earth Sphere Mesh
    const earthRadius = 1.35;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.88,
      metalness: 0,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // =========================================================================
    // 3. SEPARATE SEMI-TRANSPARENT REALISTIC ATMOSPHERIC CLOUDS SPHERE
    // =========================================================================
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 2048;
    cloudCanvas.height = 1024;
    const cCtx = cloudCanvas.getContext("2d");

    if (cCtx) {
      cCtx.clearRect(0, 0, 2048, 1024);

      // Draw swirling cloud systems, trade wind bands, and cyclones
      const drawCloudSwirl = (
        cx: number,
        cy: number,
        w: number,
        h: number,
        density: number
      ) => {
        for (let i = 0; i < density; i++) {
          const rad = (i / density) * Math.PI * 4;
          const dist = (i / density) * (w * 0.5);
          const px = cx + Math.cos(rad) * dist + (Math.random() - 0.5) * 20;
          const py = cy + Math.sin(rad) * (dist * (h / w)) + (Math.random() - 0.5) * 15;
          const blobRadius = 15 + Math.random() * 35;

          const grad = cCtx.createRadialGradient(px, py, 2, px, py, blobRadius);
          grad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
          grad.addColorStop(0.5, "rgba(240, 245, 255, 0.22)");
          grad.addColorStop(1, "transparent");

          cCtx.fillStyle = grad;
          cCtx.beginPath();
          cCtx.arc(px, py, blobRadius, 0, Math.PI * 2);
          cCtx.fill();
        }
      };

      // Mid-latitude storm cyclones (North Pacific, North Atlantic, Southern Ocean)
      drawCloudSwirl(500, 260, 260, 140, 45); // North Pacific storm
      drawCloudSwirl(920, 240, 240, 130, 40); // North Atlantic cyclone
      drawCloudSwirl(1650, 250, 280, 150, 50); // East Asia weather front
      drawCloudSwirl(700, 840, 380, 110, 60); // Roaring Forties storm band
      drawCloudSwirl(1400, 850, 420, 110, 65); // Southern Indian Ocean

      // Equatorial Intertropical Convergence Zone (ITCZ) whispy bands
      for (let x = 0; x < 2048; x += 140) {
        const y = 500 + Math.sin(x * 0.012) * 45;
        const width = 120 + Math.random() * 90;
        const height = 30 + Math.random() * 25;

        const grad = cCtx.createRadialGradient(x, y, 4, x, y, width * 0.5);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        grad.addColorStop(0.6, "rgba(245, 250, 255, 0.18)");
        grad.addColorStop(1, "transparent");

        cCtx.fillStyle = grad;
        cCtx.beginPath();
        cCtx.ellipse(x, y, width * 0.5, height * 0.5, 0.1, 0, Math.PI * 2);
        cCtx.fill();
      }
    }

    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    cloudTexture.wrapS = THREE.RepeatWrapping;
    cloudTexture.wrapT = THREE.ClampToEdgeWrapping;

    const cloudGeo = new THREE.SphereGeometry(earthRadius * 1.022, 48, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.24,
      blending: THREE.NormalBlending,
      roughness: 0.9,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);

    // =========================================================================
    // 4. ATMOSPHERE FRESNEL GLOW SHELL (Cyan & Sunset Rose Rim)
    // =========================================================================
    const atmosphereGeo = new THREE.SphereGeometry(earthRadius * 1.12, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(max(0.0, 0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.7);
          vec3 glowColor = mix(vec3(0.08, 0.28, 0.52), vec3(0.38, 0.67, 0.88), clamp(vNormal.y * 0.5 + 0.5, 0.0, 1.0));
          gl_FragColor = vec4(glowColor, intensity * 0.85);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // =========================================================================
    // 5. ORBITAL RUNWAY RINGS & SATELLITE BEACONS
    // =========================================================================
    const ringGeo1 = new THREE.RingGeometry(earthRadius * 1.38, earthRadius * 1.382, 128);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8ec9e8"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.16,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI * 0.42;
    orbitRing1.rotation.y = 0.35;
    scene.add(orbitRing1);

    const ringGeo2 = new THREE.RingGeometry(earthRadius * 1.54, earthRadius * 1.542, 128);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#b7d9ee"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI * 0.35;
    orbitRing2.rotation.y = -0.2;
    scene.add(orbitRing2);

    // Orbiting Satellite Beacon on Ring 1
    const satGeo = new THREE.SphereGeometry(0.032, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const satellite1 = new THREE.Mesh(satGeo, satMat);
    orbitRing1.add(satellite1);

    // =========================================================================
    // 6. STAR PARTICLE CLOUD
    // =========================================================================
    const starCount = 360;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color("#8baec7"),
      new THREE.Color("#c2d6e4"),
      new THREE.Color("#eef6fb"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 2.9 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.019,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // =========================================================================
    // 7. HUB HOTSPOT 3D BEACONS & PULSING RINGS
    // =========================================================================
    const hotspotMarkers: {
      mesh: THREE.Group;
      pulseRing: THREE.Mesh;
      hubId: string;
      color: string;
    }[] = [];

    worldHubs.forEach((hub) => {
      const markerGroup = new THREE.Group();
      const pos = latLonToVector3(hub.lat, hub.lon, earthRadius * 1.018);
      markerGroup.position.copy(pos);
      markerGroup.lookAt(pos.clone().multiplyScalar(2));

      // Central beacon sphere
      const beaconGeo = new THREE.SphereGeometry(0.022, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hub.colorHex),
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      markerGroup.add(beaconMesh);

      // Pulsing outer ripple ring
      const pulseGeo = new THREE.RingGeometry(0.03, 0.052, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hub.colorHex),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.48,
      });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      markerGroup.add(pulseRing);

      globeGroup.add(markerGroup);

      hotspotMarkers.push({
        mesh: markerGroup,
        pulseRing,
        hubId: hub.id,
        color: hub.colorHex,
      });
    });

    // =========================================================================
    // 8. GREAT CIRCLE BEZIER FLIGHT ARCS & MOVING DATA PACKETS
    // =========================================================================
    interface TrajectoryPulse {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }
    const trajectoryPulses: TrajectoryPulse[] = [];

    for (let i = 0; i < worldHubs.length; i++) {
      const hubA = worldHubs[i];
      const hubB = worldHubs[(i + 1) % worldHubs.length];

      const pA = latLonToVector3(hubA.lat, hubA.lon, earthRadius * 1.02);
      const pB = latLonToVector3(hubB.lat, hubB.lon, earthRadius * 1.02);

      const mid = pA.clone().add(pB).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(earthRadius * 1.26);

      const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
      const points = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(hubA.colorHex),
        transparent: true,
        opacity: 0.2,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Animated glowing data pulse along the trajectory
      const pulsePointGeo = new THREE.SphereGeometry(0.012, 8, 8);
      const pulsePointMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hubA.colorHex),
      });
      const pulsePoint = new THREE.Mesh(pulsePointGeo, pulsePointMat);
      globeGroup.add(pulsePoint);

      trajectoryPulses.push({
        curve,
        mesh: pulsePoint,
        progress: (i / worldHubs.length),
        speed: 0.0035 + Math.random() * 0.002,
      });
    }

    // =========================================================================
    // 9. LIGHTING SETUP (Cinematic Fashion Studio Optics)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x91b0ca, 0.28);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff2dc, 2.8);
    dirLight1.position.set(5, 2.5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x789bc1, 0.5);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x376384, 0.3);
    dirLight3.position.set(2, -4, 3);
    scene.add(dirLight3);

    // =========================================================================
    // 10. MOUSE & DRAG PHYSICS
    // =========================================================================
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationYRef.current += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.003;
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    let wheelTimeout: NodeJS.Timeout | null = null;
    let wheelAccumulator = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY;
      const addedSpeed = Math.abs(delta) * 0.00015;
      spinVelocityRef.current = Math.min(0.045, spinVelocityRef.current + addedSpeed);
      setSpinSpeedMultiplier(Number((spinVelocityRef.current / 0.0014).toFixed(1)));

      wheelAccumulator += delta;

      if (Math.abs(wheelAccumulator) > 65) {
        if (wheelAccumulator > 0) {
          const next = (activeIndexRef.current + 1) % worldHubs.length;
          setActiveIndex(next);
          const targetHub = worldHubs[next];
          targetRotationYRef.current = -(targetHub.lon * (Math.PI / 180)) - Math.PI / 2;
        } else {
          const prev = (activeIndexRef.current - 1 + worldHubs.length) % worldHubs.length;
          setActiveIndex(prev);
          const targetHub = worldHubs[prev];
          targetRotationYRef.current = -(targetHub.lon * (Math.PI / 180)) - Math.PI / 2;
        }
        wheelAccumulator = 0;
      }

      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        spinVelocityRef.current = 0.0014;
        setSpinSpeedMultiplier(1.0);
      }, 400);
    };

    const canvasElem = canvas;
    canvasElem.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvasElem.addEventListener("wheel", onWheel, { passive: false });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.position.x = container.clientWidth < 700 ? 0 : -0.65;
      camera.position.z = container.clientWidth < 700 ? 5.3 : 4.5;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // =========================================================================
    // 11. ANIMATION TICK LOOP
    // =========================================================================
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp rotation towards target rotation
      currentRotationYRef.current += (targetRotationYRef.current - currentRotationYRef.current) * 0.06;
      globeGroup.rotation.y = currentRotationYRef.current;

      // Inertial auto-rotation when user is not dragging
      if (!isDragging) {
        targetRotationYRef.current += spinVelocityRef.current;
      }

      // Independent dynamic cloud layer drift for realistic 3D parallax!
      cloudMesh.rotation.y += 0.00035;

      // Pulse hotspot markers
      hotspotMarkers.forEach((marker, idx) => {
        const pulse = 1 + Math.sin(elapsedTime * 4.5 + idx) * 0.4;
        marker.pulseRing.scale.set(pulse, pulse, 1);
        if (marker.pulseRing.material instanceof THREE.MeshBasicMaterial) {
          marker.pulseRing.material.opacity = 0.2 + Math.sin(elapsedTime * 4.5 + idx) * 0.14;
        }
      });

      // Animate trajectory pulses along flight arcs
      trajectoryPulses.forEach((tp) => {
        tp.progress = (tp.progress + tp.speed) % 1.0;
        const pt = tp.curve.getPoint(tp.progress);
        tp.mesh.position.copy(pt);
      });

      // Orbiting satellite on ring
      const satAngle = elapsedTime * 0.45;
      satellite1.position.set(
        Math.cos(satAngle) * (earthRadius * 1.39),
        Math.sin(satAngle) * (earthRadius * 1.39),
        0
      );

      // Rotate orbital rings
      orbitRing1.rotation.z = elapsedTime * 0.07;
      orbitRing2.rotation.z = -elapsedTime * 0.045;

      // Starfield shimmer
      starPoints.rotation.y = elapsedTime * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      canvasElem.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvasElem.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", handleResize);

      // Clean disposal safely
      try {
        earthGeo.dispose();
        earthMat.dispose();
        earthTexture.dispose();
        cloudGeo.dispose();
        cloudMat.dispose();
        cloudTexture.dispose();
        atmosphereGeo.dispose();
        atmosphereMat.dispose();
        ringGeo1.dispose();
        ringMat1.dispose();
        ringGeo2.dispose();
        ringMat2.dispose();
        starGeo.dispose();
        starMat.dispose();
        if (renderer) renderer.dispose();
      } catch (cleanupErr) {
        console.warn("WebGL cleanup error:", cleanupErr);
      }
    };
    } catch (err) {
      console.warn("GuzelAI 3D Earth WebGL could not be initialized, falling back to 2D HUD:", err);
    }
  }, []);

  return (
    <section
      id="hero-earth-section"
      className="relative min-h-[92vh] sm:min-h-[96vh] bg-gradient-to-b from-[#060c18] via-[#0a1526] to-[#FAF8F5] text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Atelier Corner Crop Marks */}
      <AtelierCropMarks className="opacity-40 z-20" />

      {/* Dynamic ambient color glow spots */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: currentHub.colorHex }}
      />
      <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-[#44BDBD]/15 blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. GIANT 3D BACKGROUND TYPOGRAPHY WITH ATELIER WATERMARK                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
        <div className="flex items-center gap-3 text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.4em] text-[#44BDBD] drop-shadow-lg mb-2 opacity-90">
          <span>ATELIER CRÉATIF</span>
          <span className="text-white/40">&bull;</span>
          <span>BLUE MARBLE EARTH</span>
          <span className="text-white/40">&bull;</span>
          <span>{currentHub.roasMetric}</span>
        </div>
        <div className="text-7xl sm:text-9xl md:text-[160px] lg:text-[220px] font-black tracking-tighter text-white/[0.06] leading-none select-none font-['Plus_Jakarta_Sans',sans-serif]">
          GUZELAI
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE.JS 3D EARTH CANVAS CONTAINER                                     */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#06101d]/80 via-[#06101d]/35 to-transparent sm:hidden" />

      {/* ========================================================================= */}
      {/* 3. ATELIER ILLUSTRATOR HUD OVERLAY (Left & Right Flanks)                   */}
      {/* ========================================================================= */}
      {showIllustratorOverlay && (
        <>
          {/* Top-Right Editorial Atelier Seal */}
          <div className="absolute top-20 right-6 sm:right-12 z-20 hidden md:block pointer-events-none">
            <AtelierIllustratorStamp
              title="GUZELAI MEDYA"
              subtitle="GLOBAL WORKFLOW"
              year="2026"
            />
          </div>

          {/* Left Flank Couture Silhouette Line Art */}
          <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-3 pointer-events-none text-white/40">
            <div className="p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
              <CoutureSilhouetteSketch className="w-20 h-44 text-[#E65A7F]/70" />
              <div className="text-center mt-2">
                <span className="text-[9px] font-mono font-bold tracking-widest text-amber-300/80 uppercase block">
                  COUTURE FIG. 01
                </span>
                <span className="text-[8px] font-mono text-white/50 block">
                  AI DRAPED SILK
                </span>
              </div>
            </div>
            <AtelierTailorLines />
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 4. TOP BRAND HEADER / HUD OVERLAY                                         */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between pointer-events-auto">
        {/* Left: Live Earth Indicator & Brand Coordinates */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-white shadow-lg">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-md"
              style={{ backgroundColor: currentHub.colorHex }}
            />
            <span className="uppercase tracking-wider">DÜNYA ATLASI: {currentHub.cityName}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur text-[11px] font-mono font-semibold text-white/75 border border-white/10">
            <Compass className="w-3 h-3 text-[#44BDBD]" />
            <span>
              LAT {currentHub.lat > 0 ? `${currentHub.lat.toFixed(1)}°N` : `${Math.abs(currentHub.lat).toFixed(1)}°S`} &bull; LON{" "}
              {currentHub.lon > 0 ? `${currentHub.lon.toFixed(1)}°E` : `${Math.abs(currentHub.lon).toFixed(1)}°W`}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur text-[11px] font-semibold text-white/70 border border-white/10">
            <RotateCw className="w-3 h-3 text-[#E65A7F]" />
            <span>Hız: {spinSpeedMultiplier}x</span>
          </div>
        </div>

        {/* Right: Sound & HUD Toggles + Primary CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowIllustratorOverlay(!showIllustratorOverlay)}
            className={`p-2 rounded-full backdrop-blur border text-xs flex items-center gap-1.5 transition ${
              showIllustratorOverlay
                ? "bg-white/20 border-white/30 text-white"
                : "bg-white/10 border-white/10 text-white/60 hover:text-white"
            }`}
            title="İlüstratör & Çizim Katmanı"
          >
            <Layers className="w-3.5 h-3.5 text-[#44BDBD]" />
            <span className="text-[10px] hidden lg:inline font-bold">Atelier Çizim</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/15 text-white transition text-xs flex items-center gap-1.5"
            title="Ambiyans Ses Efekti"
          >
            {ambientSound ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#E65A7F]" />
                <span className="text-[10px] hidden md:inline font-bold">Ses Açık</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[10px] hidden md:inline font-bold">Sessiz</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenContactModal?.()}
            className="px-4 py-2 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs font-extrabold tracking-tight transition shadow-lg shadow-[#E65A7F]/30"
          >
            {t.hero.primaryCta}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MAIN INTERACTIVE HUD: FLOATING MODEL CARD & WHEEL CONTROLS             */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pointer-events-none flex-1 flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Left: Editorial Mission & Active Hub Info (6 cols) */}
          <div className="lg:col-span-6 space-y-4 pointer-events-auto text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-extrabold tracking-wider uppercase text-white shadow-xl">
              <span className="text-[#44BDBD]">0{activeIndex + 1} / 0{worldHubs.length}</span>
              <span className="text-white/40">&bull;</span>
              <span style={{ color: currentHub.colorHex }}>{currentHub.categoryBadge}</span>
            </div>

            <h1 className="max-w-xl text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08] drop-shadow-2xl font-['Plus_Jakarta_Sans',sans-serif]">
              {currentHub.categoryTitle}
            </h1>

            <p className="text-xs sm:text-sm text-white/85 max-w-lg leading-relaxed drop-shadow-md">
              <strong className="text-white font-bold">{currentHub.cityName}</strong> &bull; {currentHub.highlightTag}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => document.getElementById(`model-${currentHub.id.replace("hub-", "")}`)?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-full font-extrabold text-xs sm:text-sm text-[#111827] transition shadow-xl flex items-center gap-2"
                style={{ backgroundColor: currentHub.colorHex }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Modeli ve Promptu Gör</span>
              </button>

              <button
                onClick={() => onOpenStudio("vertical_clips")}
                className="px-4 py-3 rounded-full bg-[#E65A7F] hover:bg-[#D9496F] text-white text-xs sm:text-sm font-extrabold transition shadow-lg shadow-[#E65A7F]/30 flex items-center gap-1.5"
              >
                <span>🎬 Clips & Yapılan İşler</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-mono">9:16</span>
              </button>

              <button
                onClick={() => onOpenStudio("cinematic_websites")}
                className="hidden sm:flex px-4 py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur text-white text-xs sm:text-sm font-extrabold tracking-tight border border-white/20 transition items-center gap-1.5"
              >
                <span>🌐 Tasarım Web Siteleri</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#44BDBD]/20 text-[#44BDBD] font-mono">DIRECTOR</span>
              </button>

              <button
                onClick={() => onOpenStudio("model_creator")}
                className="px-4 py-3 rounded-full bg-gradient-to-r from-[#E65A7F]/90 to-[#44BDBD]/90 hover:from-[#E65A7F] hover:to-[#44BDBD] text-white text-xs sm:text-sm font-black tracking-tight transition shadow-lg shadow-[#E65A7F]/20 flex items-center gap-1.5 border border-white/20"
              >
                <span>⚡ Model Üret</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-amber-300 font-mono">PORTRE + TAM BOY</span>
              </button>

              <button
                onClick={onScrollToServices}
                className="hidden sm:flex px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xs sm:text-sm font-bold tracking-tight border border-white/20 transition items-center gap-1.5"
              >
                <span>Ajans Hizmetleri</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Floating Interactive AI Model Profile Card (6 cols) */}
          <div className="lg:col-span-6 hidden sm:flex justify-start lg:justify-end pointer-events-auto">
            <div className="w-full max-w-md bg-black/70 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl space-y-4 transform transition-all duration-500 hover:border-white/40">
              {/* Header inside Card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={currentHub.model.avatar}
                      alt={currentHub.model.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 shadow-md"
                      style={{ borderColor: currentHub.colorHex }}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold text-white shadow"
                      style={{ backgroundColor: currentHub.colorHex }}
                    >
                      AI
                    </span>
                  </div>

                  <div>
                    <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>{currentHub.model.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/90 font-mono">
                        {currentHub.roasMetric}
                      </span>
                    </div>
                    <div className="text-xs text-[#44BDBD] font-semibold">
                      {currentHub.cityName} · {currentHub.country}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">
                    MODEL KONSEPTİ
                  </div>
                  <div className="text-xs font-bold text-[#FBC056]">
                    {currentHub.model.title}
                  </div>
                </div>
              </div>

              {/* Lookbook item & tag */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Öne Çıkan Stil:</span>
                  <span className="font-bold text-white truncate max-w-[200px]">
                    {currentHub.signatureLook}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Sahne detayı:</span>
                  <span className="text-[#44BDBD] font-semibold truncate max-w-[200px]">
                    {currentHub.soundtrackLabel}
                  </span>
                </div>
              </div>

              {/* Bottom Nav & Actions inside Card */}
              <div className="flex items-center justify-between pt-1 gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevHub}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
                    title="Önceki Hub"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextHub}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
                    title="Sonraki Hub"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] text-white/60 font-semibold ml-1">
                    {activeIndex + 1}/{worldHubs.length}
                  </span>
                </div>

                <button
                  onClick={() => onOpenStudio("dress_up", currentHub.model)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#E65A7F]" />
                  <span>Kıyafet & Doku Düzenle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM WORLD HUBS BAR (City selector with direct rotation)             */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 pointer-events-auto">
        <div className="p-3 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* City Chips Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {worldHubs.map((hub, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={hub.id}
                  onClick={() => selectHub(idx)}
                  className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 whitespace-nowrap border ${
                    isSelected
                      ? "text-[#111827] shadow-md scale-105"
                      : "bg-white/5 text-white/60 hover:text-white border-white/10 hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor: isSelected ? hub.colorHex : undefined,
                    borderColor: isSelected ? hub.colorHex : undefined,
                  }}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#111827] animate-ping" : "bg-white/40"}`}
                  />
                  <span>{hub.cityName}</span>
                </button>
              );
            })}
          </div>

          {/* Mouse Wheel & Realism Status */}
          <div className="flex items-center gap-3 text-white/70 text-[11px] font-semibold shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#44BDBD]" />
              <span>Döndürmek için sürükleyin / Fare tekerleği</span>
            </span>
            <span className="hidden lg:inline text-white/45">Dünya dokusu: NASA/GSFC Blue Marble · Reto Stöckli</span>
          </div>
        </div>
      </div>
    </section>
  );
};
