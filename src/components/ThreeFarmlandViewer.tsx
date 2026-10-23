import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Camera, 
  Layers, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sparkles, 
  Sun, 
  Eye, 
  EyeOff, 
  Info,
  ChevronDown,
  ChevronUp,
  Droplets,
  Sprout,
  Bug,
  BarChart3,
  Warehouse,
  Flame,
  Layers3
} from 'lucide-react';
import { DHARWAD_CROPS } from '../data/dharwadData';

export type VisualMode = 
  | 'farmland' 
  | 'soil_profile' 
  | 'crop_growth' 
  | 'root_moisture' 
  | 'irrigation' 
  | 'pest_inspection' 
  | 'harvesting' 
  | 'financial_chart';

interface Props {
  initialMode?: VisualMode;
  isKannada?: boolean;
}

// Reusable math objects at module scope for zero GC inside render loop
const _vec3 = new THREE.Vector3();
const _targetLook = new THREE.Vector3(0, 0, 0);

export const ThreeFarmlandViewer: React.FC<Props> = ({ initialMode = 'farmland', isKannada = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<VisualMode>(initialMode);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [activeCropId, setActiveCropId] = useState<string>('cotton');
  const [growthStage, setGrowthStage] = useState<number>(3); // 1 = Seedling, 2 = Vegetative, 3 = Flowering, 4 = Boll/Pod filling, 5 = Mature
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [sunIntensity, setSunIntensity] = useState<number>(1.2);
  const [activePest, setActivePest] = useState<'pink_bollworm' | 'pod_borer' | 'fall_armyworm'>('pink_bollworm');
  const [inspectionTooltip, setInspectionTooltip] = useState<{ visible: boolean; text: string; x: number; y: number }>({
    visible: false,
    text: '',
    x: 0,
    y: 0
  });

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const activeGroupRef = useRef<THREE.Group | null>(null);
  const animatedWaterDropletsRef = useRef<THREE.Mesh[]>([]);
  const isSoftwareGlRef = useRef<boolean>(false);
  const animationFrameIdRef = useRef<number>(0);

  // Procedural canvas textures generator
  const createProceduralSoilTexture = (type: 'black' | 'red') => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (type === 'black') {
      // Deep Vertisol / Black Cotton Soil texture
      ctx.fillStyle = '#22201d';
      ctx.fillRect(0, 0, 512, 512);

      // Clay crack patterns
      ctx.strokeStyle = '#151311';
      ctx.lineWidth = 3;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        let x = Math.random() * 512;
        let y = Math.random() * 512;
        ctx.moveTo(x, y);
        for (let j = 0; j < 5; j++) {
          x += (Math.random() - 0.5) * 60;
          y += (Math.random() - 0.5) * 60;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Organic clay crumb texture
      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const gray = Math.floor(25 + Math.random() * 25);
        ctx.fillStyle = `rgb(${gray}, ${gray - 3}, ${gray - 6})`;
        ctx.fillRect(x, y, 2, 2);
      }
    } else {
      // Alfisol / Red Sandy Loam texture
      ctx.fillStyle = '#8b3a24';
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 8000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.floor(130 + Math.random() * 45);
        const g = Math.floor(55 + Math.random() * 30);
        const b = Math.floor(35 + Math.random() * 25);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  };

  // Helper to create tree group
  const createProceduralTree = (type: 'neem' | 'coconut', x: number, z: number) => {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0, z);

    if (type === 'coconut') {
      // Trunk (curved cylinder segments)
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a483a, roughness: 0.9 });
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 6, 8);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 3;
      trunk.rotation.z = 0.08;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Fronds
      const frondMat = new THREE.MeshStandardMaterial({ color: 0x2d6a2d, roughness: 0.6, side: THREE.DoubleSide });
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2;
        const frondGeo = new THREE.ConeGeometry(0.7, 3.2, 5);
        const frond = new THREE.Mesh(frondGeo, frondMat);
        frond.position.set(Math.sin(angle) * 0.8, 5.8, Math.cos(angle) * 0.8);
        frond.rotation.set(Math.cos(angle) * 0.8, angle, Math.sin(angle) * 0.8);
        treeGroup.add(frond);
      }
    } else {
      // Neem / Babul tree
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d3025, roughness: 0.95 });
      const trunkGeo = new THREE.CylinderGeometry(0.35, 0.5, 3.5, 8);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.75;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Canopy layers
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x1f5424, roughness: 0.7 });
      const c1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 1), leafMat);
      c1.position.y = 4.2;
      c1.castShadow = true;
      treeGroup.add(c1);

      const c2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4, 1), leafMat);
      c2.position.set(0.8, 3.8, 0.4);
      c2.castShadow = true;
      treeGroup.add(c2);

      const c3 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3, 1), leafMat);
      c3.position.set(-0.7, 4.0, -0.5);
      c3.castShadow = true;
      treeGroup.add(c3);
    }
    return treeGroup;
  };

  // Helper to create tractor
  const createProceduralTractor = (x: number, z: number) => {
    const tractor = new THREE.Group();
    tractor.position.set(x, 0, z);

    // Chassis body
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.3, metalness: 0.4 }); // Red Mahindra/Swaraj style
    const bodyGeo = new THREE.BoxGeometry(1.8, 1.1, 3.2);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    tractor.add(body);

    // Hood / Engine
    const hoodMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4 });
    const hoodGeo = new THREE.BoxGeometry(1.5, 0.9, 1.8);
    const hood = new THREE.Mesh(hoodGeo, hoodMat);
    hood.position.set(0, 1.3, 1.5);
    hood.castShadow = true;
    tractor.add(hood);

    // Rear Wheels (Large rubber tires)
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 });
    const rearWheelGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.5, 16);
    const rwLeft = new THREE.Mesh(rearWheelGeo, tireMat);
    rwLeft.rotation.z = Math.PI / 2;
    rwLeft.position.set(-1.1, 1.1, -0.6);
    rwLeft.castShadow = true;
    tractor.add(rwLeft);

    const rwRight = rwLeft.clone();
    rwRight.position.x = 1.1;
    tractor.add(rwRight);

    // Front Wheels (Smaller)
    const frontWheelGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.35, 16);
    const fwLeft = new THREE.Mesh(frontWheelGeo, tireMat);
    fwLeft.rotation.z = Math.PI / 2;
    fwLeft.position.set(-0.95, 0.65, 1.8);
    fwLeft.castShadow = true;
    tractor.add(fwLeft);

    const fwRight = fwLeft.clone();
    fwRight.position.x = 0.95;
    tractor.add(fwRight);

    // Exhaust pipe
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x44403c, metalness: 0.8, roughness: 0.2 });
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8), pipeMat);
    pipe.position.set(0.6, 2.3, 1.8);
    tractor.add(pipe);

    // Steering & Seat
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x292524 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.6), seatMat);
    seat.position.set(0, 1.8, -0.2);
    tractor.add(seat);

    return tractor;
  };

  // 1. Farmland Landscape Builder
  const buildFarmlandScene = (parent: THREE.Group) => {
    // Terrain base (divided into Black Vertisol & Red Alfisol parcels with contour bunding)
    const terrainGeo = new THREE.PlaneGeometry(60, 60, 64, 64);
    // Add subtle elevation wave
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const elevation = Math.sin(vx * 0.08) * Math.cos(vy * 0.08) * 0.6;
      pos.setZ(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    const blackSoilMat = new THREE.MeshStandardMaterial({
      color: 0x2b2723,
      roughness: 0.9,
      map: createProceduralSoilTexture('black')
    });
    const terrain = new THREE.Mesh(terrainGeo, blackSoilMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    parent.add(terrain);

    // Red soil parcel on the right side
    const redSoilGeo = new THREE.PlaneGeometry(24, 26);
    const redSoilMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.85,
      map: createProceduralSoilTexture('red'),
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const redParcel = new THREE.Mesh(redSoilGeo, redSoilMat);
    redParcel.rotation.x = -Math.PI / 2;
    redParcel.position.set(14, 0.02, 10);
    redParcel.receiveShadow = true;
    parent.add(redParcel);

    // Contour Bunds (clay ridges to conserve runoff rainwater per UAS Dharwad)
    const bundMat = new THREE.MeshStandardMaterial({ color: 0x3d352e, roughness: 0.95 });
    for (let b = -18; b <= 18; b += 12) {
      const bundGeo = new THREE.BoxGeometry(45, 0.45, 1.2);
      const bund = new THREE.Mesh(bundGeo, bundMat);
      bund.position.set(0, 0.22, b);
      bund.receiveShadow = true;
      parent.add(bund);
    }

    // Krishi Honda (Farm Pond for Dharwad rainwater harvesting)
    const pondGroup = new THREE.Group();
    pondGroup.position.set(-16, 0.05, -14);

    const rimGeo = new THREE.RingGeometry(4.5, 6.2, 32);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x44372c, roughness: 0.9 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = -Math.PI / 2;
    pondGroup.add(rim);

    // Water surface
    const waterGeo = new THREE.CircleGeometry(4.4, 32);
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.15;
    pondGroup.add(water);
    parent.add(pondGroup);

    // Crops rows (Instanced or grouped Cotton & Jowar crops)
    const cropMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.7 });
    const cropGeo = new THREE.ConeGeometry(0.4, 1.2, 6);
    for (let r = -12; r <= 8; r += 2) {
      for (let c = -14; c <= 8; c += 1.8) {
        const crop = new THREE.Mesh(cropGeo, cropMat);
        crop.position.set(c + (Math.random() - 0.5) * 0.2, 0.6, r + (Math.random() - 0.5) * 0.2);
        crop.castShadow = true;
        parent.add(crop);
      }
    }

    // Add trees along field boundaries
    parent.add(createProceduralTree('coconut', -22, -18));
    parent.add(createProceduralTree('coconut', -24, -12));
    parent.add(createProceduralTree('neem', 22, -16));
    parent.add(createProceduralTree('neem', 20, 18));
    parent.add(createProceduralTree('neem', -18, 20));

    // Tractor working in field
    const tractor = createProceduralTractor(-4, 6);
    tractor.rotation.y = 0.35;
    parent.add(tractor);
  };

  // 2. Soil Horizon Profile Builder (Vertisol vs Alfisol)
  const buildSoilHorizonScene = (parent: THREE.Group) => {
    // Side-by-side vertical monoliths comparing Dharwad Deep Vertisol and Alfisol
    const monolithWidth = 6;
    const monolithDepth = 3;
    const totalHeight = 9;

    // LEFT: Vertisol Monolith (Black Cotton Soil)
    const vertisolGroup = new THREE.Group();
    vertisolGroup.position.set(-4.5, totalHeight / 2, 0);

    // Horizon A (Topsoil - 0 to 40cm, rich organic clay)
    const vA_geo = new THREE.BoxGeometry(monolithWidth, 2.5, monolithDepth);
    const vA_mat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.95,
      map: createProceduralSoilTexture('black')
    });
    const vA = new THREE.Mesh(vA_geo, vA_mat);
    vA.position.y = 3.25;
    vertisolGroup.add(vA);

    // Horizon B (Slickenside subsoil with shrink-swell cracks - 40 to 120cm)
    const vB_geo = new THREE.BoxGeometry(monolithWidth, 3.5, monolithDepth);
    const vB_mat = new THREE.MeshStandardMaterial({ color: 0x272420, roughness: 0.9 });
    const vB = new THREE.Mesh(vB_geo, vB_mat);
    vB.position.y = 0.25;
    vertisolGroup.add(vB);

    // Horizon C (Calcareous nodule kankar layer - >120cm)
    const vC_geo = new THREE.BoxGeometry(monolithWidth, 3.0, monolithDepth);
    const vC_mat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.9 });
    const vC = new THREE.Mesh(vC_geo, vC_mat);
    vC.position.y = -3.0;
    vertisolGroup.add(vC);

    // White kankar nodules scattered in Horizon C
    const kankarMat = new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.8 });
    for (let k = 0; k < 25; k++) {
      const kankar = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18 + Math.random() * 0.12), kankarMat);
      kankar.position.set(
        (Math.random() - 0.5) * (monolithWidth - 0.5),
        -3.0 + (Math.random() - 0.5) * 2.5,
        (monolithDepth / 2) + 0.05
      );
      vertisolGroup.add(kankar);
    }
    parent.add(vertisolGroup);

    // RIGHT: Alfisol Monolith (Red Sandy Loam)
    const alfisolGroup = new THREE.Group();
    alfisolGroup.position.set(4.5, totalHeight / 2, 0);

    // Horizon A (Red Sandy Loam topsoil - 0 to 25cm)
    const aA_geo = new THREE.BoxGeometry(monolithWidth, 2.0, monolithDepth);
    const aA_mat = new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.85,
      map: createProceduralSoilTexture('red')
    });
    const aA = new THREE.Mesh(aA_geo, aA_mat);
    aA.position.y = 3.5;
    alfisolGroup.add(aA);

    // Horizon B (Clay-enriched illuvial reddish-brown layer - 25 to 70cm)
    const aB_geo = new THREE.BoxGeometry(monolithWidth, 3.5, monolithDepth);
    const aB_mat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.9 });
    const aB = new THREE.Mesh(aB_geo, aB_mat);
    aB.position.y = 0.75;
    alfisolGroup.add(aB);

    // Horizon C (Weathered gravelly saprolite rock - >70cm)
    const aC_geo = new THREE.BoxGeometry(monolithWidth, 3.5, monolithDepth);
    const aC_mat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.95 });
    const aC = new THREE.Mesh(aC_geo, aC_mat);
    aC.position.y = -2.75;
    alfisolGroup.add(aC);
    parent.add(alfisolGroup);

    // Base display pedestal
    const pedestal = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 })
    );
    pedestal.position.y = -0.2;
    parent.add(pedestal);
  };

  // 3. Crop Growth Stages Builder (Morphology)
  const buildCropGrowthScene = (parent: THREE.Group, stage: number, cropId: string) => {
    const plantGroup = new THREE.Group();
    plantGroup.position.set(0, 0, 0);

    // Ground platform
    const soilGround = new THREE.Mesh(
      new THREE.CylinderGeometry(4.5, 4.5, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x26221d, roughness: 0.95 })
    );
    soilGround.position.y = -0.2;
    plantGroup.add(soilGround);

    // Main stem
    const stemHeight = stage * 0.9;
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.6 });
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.16, stemHeight, 8);
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = stemHeight / 2;
    stem.castShadow = true;
    plantGroup.add(stem);

    // Foliage branches based on growth stage
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.5, side: THREE.DoubleSide });
    const numBranches = stage * 3;

    for (let b = 1; b <= numBranches; b++) {
      const branchHeight = (b / numBranches) * stemHeight * 0.85;
      const angle = (b * 137.5 * Math.PI) / 180; // Golden angle phyllotaxis
      const branchGroup = new THREE.Group();
      branchGroup.position.set(0, branchHeight, 0);
      branchGroup.rotation.y = angle;

      // Petiole / branch stem
      const pLen = 0.5 + stage * 0.18;
      const petiole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.04, pLen, 6),
        stemMat
      );
      petiole.rotation.z = Math.PI / 3;
      petiole.position.set(Math.sin(Math.PI / 3) * (pLen / 2), Math.cos(Math.PI / 3) * (pLen / 2), 0);
      branchGroup.add(petiole);

      // Leaf blade
      const leafGeo = new THREE.ConeGeometry(0.28 + stage * 0.05, 0.75 + stage * 0.1, 4);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.rotation.z = Math.PI / 2.3;
      leaf.position.set(pLen + 0.3, (pLen * 0.5), 0);
      leaf.scale.set(1, 0.15, 1);
      branchGroup.add(leaf);

      // Flowering at stage >= 3
      if (stage >= 3 && b % 2 === 0) {
        const flowerMat = new THREE.MeshStandardMaterial({
          color: cropId === 'cotton' ? 0xfef08a : (cropId === 'bengal_gram' ? 0xf472b6 : 0xfde047),
          roughness: 0.4
        });
        const flower = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 1), flowerMat);
        flower.position.set(pLen * 0.8, (pLen * 0.5) + 0.15, 0);
        branchGroup.add(flower);
      }

      // Pod / Cotton Boll at stage >= 4
      if (stage >= 4 && b % 3 === 0) {
        if (cropId === 'cotton') {
          // Open cotton boll with fluffy white lint fiber
          const bollCaseMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
          const bollCase = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 5), bollCaseMat);
          bollCase.rotation.x = Math.PI;
          bollCase.position.set(pLen * 0.6, (pLen * 0.4) + 0.1, 0);
          branchGroup.add(bollCase);

          if (stage === 5) {
            // White bursting cotton lint
            const lintMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.98 });
            const lint = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 1), lintMat);
            lint.position.set(pLen * 0.6, (pLen * 0.4) + 0.22, 0);
            branchGroup.add(lint);
          }
        } else {
          // Chickpea pod / bean pod
          const podMat = new THREE.MeshStandardMaterial({ color: stage === 5 ? 0xd97706 : 0x65a30d, roughness: 0.7 });
          const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.3, 4, 8), podMat);
          pod.rotation.z = Math.PI / 4;
          pod.position.set(pLen * 0.65, (pLen * 0.4) + 0.1, 0);
          branchGroup.add(pod);
        }
      }

      plantGroup.add(branchGroup);
    }
    parent.add(plantGroup);
  };

  // 4. Subsurface Root Depth & Moisture Map Builder
  const buildRootMoistureScene = (parent: THREE.Group) => {
    const group = new THREE.Group();

    // Transparent Soil Column with 3 moisture strata
    const colWidth = 5;
    const colDepth = 5;

    // Layer 1: 0 - 30 cm (Surface layer - rapid evapotranspiration)
    const l1_geo = new THREE.BoxGeometry(colWidth, 2.0, colDepth);
    const l1_mat = new THREE.MeshStandardMaterial({
      color: 0x3e2723,
      transparent: true,
      opacity: 0.85,
      roughness: 0.9
    });
    const l1 = new THREE.Mesh(l1_geo, l1_mat);
    l1.position.y = -1.0;
    group.add(l1);

    // Layer 2: 30 - 60 cm (Active root moisture extraction zone)
    const l2_geo = new THREE.BoxGeometry(colWidth, 2.5, colDepth);
    const l2_mat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      transparent: true,
      opacity: 0.88,
      roughness: 0.9
    });
    const l2 = new THREE.Mesh(l2_geo, l2_mat);
    l2.position.y = -3.25;
    group.add(l2);

    // Layer 3: 60 - 120 cm (Deep Vertisol subsoil moisture reservoir)
    const l3_geo = new THREE.BoxGeometry(colWidth, 3.5, colDepth);
    const l3_mat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      transparent: true,
      opacity: 0.92,
      roughness: 0.95
    });
    const l3 = new THREE.Mesh(l3_geo, l3_mat);
    l3.position.y = -6.25;
    group.add(l3);

    // Deep Taproot System (Cotton / Bengal Gram deep penetration)
    const taprootMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 });
    const mainTap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.02, 6.8, 8),
      taprootMat
    );
    mainTap.position.y = -3.4;
    group.add(mainTap);

    // Lateral secondary roots branching into moisture zones
    for (let r = 0; r < 28; r++) {
      const rY = -0.5 - (r / 28) * 6.0;
      const angle = (r * 137.5 * Math.PI) / 180;
      const rootLen = 0.8 + Math.sin(r) * 0.45;
      const lateral = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.01, rootLen, 6),
        taprootMat
      );
      lateral.position.set(
        Math.sin(angle) * (rootLen / 2),
        rY,
        Math.cos(angle) * (rootLen / 2)
      );
      lateral.rotation.set(0.4 * Math.cos(angle), angle, 0.4 * Math.sin(angle));
      group.add(lateral);
    }

    // Moisture droplet indicators in subsoil
    const blueMoistureMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85
    });
    for (let m = 0; m < 35; m++) {
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), blueMoistureMat);
      drop.position.set(
        (Math.random() - 0.5) * 3.8,
        -1.5 - Math.random() * 5.8,
        (Math.random() - 0.5) * 3.8
      );
      group.add(drop);
    }

    // Above ground plant silhouette
    const topPlant = new THREE.Mesh(
      new THREE.ConeGeometry(0.6, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 })
    );
    topPlant.position.y = 1.1;
    group.add(topPlant);

    parent.add(group);
  };

  // 5. Modern Micro-Irrigation Simulation Builder (Drip & Emitters)
  const buildIrrigationScene = (parent: THREE.Group) => {
    const group = new THREE.Group();
    animatedWaterDropletsRef.current = [];

    // Soil Bed with furrows
    const bedGeo = new THREE.BoxGeometry(16, 0.6, 12);
    const bedMat = new THREE.MeshStandardMaterial({
      color: 0x292524,
      roughness: 0.95,
      map: createProceduralSoilTexture('black')
    });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = -0.3;
    bed.receiveShadow = true;
    group.add(bed);

    // Main Delivery PVC Pipe (White / Blue)
    const mainPvcMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.1 });
    const mainPipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 12, 16),
      mainPvcMat
    );
    mainPipe.rotation.x = Math.PI / 2;
    mainPipe.position.set(-7, 0.15, 0);
    group.add(mainPipe);

    // Lateral Drip Lines (Black 16mm LLDPE pipes running along crop rows)
    const dripMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
    const waterDropMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      transmission: 0.7,
      transparent: true,
      opacity: 0.9,
      roughness: 0.1
    });

    const wetZoneMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.98,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });

    for (let row = -4; row <= 4; row += 2.6) {
      const lateral = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 14, 12),
        dripMat
      );
      lateral.rotation.z = Math.PI / 2;
      lateral.position.set(0, 0.12, row);
      group.add(lateral);

      // Inline Pressure-Compensating Emitters and Wetted Bulbs
      for (let e = -5; e <= 5; e += 2.5) {
        // Emitter casing
        const emitter = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8),
          new THREE.MeshStandardMaterial({ color: 0xef4444 }) // Red inline emitter
        );
        emitter.position.set(e, 0.14, row);
        group.add(emitter);

        // Soil wetted circle / bulb around dripper
        const wetBulb = new THREE.Mesh(new THREE.CircleGeometry(0.75, 16), wetZoneMat);
        wetBulb.rotation.x = -Math.PI / 2;
        wetBulb.position.set(e, 0.02, row);
        group.add(wetBulb);

        // Animated dripping droplet
        const droplet = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), waterDropMat);
        droplet.position.set(e, 0.1, row);
        (droplet as any).initialY = 0.1;
        (droplet as any).fallSpeed = 0.008 + Math.random() * 0.004;
        group.add(droplet);
        animatedWaterDropletsRef.current.push(droplet);

        // Healthy green crop nourished by dripper
        const crop = new THREE.Mesh(
          new THREE.ConeGeometry(0.35, 1.3, 6),
          new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 })
        );
        crop.position.set(e + 0.35, 0.65, row);
        group.add(crop);
      }
    }

    // Venturi Injector & Filter unit at main pipe inlet
    const filterUnit = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.4, 16),
      new THREE.MeshStandardMaterial({ color: 0x047857, metalness: 0.2 })
    );
    filterUnit.position.set(-7, 1.2, -4);
    group.add(filterUnit);

    parent.add(group);
  };

  // 6. Pest & Pathology 3D Inspection Builder
  const buildPestInspectionScene = (parent: THREE.Group, pestType: 'pink_bollworm' | 'pod_borer' | 'fall_armyworm') => {
    const group = new THREE.Group();

    // Inspection pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.8, 0.5, 32),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 })
    );
    pedestal.position.y = -0.25;
    group.add(pedestal);

    if (pestType === 'pink_bollworm') {
      // Cotton Boll with entry bore hole & Pink Bollworm larva
      const bollGroup = new THREE.Group();
      bollGroup.position.set(0, 1.5, 0);

      // Green / brown damaged cotton boll halves
      const bollGeo = new THREE.SphereGeometry(1.4, 24, 24, 0, Math.PI * 1.5);
      const bollMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.6 });
      const boll = new THREE.Mesh(bollGeo, bollMat);
      bollGroup.add(boll);

      // White internal fiber being damaged
      const fiberMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.9 });
      const fiber = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 2), fiberMat);
      bollGroup.add(fiber);

      // Pink Bollworm Caterpillar (Pectinophora gossypiella)
      const larvaGroup = new THREE.Group();
      larvaGroup.position.set(0.4, 0.1, 0.5);
      larvaGroup.rotation.z = 0.3;

      const segCount = 7;
      for (let s = 0; s < segCount; s++) {
        const segMat = new THREE.MeshStandardMaterial({
          color: s % 2 === 0 ? 0xf472b6 : 0xfbcfe8, // Distinctive pink banding
          roughness: 0.5
        });
        const seg = new THREE.Mesh(new THREE.SphereGeometry(0.14 - s * 0.008, 12, 12), segMat);
        seg.position.set((s - 3) * 0.18, Math.sin(s * 0.5) * 0.08, 0);
        larvaGroup.add(seg);
      }
      // Dark head capsule
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x78350f })
      );
      head.position.set(-3.2 * 0.18, 0, 0);
      larvaGroup.add(head);

      bollGroup.add(larvaGroup);
      group.add(bollGroup);
    } else if (pestType === 'pod_borer') {
      // Chickpea Pod with Helicoverpa armigera larva boring inside
      const podGroup = new THREE.Group();
      podGroup.position.set(0, 1.6, 0);

      // Inflated green chickpea pod
      const podMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.7, side: THREE.DoubleSide });
      const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.8, 1.6, 12, 24), podMat);
      pod.rotation.z = Math.PI / 4;
      podGroup.add(pod);

      // Bore entry hole
      const holeMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.3, 16), holeMat);
      hole.position.set(0.45, 0.2, 0.82);
      podGroup.add(hole);

      // Helicoverpa armigera larva (Gram Pod Borer) feeding
      const wormGroup = new THREE.Group();
      wormGroup.position.set(0.7, 0.4, 0.8);
      wormGroup.rotation.z = -0.5;

      for (let w = 0; w < 8; w++) {
        const segMat = new THREE.MeshStandardMaterial({
          color: w % 2 === 0 ? 0x65a30d : 0x4d7c0f,
          roughness: 0.6
        });
        const seg = new THREE.Mesh(new THREE.SphereGeometry(0.18 - w * 0.01, 10, 10), segMat);
        seg.position.set(w * 0.22, Math.cos(w * 0.4) * 0.1, 0);
        wormGroup.add(seg);
      }
      podGroup.add(wormGroup);
      group.add(podGroup);
    } else {
      // Fall Armyworm whorl damage on Maize
      const whorlGroup = new THREE.Group();
      whorlGroup.position.set(0, 1.4, 0);

      // Maize stem & unfurling leaves with ragged feeding holes
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6, side: THREE.DoubleSide });
      for (let i = 0; i < 6; i++) {
        const lAngle = (i / 6) * Math.PI * 2;
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2.5, 4), leafMat);
        leaf.position.set(Math.sin(lAngle) * 0.6, 0.8, Math.cos(lAngle) * 0.6);
        leaf.rotation.set(0.5 * Math.cos(lAngle), lAngle, 0.5 * Math.sin(lAngle));
        whorlGroup.add(leaf);
      }

      // FAW caterpillar with inverted 'Y' suture on head
      const fawGroup = new THREE.Group();
      fawGroup.position.set(0, 0.8, 0);
      for (let f = 0; f < 8; f++) {
        const fMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.7 });
        const seg = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), fMat);
        seg.position.set((f - 4) * 0.18, 0, 0);
        fawGroup.add(seg);
      }
      whorlGroup.add(fawGroup);
      group.add(whorlGroup);
    }

    parent.add(group);
  };

  // 7. Harvesting & Scientific Storage Builder
  const buildHarvestingStorageScene = (parent: THREE.Group) => {
    const group = new THREE.Group();

    // Concrete APMC Warehouse floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 20),
      new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    group.add(floor);

    // Warehouse structural steel frame beams
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.6, roughness: 0.3 });
    for (let x = -8; x <= 8; x += 8) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 0.4), steelMat);
      pillar.position.set(x, 3.5, -6);
      group.add(pillar);
    }

    // Stacked Gunny Bags of harvested grain (Standard 50kg APMC Jute Bags)
    const juteMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.95 });
    const palletMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });

    // Wooden Pallets
    for (let p = -4; p <= 4; p += 4) {
      const pallet = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.25, 2.5), palletMat);
      pallet.position.set(p, 0.125, -1);
      group.add(pallet);

      // Stack bags in 4 layers
      for (let layer = 0; layer < 4; layer++) {
        for (let b = 0; b < 4; b++) {
          const bag = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.9), juteMat);
          const bx = p + (b % 2 === 0 ? -0.7 : 0.7);
          const bz = -1 + (b < 2 ? -0.5 : 0.5);
          bag.position.set(bx, 0.5 + layer * 0.48, bz);
          bag.castShadow = true;
          group.add(bag);
        }
      }
    }

    // Moisture Testing Station with Digital Moisture Meter & Sample pan
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.2, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 })
    );
    desk.position.set(-6, 0.6, 4);
    group.add(desk);

    // Digital grain moisture meter
    const meter = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x10b981 }) // Green instrument
    );
    meter.position.set(-6, 1.35, 4);
    group.add(meter);

    parent.add(group);
  };

  // 8. 3D Farm Financial Comparison Chart Builder
  const buildFinancialChartScene = (parent: THREE.Group) => {
    const group = new THREE.Group();

    // Dimensional chart base grid
    const gridBase = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.3, 8),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7 })
    );
    gridBase.position.y = -0.15;
    group.add(gridBase);

    // Filter top 5 crops for 3D bar comparison
    const topCrops = DHARWAD_CROPS.slice(0, 5);
    const maxVal = 110000; // For normalizing bar heights to max 6 units

    topCrops.forEach((crop, index) => {
      const xPos = -6 + index * 3.0;

      // Group for this crop's triad of bars (Cost, Gross, Net)
      const cropPillarGroup = new THREE.Group();
      cropPillarGroup.position.set(xPos, 0, 0);

      const costHeight = (crop.rainfed.cultivationCostInr / maxVal) * 6;
      const grossHeight = (crop.rainfed.grossIncomeInr / maxVal) * 6;
      const netHeight = Math.max(0.2, (crop.rainfed.netProfitInr / maxVal) * 6);

      // Bar 1: Cost (Red/Amber)
      const costMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4, metalness: 0.2 });
      const costBar = new THREE.Mesh(new THREE.BoxGeometry(0.6, costHeight, 0.6), costMat);
      costBar.position.set(-0.7, costHeight / 2, 0);
      costBar.castShadow = true;
      cropPillarGroup.add(costBar);

      // Bar 2: Gross Income (Blue)
      const grossMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4, metalness: 0.2 });
      const grossBar = new THREE.Mesh(new THREE.BoxGeometry(0.6, grossHeight, 0.6), grossMat);
      grossBar.position.set(0, grossHeight / 2, 0);
      grossBar.castShadow = true;
      cropPillarGroup.add(grossBar);

      // Bar 3: Net Profit (Emerald Green)
      const netMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4, metalness: 0.3 });
      const netBar = new THREE.Mesh(new THREE.BoxGeometry(0.6, netHeight, 0.6), netMat);
      netBar.position.set(0.7, netHeight / 2, 0);
      netBar.castShadow = true;
      cropPillarGroup.add(netBar);

      group.add(cropPillarGroup);
    });

    parent.add(group);
  };

  // Re-build active scene mode
  const refreshActiveScene = () => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Clear previous active group
    if (activeGroupRef.current) {
      scene.remove(activeGroupRef.current);
      // Recursively dispose geometries and materials
      activeGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    }

    const newGroup = new THREE.Group();
    activeGroupRef.current = newGroup;

    switch (currentMode) {
      case 'farmland':
        buildFarmlandScene(newGroup);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 16, 28);
          controlsRef.current?.target.set(0, 0, 0);
        }
        break;
      case 'soil_profile':
        buildSoilHorizonScene(newGroup);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 6, 16);
          controlsRef.current?.target.set(0, 4, 0);
        }
        break;
      case 'crop_growth':
        buildCropGrowthScene(newGroup, growthStage, activeCropId);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 3.5, 7.5);
          controlsRef.current?.target.set(0, 1.8, 0);
        }
        break;
      case 'root_moisture':
        buildRootMoistureScene(newGroup);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, -1, 14);
          controlsRef.current?.target.set(0, -3.5, 0);
        }
        break;
      case 'irrigation':
        buildIrrigationScene(newGroup);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 9, 14);
          controlsRef.current?.target.set(0, 0, 0);
        }
        break;
      case 'pest_inspection':
        buildPestInspectionScene(newGroup, activePest);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 2.5, 5.5);
          controlsRef.current?.target.set(0, 1.4, 0);
        }
        break;
      case 'harvesting':
        buildHarvestingStorageScene(newGroup);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 6, 14);
          controlsRef.current?.target.set(0, 1.5, 0);
        }
        break;
      case 'financial_chart':
        buildFinancialChartScene(newGroup);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 6, 14);
          controlsRef.current?.target.set(0, 2, 0);
        }
        break;
    }

    scene.add(newGroup);
    controlsRef.current?.update();
  };

  // Wireframe toggle
  useEffect(() => {
    if (!activeGroupRef.current) return;
    activeGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if ('wireframe' in m) {
              (m as any).wireframe = wireframe;
            }
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as any).wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Mode & Parameter changes
  useEffect(() => {
    refreshActiveScene();
  }, [currentMode, activeCropId, growthStage, activePest]);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per skill directives
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();
    isSoftwareGlRef.current = isSoftwareGl;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0a09); // Stone-950
    scene.fog = new THREE.FogExp2(0x0c0a09, 0.015);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 16, 28);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Mandatory PMREM RoomEnvironment for rich PBR lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-point lighting rig
    const keySun = new THREE.DirectionalLight(0xfffaed, 2.0);
    keySun.position.set(15, 30, 20);
    keySun.castShadow = !isSoftwareGl;
    keySun.shadow.mapSize.width = 1024;
    keySun.shadow.mapSize.height = 1024;
    keySun.shadow.bias = -0.0005;
    keySun.shadow.normalBias = 0.02;
    scene.add(keySun);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3f3f46, 0.7);
    scene.add(hemiLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minDistance = 3;
    controls.maxDistance = 75;
    controlsRef.current = controls;

    // Build initial scene
    refreshActiveScene();

    // Animation Loop with Software-WebGL afterDraw pacing guard
    let frameId = 0;
    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      // Drip animation in irrigation mode
      if (animatedWaterDropletsRef.current.length > 0) {
        animatedWaterDropletsRef.current.forEach((drop) => {
          drop.position.y -= (drop as any).fallSpeed || 0.01;
          if (drop.position.y <= 0.02) {
            drop.position.y = (drop as any).initialY || 0.14;
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isSoftwareGl) {
      afterDraw(animate);
    } else {
      frameId = requestAnimationFrame(animate);
    }
    animationFrameIdRef.current = frameId;

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Camera presets
  const setCameraView = (type: 'iso' | 'top' | 'close' | 'reset') => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (type) {
      case 'iso':
        camera.position.set(16, 16, 16);
        controls.target.set(0, 1, 0);
        break;
      case 'top':
        camera.position.set(0, 32, 0.1);
        controls.target.set(0, 0, 0);
        break;
      case 'close':
        camera.position.set(0, 2.5, 6);
        controls.target.set(0, 1.2, 0);
        break;
      case 'reset':
        camera.position.set(0, 16, 28);
        controls.target.set(0, 0, 0);
        break;
    }
    controls.update();
  };

  const modeDescriptions: Record<VisualMode, { en: string; kn: string; titleEn: string; titleKn: string }> = {
    farmland: {
      titleEn: 'Dharwad Agro-Landscape',
      titleKn: 'ಧಾರವಾಡ ಕೃಷಿ ಭೂದೃಶ್ಯ',
      en: 'Rolling Vertisol (Black Cotton) & Alfisol (Red Loam) terrain, contour bunding, farm pond (Krishi Honda), and crop canopy.',
      kn: 'ಕಪ್ಪು ಎರೆಭೂಮಿ ಹಾಗೂ ಕೆಂಪು ಮಸಾರಿ ಮಣ್ಣಿನ ಭೂದೃಶ್ಯ, ಬದು ನಿರ್ಮಾಣ, ಕೃಷಿ ಹೊಂಡ ಮತ್ತು ಬೆಳೆಯ ಸಾಲುಗಳು.'
    },
    soil_profile: {
      titleEn: 'Soil Horizon Profile',
      titleKn: 'ಮಣ್ಣಿನ ಸ್ತರಗಳ ನೋಟ (ಪ್ರೊಫೈಲ್)',
      en: 'Side-by-side vertical monolith: Deep Vertisol (Black soil with shrink-swell cracks & kankar) vs Alfisol (Red sandy loam).',
      kn: 'ಆಳವಾದ ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (ಎರೆಭೂಮಿ) ಮತ್ತು ಕೆಂಪು ಮಸಾರಿ ಮಣ್ಣಿನ ಸ್ತರಗಳು ಹಾಗೂ ಕ್ಯಾಲ್ಸಿಯಂ ಕಾಳುಗಳು.'
    },
    crop_growth: {
      titleEn: 'Plant Anatomy & Growth Stages',
      titleKn: 'ಸಸ್ಯ ರಚನೆ ಮತ್ತು ಬೆಳವಣಿಗೆ ಹಂತಗಳು',
      en: 'Procedural morphology progression from Seedling -> Vegetative -> Flowering -> Pod/Boll formation -> Maturity.',
      kn: 'ಸಸಿಯಿಂದ ಪ್ರಾರಂಭಿಸಿ ಕವಲೊಡೆಯುವಿಕೆ, ಹೂವಾಡುವಿಕೆ ಮತ್ತು ಕಾಯಿ/ಹತ್ತಿ ಬಿಡುವ ಹಂತಗಳ ವರೆಗಿನ 3D ಮಾದರಿ.'
    },
    root_moisture: {
      titleEn: 'Subsurface Root & Moisture Zones',
      titleKn: 'ಬೇರುಗಳ ಆಳ ಮತ್ತು ತೇವಾಂಶ ವಲಯ',
      en: 'Soil cross-section revealing deep taproot architecture extracting residual moisture from 0-30cm, 30-60cm, and 60-120cm subsoil.',
      kn: 'ಭೂಮಿಯ ಆಳಕ್ಕೆ ಇಳಿಯುವ ತಾಯಿಬೇರು ಮತ್ತು 0-30ಸೆಂ.ಮೀ, 30-60ಸೆಂ.ಮೀ ತೇವಾಂಶ ವಲಯಗಳ ಪಾರದರ್ಶಕ ನೋಟ.'
    },
    irrigation: {
      titleEn: 'Precision Drip & Micro-Irrigation',
      titleKn: 'ಹನಿ ನೀರಾವರಿ ಮತ್ತು ನೀರಿನ ಬಳಕೆ',
      en: 'LLDPE lateral lines with inline pressure-compensating drippers creating soil wetted moisture bulbs to save 45% water.',
      kn: 'ಲ್ಯಾಟರಲ್ ಪೈಪ್‌ಗಳು, ಡ್ರಿಪ್ಪರ್ ಹನಿಗಳು ಮತ್ತು ತೇವಾಂಶ ಉಳಿಸುವ ಸೂಕ್ಷ್ಮ ನೀರಾವರಿ ಪದ್ಧತಿಯ ಅನುಕರಣೆ.'
    },
    pest_inspection: {
      titleEn: '3D Pest & Pathology Inspection',
      titleKn: 'ಕೀಟ ಹಾಗೂ ರೋಗಗಳ 3D ತಪಾಸಣೆ',
      en: 'Close-up examination of Cotton Pink Bollworm, Gram Pod Borer, and Fall Armyworm whorl feeding with UASD IPM controls.',
      kn: 'ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು, ಕಡಲೆ ಕಾಯಿಕೊರೆಯುವ ಹುಳು ಮತ್ತು ಲದ್ದಿಹುಳುವಿನ ಸೂಕ್ಷ್ಮ 3D ಅವಲೋಕನ.'
    },
    harvesting: {
      titleEn: 'Harvest & Scientific Storage',
      titleKn: 'ಕೊಯ್ಲು ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಉಗ್ರಾಣ',
      en: 'APMC Dharwad standard jute gunny bags stacked on dunnage pallets with digital moisture probe testing (<10% safe moisture).',
      kn: 'ಧಾರವಾಡ ಎಪಿಎಂಸಿ ಮಾದರಿಯ ಗೋಣಿ ಚೀಲಗಳ ಜೋಡಣೆ ಮತ್ತು ತೇವಾಂಶ ಪರೀಕ್ಷಾ ಕೇಂದ್ರ.'
    },
    financial_chart: {
      titleEn: '3D Per-Acre Financial Pillars',
      titleKn: '3D ಎಕರೆವಾರು ಆರ್ಥಿಕ ಸ್ತಂಭಗಳು',
      en: 'Interactive 3D volumetric pillars comparing Cultivation Cost (Red), Gross Income (Blue), and Net Profit (Green) for top crops.',
      kn: 'ಉನ್ನತ ಬೆಳೆಗಳ ಕೃಷಿ ವೆಚ್ಚ (ಕೆಂಪು), ಒಟ್ಟು ವರಮಾನ (ನೀಲಿ) ಮತ್ತು ನಿವ್ವಳ ಲಾಭದ (ಹಸಿರು) 3D ಸ್ತಂಭ ನಕ್ಷೆ.'
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Scene Title & Mode Indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5 max-w-sm">
        <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-700/60 rounded-xl px-3.5 py-2 shadow-lg backdrop-blur-none">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <div>
            <h3 className="text-sm font-bold text-stone-100 leading-tight">
              {isKannada ? modeDescriptions[currentMode].titleKn : modeDescriptions[currentMode].titleEn}
            </h3>
            <p className="text-[11px] text-stone-400">
              {isKannada ? 'ಧಾರವಾಡ ಕೃಷಿ 3D ವೀಕ್ಷಣೆ' : 'Dharwad Agronomic 3D Studio'}
            </p>
          </div>
        </div>
        <p className="text-xs text-stone-300 bg-stone-950/80 px-3 py-1.5 rounded-lg border border-stone-800/80 leading-relaxed">
          {isKannada ? modeDescriptions[currentMode].kn : modeDescriptions[currentMode].en}
        </p>
      </div>

      {/* Top Right: Quick Camera View Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-stone-900/90 border border-stone-700/60 rounded-xl p-1.5 shadow-lg">
        <button
          onClick={() => setCameraView('iso')}
          title="Isometric View"
          className="px-2.5 py-1 text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
        >
          {isKannada ? 'ಕೋನ ನೋಟ' : 'Isometric'}
        </button>
        <button
          onClick={() => setCameraView('top')}
          title="Top-Down Plan View"
          className="px-2.5 py-1 text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
        >
          {isKannada ? 'ಮೇಲಿನ ನೋಟ' : 'Top-Down'}
        </button>
        <button
          onClick={() => setCameraView('close')}
          title="Close-Up Inspection"
          className="px-2.5 py-1 text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
        >
          {isKannada ? 'ಸಮೀಪ ನೋಟ' : 'Close-Up'}
        </button>
        <button
          onClick={() => setWireframe(!wireframe)}
          title="Toggle Wireframe"
          className={`p-1.5 rounded-lg transition ${wireframe ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:bg-stone-800'}`}
        >
          <Layers3 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setCameraView('reset')}
          title="Reset Camera"
          className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mode Specific Dynamic Context Bar (Crop growth / Pest selection) */}
      {currentMode === 'crop_growth' && (
        <div className="absolute top-20 left-4 z-10 bg-stone-900/90 border border-stone-800 p-2.5 rounded-xl shadow-xl flex items-center gap-3">
          <span className="text-xs font-semibold text-emerald-400">
            {isKannada ? 'ಬೆಳೆ:' : 'Crop:'}
          </span>
          <select
            value={activeCropId}
            onChange={(e) => setActiveCropId(e.target.value)}
            className="bg-stone-800 text-xs text-stone-100 rounded-lg px-2.5 py-1 border border-stone-700 outline-none"
          >
            <option value="cotton">Cotton / ಹತ್ತಿ</option>
            <option value="bengal_gram">Bengal Gram / ಕಡಲೆ</option>
            <option value="soybean">Soybean / ಸೋಯಾಬಿನ್</option>
            <option value="maize">Maize / ಮೆಕ್ಕೆಜೋಳ</option>
          </select>
          <div className="flex items-center gap-2 pl-2 border-l border-stone-700">
            <span className="text-xs text-stone-400">{isKannada ? 'ಹಂತ:' : 'Stage:'}</span>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={growthStage}
              onChange={(e) => setGrowthStage(parseInt(e.target.value))}
              className="w-24 accent-emerald-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-amber-300">
              {growthStage === 1 ? (isKannada ? 'ಮೊಳೆಕೆ' : 'Seedling') :
               growthStage === 2 ? (isKannada ? 'ಕವಲು' : 'Vegetative') :
               growthStage === 3 ? (isKannada ? 'ಹೂವು' : 'Flowering') :
               growthStage === 4 ? (isKannada ? 'ಕಾಯಿ/ಬೋಲ್' : 'Boll Formation') :
               (isKannada ? 'ಮಾಗುವಿಕೆ' : 'Maturity')}
            </span>
          </div>
        </div>
      )}

      {currentMode === 'pest_inspection' && (
        <div className="absolute top-20 left-4 z-10 bg-stone-900/90 border border-stone-800 p-2 rounded-xl shadow-xl flex items-center gap-2">
          <span className="text-xs font-semibold text-red-400">
            {isKannada ? 'ಕೀಟ:' : 'Pest Target:'}
          </span>
          <button
            onClick={() => setActivePest('pink_bollworm')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              activePest === 'pink_bollworm' ? 'bg-red-600 text-white' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isKannada ? 'ಗುಲಾಬಿ ಕಾಯಿಕೊರೆಯುವ ಹುಳು (ಹತ್ತಿ)' : 'Pink Bollworm (Cotton)'}
          </button>
          <button
            onClick={() => setActivePest('pod_borer')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              activePest === 'pod_borer' ? 'bg-red-600 text-white' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isKannada ? 'ಕಡಲೆ ಕಾಯಿಕೊರೆಯುವ ಹುಳು' : 'Gram Pod Borer (Chickpea)'}
          </button>
          <button
            onClick={() => setActivePest('fall_armyworm')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
              activePest === 'fall_armyworm' ? 'bg-red-600 text-white' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isKannada ? 'ಲದ್ದಿಹುಳು (ಮೆಕ್ಕೆಜೋಳ)' : 'Fall Armyworm (Maize)'}
          </button>
        </div>
      )}

      {/* Sleek Collapsible Bottom Dock per Three.js UX Directives */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl transition-all duration-300 ease-out"
        style={{ transform: dockCollapsed ? 'translate(-50%, calc(100% - 32px))' : 'translate(-50%, 0)' }}
      >
        {/* Collapse Toggle Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setDockCollapsed(!dockCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1 bg-stone-900 border-t border-x border-stone-700/80 rounded-t-xl text-stone-400 hover:text-stone-100 text-xs font-semibold shadow-md transition"
          >
            {dockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isKannada ? '3D ಮೆನು ವಿಸ್ತರಿಸಿ' : 'Show 3D Visual Controls'}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                <span>{isKannada ? 'ಮೆನು ಮರೆಮಾಡಿ' : 'Minimize Dock'}</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Bar */}
        <div className="bg-stone-900/95 border border-stone-700/80 rounded-2xl p-2.5 shadow-2xl backdrop-blur-none flex flex-wrap items-center justify-between gap-2">
          {/* 8 Mode Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => setCurrentMode('farmland')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'farmland'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಭೂದೃಶ್ಯ' : 'Farmland'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('soil_profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'soil_profile'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಮಣ್ಣಿನ ಸ್ತರಗಳು' : 'Soil Horizon'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('crop_growth')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'crop_growth'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಬೆಳೆ ಬೆಳವಣಿಗೆ' : 'Crop Stages'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('root_moisture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'root_moisture'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ತೇವಾಂಶ ಮತ್ತು ಬೇರು' : 'Root Moisture'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('irrigation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'irrigation'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isKannada ? 'ಹನಿ ನೀರಾವರಿ' : 'Micro-Drip'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('pest_inspection')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'pest_inspection'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Bug className="w-3.5 h-3.5 text-red-400" />
              <span>{isKannada ? 'ಕೀಟ ತಪಾಸಣೆ' : 'Pests & IPM'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('harvesting')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'harvesting'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Warehouse className="w-3.5 h-3.5" />
              <span>{isKannada ? 'ಕೊಯ್ಲು & ಉಗ್ರಾಣ' : 'Storage'}</span>
            </button>

            <button
              onClick={() => setCurrentMode('financial_chart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                currentMode === 'financial_chart'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{isKannada ? '3D ಆರ್ಥಿಕ ನಕ್ಷೆ' : '3D Financials'}</span>
            </button>
          </div>

          {/* Right helper text */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-400 pl-2 border-l border-stone-800">
            <span>🖱️ {isKannada ? 'ತಿರುಗಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Drag to Rotate'}</span>
            <span>•</span>
            <span>🔍 {isKannada ? 'ಜೂಮ್ ಮಾಡಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ' : 'Scroll to Zoom'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
