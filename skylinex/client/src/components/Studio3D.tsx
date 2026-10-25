import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Box, 
  Layers, 
  Sliders, 
  Sun, 
  Moon, 
  RotateCw, 
  Eye, 
  X, 
  Sparkles, 
  Check, 
  ChevronRight,
  ChevronLeft,
  Waves,
  Car,
  Trees,
  Grid,
  Palette,
  Home,
  SlidersHorizontal,
  Plus,
  Trash2,
  Maximize2,
  LayoutGrid,
  Move,
  GripVertical,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { ArchitecturalStyle, Language } from '../types';
import { ARCHITECTURAL_STYLES } from '../data/mockData';
import { translations } from '../i18n/translations';

interface Studio3DProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onRequestQuoteWithStyle: (styleName: string, floors: number) => void;
}

export interface PlacedRoom {
  id: string;
  name: string;
  zone: 'NW' | 'N' | 'NE' | 'W' | 'C' | 'E' | 'SW' | 'S' | 'SE';
  category: 'living' | 'kitchen' | 'bed' | 'bath' | 'puja' | 'theatre' | 'dining' | 'office' | 'balcony';
  color: string;
  dimensions: string;
  vastuHint: string;
}

export const ZONES = [
  { id: 'NW', name: 'North-West', vastu: 'Vayu • Kids / Air', short: 'NW' },
  { id: 'N', name: 'North', vastu: 'Kubera • Wealth & Living', short: 'N' },
  { id: 'NE', name: 'North-East', vastu: 'Ishan • Divine & Puja', short: 'NE' },
  { id: 'W', name: 'West', vastu: 'Varuna • Dining & Study', short: 'W' },
  { id: 'C', name: 'Center', vastu: 'Brahmasthan • Open Core', short: 'C' },
  { id: 'E', name: 'East', vastu: 'Indra • Sun & Verandah', short: 'E' },
  { id: 'SW', name: 'South-West', vastu: 'Nairutya • Master Suite', short: 'SW' },
  { id: 'S', name: 'South', vastu: 'Yama • Stairs & Strength', short: 'S' },
  { id: 'SE', name: 'South-East', vastu: 'Agni • Kitchen / Fire', short: 'SE' },
] as const;

export const ROOM_TEMPLATES = [
  { name: 'Modular Island Kitchen', category: 'kitchen' as const, color: '#EA580C', dimensions: '16ft x 14ft', vastuHint: 'Auspicious in Agni (SE) 🔥' },
  { name: 'Master Bedroom Suite', category: 'bed' as const, color: '#7C3AED', dimensions: '20ft x 16ft', vastuHint: 'Prime in Nairutya (SW) 👑' },
  { name: 'Puja Sanctum', category: 'puja' as const, color: '#D97706', dimensions: '8ft x 8ft', vastuHint: 'Divine in Ishanya (NE) 🪔' },
  { name: 'Grand Living Hall', category: 'living' as const, color: '#2563EB', dimensions: '22ft x 16ft', vastuHint: 'Welcoming light in North (N) ☀️' },
  { name: 'Formal Dining Court', category: 'dining' as const, color: '#059669', dimensions: '14ft x 12ft', vastuHint: 'Harmony in West (W) 🍽️' },
  { name: 'Acoustic Cinema Theatre', category: 'theatre' as const, color: '#DC2626', dimensions: '20ft x 15ft', vastuHint: 'Acoustic haven in West (W) 🎬' },
  { name: 'Executive Home Office', category: 'office' as const, color: '#0284C7', dimensions: '14ft x 12ft', vastuHint: 'Focus in North (N) / NE 📚' },
  { name: 'Children Bedroom', category: 'bed' as const, color: '#DB2777', dimensions: '15ft x 13ft', vastuHint: 'Vibrant in Vayu (NW) 🎈' },
  { name: 'Open Terrace Solarium', category: 'balcony' as const, color: '#16A34A', dimensions: '20ft x 12ft', vastuHint: 'Fresh breezes in East (E) 🌿' },
  { name: 'Luxury Spa Ensuite Bath', category: 'bath' as const, color: '#475569', dimensions: '10ft x 8ft', vastuHint: 'Optimal in NW / West 🚿' },
];

export const Studio3D: React.FC<Studio3DProps> = ({
  isOpen,
  onClose,
  language,
  onRequestQuoteWithStyle,
}) => {
  const t = translations[language];

  // Studio State
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [floorsCount, setFloorsCount] = useState(3);
  const [separation, setSeparation] = useState(0.8);
  const [lightingMode, setLightingMode] = useState<'day' | 'night' | 'sunset'>('day');
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Left Long Vertical Collapsible Sidebar State
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSidebarMenu, setActiveSidebarMenu] = useState<'styles' | 'amenities' | 'rooms' | 'floors'>('floors');
  const [showAdvancedVastu, setShowAdvancedVastu] = useState(false);

  // Interactive Amenities & House Components
  const [hasSwimmingPool, setHasSwimmingPool] = useState(true);
  const [hasCarPorch, setHasCarPorch] = useState(true);
  const [hasSolarRooftop, setHasSolarRooftop] = useState(true);
  const [hasGardenLawn, setHasGardenLawn] = useState(true);
  const [hasElevatorShaft, setHasElevatorShaft] = useState(true);
  const [hasTerracePergola, setHasTerracePergola] = useState(true);

  // Floor-by-Floor Drag-and-Drop Room Layout Customizer State
  const [editingFloor, setEditingFloor] = useState<number>(1);
  const [draggedRoomId, setDraggedRoomId] = useState<string | null>(null);

  const [floorLayouts, setFloorLayouts] = useState<Record<number, PlacedRoom[]>>({
    1: [
      { id: 'r1-n', name: 'Grand Living Hall', zone: 'N', category: 'living', color: '#3B82F6', dimensions: '22ft x 16ft', vastuHint: 'Prosperity & Welcoming Sunlight ☀️' },
      { id: 'r1-se', name: 'Gourmet Modular Kitchen', zone: 'SE', category: 'kitchen', color: '#F97316', dimensions: '16ft x 14ft', vastuHint: 'Agni Corner: Auspicious for Cooking & Fire 🔥' },
      { id: 'r1-w', name: 'Formal Dining Court', zone: 'W', category: 'dining', color: '#10B981', dimensions: '14ft x 12ft', vastuHint: 'Peaceful Family Dining 🍽️' },
      { id: 'r1-ne', name: 'Puja Sanctum', zone: 'NE', category: 'puja', color: '#F59E0B', dimensions: '8ft x 8ft', vastuHint: 'Ishan: Pure Positive Energy 🪔' },
      { id: 'r1-sw', name: 'Guest Bedroom Suite', zone: 'SW', category: 'bed', color: '#8B5CF6', dimensions: '16ft x 14ft', vastuHint: 'Earth Grounding & Rest 🛏️' },
    ],
    2: [
      { id: 'r2-sw', name: 'Master Bedroom Suite', zone: 'SW', category: 'bed', color: '#8B5CF6', dimensions: '20ft x 16ft', vastuHint: 'Nairutya: Prime Master Bedroom Zone 👑' },
      { id: 'r2-nw', name: 'Children Bedroom', zone: 'NW', category: 'bed', color: '#EC4899', dimensions: '16ft x 14ft', vastuHint: 'Vayu: Fresh Air & Playful Energy 🎈' },
      { id: 'r2-c', name: 'Family Lounge', zone: 'C', category: 'living', color: '#3B82F6', dimensions: '16ft x 14ft', vastuHint: 'Central Family Bonding 🛋️' },
      { id: 'r2-ne', name: 'Study & Library', zone: 'NE', category: 'office', color: '#06B6D4', dimensions: '12ft x 10ft', vastuHint: 'Clarity & High Focus 📚' },
    ],
    3: [
      { id: 'r3-w', name: 'Acoustic Home Cinema', zone: 'W', category: 'theatre', color: '#DC2626', dimensions: '22ft x 16ft', vastuHint: 'Acoustic Sound Haven 🎬' },
      { id: 'r3-e', name: 'Open Terrace Solarium', zone: 'E', category: 'balcony', color: '#10B981', dimensions: '24ft x 14ft', vastuHint: 'Morning Sun & Stargazing 🌿' },
    ]
  });

  const handleDragStart = (e: React.DragEvent, roomId: string) => {
    setDraggedRoomId(roomId);
    e.dataTransfer.setData('text/plain', roomId);
  };

  const handleDropOnZone = (targetZone: 'NW' | 'N' | 'NE' | 'W' | 'C' | 'E' | 'SW' | 'S' | 'SE') => {
    if (!draggedRoomId) return;
    setFloorLayouts(prev => {
      const currentRooms = prev[editingFloor] || [];
      const movingRoom = currentRooms.find(r => r.id === draggedRoomId);
      if (!movingRoom) return prev;

      const roomInTarget = currentRooms.find(r => r.zone === targetZone);
      let updatedRooms: PlacedRoom[];

      if (roomInTarget) {
        updatedRooms = currentRooms.map(r => {
          if (r.id === movingRoom.id) return { ...r, zone: targetZone };
          if (r.id === roomInTarget.id) return { ...r, zone: movingRoom.zone };
          return r;
        });
      } else {
        updatedRooms = currentRooms.map(r => 
          r.id === movingRoom.id ? { ...r, zone: targetZone } : r
        );
      }

      return { ...prev, [editingFloor]: updatedRooms };
    });
    setDraggedRoomId(null);
  };

  const handleMoveRoom = (roomId: string, newZone: 'NW' | 'N' | 'NE' | 'W' | 'C' | 'E' | 'SW' | 'S' | 'SE') => {
    setFloorLayouts(prev => {
      const currentRooms = prev[editingFloor] || [];
      const movingRoom = currentRooms.find(r => r.id === roomId);
      if (!movingRoom) return prev;

      const roomInTarget = currentRooms.find(r => r.zone === newZone);
      let updatedRooms: PlacedRoom[];

      if (roomInTarget) {
        updatedRooms = currentRooms.map(r => {
          if (r.id === movingRoom.id) return { ...r, zone: newZone };
          if (r.id === roomInTarget.id) return { ...r, zone: movingRoom.zone };
          return r;
        });
      } else {
        updatedRooms = currentRooms.map(r => 
          r.id === movingRoom.id ? { ...r, zone: newZone } : r
        );
      }

      return { ...prev, [editingFloor]: updatedRooms };
    });
  };

  const handleAddRoom = (template: { name: string; category: any; color: string; dimensions: string; vastuHint: string }) => {
    const currentRooms = floorLayouts[editingFloor] || [];
    const usedZones = currentRooms.map(r => r.zone);
    const availableZone = (['NW', 'N', 'NE', 'W', 'C', 'E', 'SW', 'S', 'SE'] as const).find(z => !usedZones.includes(z));

    if (!availableZone) {
      alert('All 9 zones on this floor are occupied! Please remove or swap a room.');
      return;
    }

    const newRoom: PlacedRoom = {
      id: `r-${Date.now().toString().slice(-4)}`,
      name: template.name,
      zone: availableZone,
      category: template.category,
      color: template.color,
      dimensions: template.dimensions,
      vastuHint: template.vastuHint
    };

    setFloorLayouts(prev => ({
      ...prev,
      [editingFloor]: [...(prev[editingFloor] || []), newRoom]
    }));
  };

  const handleRemoveRoom = (roomId: string) => {
    setFloorLayouts(prev => ({
      ...prev,
      [editingFloor]: (prev[editingFloor] || []).filter(r => r.id !== roomId)
    }));
  };

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const houseGroupRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  const currentStyle = ARCHITECTURAL_STYLES[selectedStyleIndex] || ARCHITECTURAL_STYLES[0];

  // Setup Three.js Scene
  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.012);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(32, 24, 32);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 10;
    controls.maxDistance = 90;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x94a3b8, 0.85);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.5);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    const d = 30;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Master Podium (Ground Pad)
    const groundGeo = new THREE.CylinderGeometry(28, 29, 0.8, 48);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.4;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(44, 44, 0xcbd5e1, 0xf1f5f9);
    grid.position.y = 0.02;
    scene.add(grid);

    // House Model Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);
    houseGroupRef.current = houseGroup;

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) container.innerHTML = '';
    };
  }, [isOpen]);

  // Lighting Mode (Day / Night / Sunset)
  useEffect(() => {
    if (!sceneRef.current || !dirLightRef.current || !hemiLightRef.current) return;

    if (lightingMode === 'night') {
      sceneRef.current.background = new THREE.Color(0x0f172a);
      sceneRef.current.fog = new THREE.FogExp2(0x0f172a, 0.015);
      hemiLightRef.current.color.setHex(0x1e293b);
      hemiLightRef.current.groundColor.setHex(0x020617);
      hemiLightRef.current.intensity = 0.35;
      dirLightRef.current.color.setHex(0x38bdf8);
      dirLightRef.current.intensity = 0.45;
      dirLightRef.current.position.set(-20, 30, -20);
    } else if (lightingMode === 'sunset') {
      sceneRef.current.background = new THREE.Color(0xfef3c7);
      sceneRef.current.fog = new THREE.FogExp2(0xfef3c7, 0.012);
      hemiLightRef.current.color.setHex(0xfb923c);
      hemiLightRef.current.groundColor.setHex(0x78350f);
      hemiLightRef.current.intensity = 0.9;
      dirLightRef.current.color.setHex(0xf97316);
      dirLightRef.current.intensity = 1.3;
      dirLightRef.current.position.set(40, 20, 15);
    } else {
      sceneRef.current.background = new THREE.Color(0xf8fafc);
      sceneRef.current.fog = new THREE.FogExp2(0xf8fafc, 0.01);
      hemiLightRef.current.color.setHex(0xffffff);
      hemiLightRef.current.groundColor.setHex(0x94a3b8);
      hemiLightRef.current.intensity = 0.85;
      dirLightRef.current.color.setHex(0xfff7ed);
      dirLightRef.current.intensity = 1.5;
      dirLightRef.current.position.set(30, 45, 25);
    }
  }, [lightingMode]);

  // Auto-Rotate
  useEffect(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // Procedural House & Amenities Generator
  useEffect(() => {
    if (!houseGroupRef.current) return;

    const group = houseGroupRef.current;
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const style = currentStyle;
    const floorH = 2.8;
    const baseW = 13;
    const baseD = 11;

    const wallColorHex = new THREE.Color(style.wallColor || '#ffffff');
    const accentColorHex = new THREE.Color(style.accentColor || '#2563EB');
    const isNight = lightingMode === 'night';
    const glassColorHex = isNight ? new THREE.Color(0xfef08a) : new THREE.Color(0x38bdf8);

    // Materials
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: wallColorHex,
      roughness: 0.45,
      metalness: 0.05,
      wireframe: isWireframe
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: accentColorHex,
      roughness: 0.35,
      metalness: 0.2,
      wireframe: isWireframe
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: glassColorHex,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: isNight ? 0.95 : 0.65,
      emissive: isNight ? glassColorHex : 0x000000,
      emissiveIntensity: isNight ? 0.7 : 0.0,
      wireframe: isWireframe
    });

    const slabMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf1f5f9),
      roughness: 0.5,
      metalness: 0.1,
      wireframe: isWireframe
    });

    // 1. Build House Levels (1 - 10 Floors with separation)
    for (let f = 0; f < floorsCount; f++) {
      const floorGroup = new THREE.Group();
      const currentY = f * (floorH + separation);

      // RCC Deck Slab
      const slabGeo = new THREE.BoxGeometry(baseW + 1.4, 0.4, baseD + 1.4);
      const slabMesh = new THREE.Mesh(slabGeo, slabMaterial);
      slabMesh.position.y = 0.2;
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      floorGroup.add(slabMesh);

      // Living Block
      const isTopFloor = f === floorsCount - 1;
      const isGround = f === 0;
      const blockW = isTopFloor ? baseW - 2 : baseW;
      const blockD = isTopFloor ? baseD - 1.5 : baseD;

      // Structural Perimeter Walls (Left, Right, Rear) - Keeps interior visible through glass facade & exploded view
      const wallThick = 0.35;
      const wallHeight = floorH - 0.4;
      const wallY = floorH / 2 + 0.2;

      // Rear Wall
      const rearGeo = new THREE.BoxGeometry(blockW, wallHeight, wallThick);
      const rearWall = new THREE.Mesh(rearGeo, wallMaterial);
      rearWall.position.set(0, wallY, -blockD / 2 + wallThick / 2);
      rearWall.castShadow = true;
      rearWall.receiveShadow = true;
      floorGroup.add(rearWall);

      // Left Wall
      const sideGeo = new THREE.BoxGeometry(wallThick, wallHeight, blockD);
      const leftWall = new THREE.Mesh(sideGeo, wallMaterial);
      leftWall.position.set(-blockW / 2 + wallThick / 2, wallY, 0);
      leftWall.castShadow = true;
      leftWall.receiveShadow = true;
      floorGroup.add(leftWall);

      // Right Wall
      const rightWall = new THREE.Mesh(sideGeo, wallMaterial);
      rightWall.position.set(blockW / 2 - wallThick / 2, wallY, 0);
      rightWall.castShadow = true;
      rightWall.receiveShadow = true;
      floorGroup.add(rightWall);

      // Interior Floor Screed Pad
      const innerFloorGeo = new THREE.BoxGeometry(blockW - 0.7, 0.05, blockD - 0.7);
      const innerFloorMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
      const innerFloor = new THREE.Mesh(innerFloorGeo, innerFloorMat);
      innerFloor.position.set(0, 0.42, 0);
      innerFloor.receiveShadow = true;
      floorGroup.add(innerFloor);

      // 3D Procedural Rooms Placed on this Floor Level
      const currentFloorRooms = floorLayouts[f + 1] || [];
      const cellW = (blockW - 1.2) / 3;
      const cellD = (blockD - 1.2) / 3;
      const zoneCoords: Record<string, { x: number; z: number }> = {
        NW: { x: -cellW, z: -cellD },
        N:  { x: 0,      z: -cellD },
        NE: { x: cellW,  z: -cellD },
        W:  { x: -cellW, z: 0 },
        C:  { x: 0,      z: 0 },
        E:  { x: cellW,  z: 0 },
        SW: { x: -cellW, z: cellD },
        S:  { x: 0,      z: cellD },
        SE: { x: cellW,  z: cellD },
      };

      currentFloorRooms.forEach(room => {
        const coord = zoneCoords[room.zone] || { x: 0, z: 0 };
        const roomGroup = new THREE.Group();
        roomGroup.position.set(coord.x, 0.45, coord.z);

        // Zone Rug / Floor Mat
        const rugGeo = new THREE.BoxGeometry(cellW * 0.88, 0.06, cellD * 0.88);
        const rugMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(room.color || '#3b82f6'),
          roughness: 0.6,
          metalness: 0.1
        });
        const rugMesh = new THREE.Mesh(rugGeo, rugMat);
        rugMesh.position.y = 0.03;
        rugMesh.receiveShadow = true;
        roomGroup.add(rugMesh);

        // 3D Interior Architecture Feature Volume per Category
        const itemMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(room.color || '#64748b'),
          roughness: 0.35,
          metalness: 0.15
        });

        if (room.category === 'kitchen') {
          // Modular Kitchen Counter + Kitchen Island
          const counterGeo = new THREE.BoxGeometry(cellW * 0.65, 0.85, cellD * 0.35);
          const counterMesh = new THREE.Mesh(counterGeo, itemMat);
          counterMesh.position.set(0, 0.42, -cellD * 0.15);
          counterMesh.castShadow = true;
          roomGroup.add(counterMesh);

          const islandGeo = new THREE.BoxGeometry(cellW * 0.4, 0.8, cellD * 0.25);
          const islandMesh = new THREE.Mesh(islandGeo, accentMaterial);
          islandMesh.position.set(0, 0.4, cellD * 0.2);
          islandMesh.castShadow = true;
          roomGroup.add(islandMesh);
        } else if (room.category === 'bed') {
          // King Bed Suite with Headboard
          const bedGeo = new THREE.BoxGeometry(cellW * 0.5, 0.5, cellD * 0.6);
          const bedMesh = new THREE.Mesh(bedGeo, itemMat);
          bedMesh.position.set(0, 0.25, 0);
          bedMesh.castShadow = true;
          roomGroup.add(bedMesh);

          const headGeo = new THREE.BoxGeometry(cellW * 0.52, 0.85, 0.12);
          const headMesh = new THREE.Mesh(headGeo, accentMaterial);
          headMesh.position.set(0, 0.42, -cellD * 0.28);
          headMesh.castShadow = true;
          roomGroup.add(headMesh);
        } else if (room.category === 'living') {
          // Living Lounge Sofa & Coffee Table
          const sofaGeo = new THREE.BoxGeometry(cellW * 0.7, 0.55, cellD * 0.32);
          const sofaMesh = new THREE.Mesh(sofaGeo, itemMat);
          sofaMesh.position.set(0, 0.27, -cellD * 0.15);
          sofaMesh.castShadow = true;
          roomGroup.add(sofaMesh);

          const tableGeo = new THREE.CylinderGeometry(cellW * 0.16, cellW * 0.16, 0.3, 16);
          const tableMesh = new THREE.Mesh(tableGeo, accentMaterial);
          tableMesh.position.set(0, 0.15, cellD * 0.18);
          tableMesh.castShadow = true;
          roomGroup.add(tableMesh);
        } else if (room.category === 'puja') {
          // Auspicious Sanctum Temple Mandir Pillar / Altar
          const altarGeo = new THREE.BoxGeometry(cellW * 0.35, 1.1, cellD * 0.35);
          const altarMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.4 });
          const altarMesh = new THREE.Mesh(altarGeo, altarMat);
          altarMesh.position.set(0, 0.55, 0);
          altarMesh.castShadow = true;
          roomGroup.add(altarMesh);

          const diya = new THREE.PointLight(0xf59e0b, 0.9, 4);
          diya.position.set(0, 1.2, 0);
          roomGroup.add(diya);
        } else if (room.category === 'theatre') {
          // Theatre Seating + Screen
          const seatGeo = new THREE.BoxGeometry(cellW * 0.65, 0.55, cellD * 0.28);
          const seatMesh = new THREE.Mesh(seatGeo, itemMat);
          seatMesh.position.set(0, 0.27, cellD * 0.15);
          roomGroup.add(seatMesh);

          const scrGeo = new THREE.BoxGeometry(cellW * 0.75, 0.95, 0.06);
          const scrMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
          const scrMesh = new THREE.Mesh(scrGeo, scrMat);
          scrMesh.position.set(0, 0.75, -cellD * 0.3);
          roomGroup.add(scrMesh);
        } else {
          // Study / Dining / Bath
          const furnGeo = new THREE.BoxGeometry(cellW * 0.5, 0.7, cellD * 0.38);
          const furnMesh = new THREE.Mesh(furnGeo, itemMat);
          furnMesh.position.set(0, 0.35, 0);
          furnMesh.castShadow = true;
          roomGroup.add(furnMesh);
        }

        // Zone Boundary Wire
        const boundGeo = new THREE.BoxGeometry(cellW * 0.94, 0.04, cellD * 0.94);
        const boundMat = new THREE.MeshBasicMaterial({ 
          color: f + 1 === editingFloor ? 0x2563eb : 0xcbd5e1,
          wireframe: true 
        });
        const boundMesh = new THREE.Mesh(boundGeo, boundMat);
        boundMesh.position.set(0, 0.02, 0);
        roomGroup.add(boundMesh);

        floorGroup.add(roomGroup);
      });

      // Active Floor Accent Ring if Currently Being Custom-Edited
      if (f + 1 === editingFloor) {
        const ringGeo = new THREE.BoxGeometry(blockW + 0.6, 0.1, blockD + 0.6);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(0, 0.3, 0);
        floorGroup.add(ringMesh);
      }

      // Glass Curtain Facade
      const glassGeo = new THREE.BoxGeometry(blockW * 0.82, floorH * 0.72, 0.22);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      glassMesh.position.set(0, floorH / 2 + 0.2, blockD / 2 + 0.08);
      floorGroup.add(glassMesh);

      // Cantilevered Balconies on Upper Floors
      if (!isGround) {
        const balcGeo = new THREE.BoxGeometry(blockW * 0.75, 0.25, 2.4);
        const balcMesh = new THREE.Mesh(balcGeo, slabMaterial);
        balcMesh.position.set(0, 0.3, blockD / 2 + 1.2);
        balcMesh.castShadow = true;
        balcMesh.receiveShadow = true;
        floorGroup.add(balcMesh);

        // Glass Railing
        const railGeo = new THREE.BoxGeometry(blockW * 0.75, 0.9, 0.1);
        const railMesh = new THREE.Mesh(railGeo, glassMaterial);
        railMesh.position.set(0, 0.85, blockD / 2 + 2.35);
        floorGroup.add(railMesh);
      }

      // Vertical Columns
      const col1Geo = new THREE.BoxGeometry(0.5, floorH, 0.8);
      const col1 = new THREE.Mesh(col1Geo, accentMaterial);
      col1.position.set(-blockW / 2 - 0.2, floorH / 2 + 0.2, blockD / 2);
      floorGroup.add(col1);

      const col2 = col1.clone();
      col2.position.x = blockW / 2 + 0.2;
      floorGroup.add(col2);

      // Roof Elements on Top Floor
      if (isTopFloor) {
        if (style.roofType === 'sloped') {
          const roofGeo = new THREE.ConeGeometry(baseW * 0.8, 3.5, 4);
          const roofMat = new THREE.MeshStandardMaterial({ color: accentColorHex, roughness: 0.6, wireframe: isWireframe });
          const roofMesh = new THREE.Mesh(roofGeo, roofMat);
          roofMesh.rotation.y = Math.PI / 4;
          roofMesh.position.set(0, floorH + 1.8, 0);
          roofMesh.castShadow = true;
          floorGroup.add(roofMesh);
        } else {
          // Flat Parapet
          const parapetGeo = new THREE.BoxGeometry(blockW + 0.4, 0.8, blockD + 0.4);
          const parapetMesh = new THREE.Mesh(parapetGeo, wallMaterial);
          parapetMesh.position.set(0, floorH + 0.4, 0);
          floorGroup.add(parapetMesh);

          // Pergola
          if (hasTerracePergola) {
            const pergolaGeo = new THREE.BoxGeometry(blockW * 0.55, 0.18, blockD * 0.55);
            const pergolaMesh = new THREE.Mesh(pergolaGeo, accentMaterial);
            pergolaMesh.position.set(0, floorH + 1.9, 0);
            floorGroup.add(pergolaMesh);
          }

          // Solar Rooftop Panels
          if (hasSolarRooftop) {
            const solarMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.8, roughness: 0.2 });
            for (let s = -2; s <= 2; s += 2) {
              const panelGeo = new THREE.BoxGeometry(1.6, 0.1, 2.2);
              const panelMesh = new THREE.Mesh(panelGeo, solarMat);
              panelMesh.rotation.x = -Math.PI / 12;
              panelMesh.position.set(s * 1.5, floorH + 0.9, -blockD / 4);
              floorGroup.add(panelMesh);
            }
          }
        }
      }

      floorGroup.position.y = currentY;
      group.add(floorGroup);
    }

    // 2. Elevator Glass Shaft
    if (hasElevatorShaft) {
      const shaftH = floorsCount * (floorH + separation) + 1.5;
      const shaftGeo = new THREE.BoxGeometry(2.4, shaftH, 2.4);
      const shaftMesh = new THREE.Mesh(shaftGeo, glassMaterial);
      shaftMesh.position.set(-baseW / 2 - 1.4, shaftH / 2, -baseD / 4);
      shaftMesh.castShadow = true;
      group.add(shaftMesh);
    }

    // 3. Swimming Pool Amenity
    if (hasSwimmingPool) {
      const poolW = 9;
      const poolD = 5;
      const poolFrameGeo = new THREE.BoxGeometry(poolW + 0.8, 0.3, poolD + 0.8);
      const poolFrame = new THREE.Mesh(poolFrameGeo, slabMaterial);
      poolFrame.position.set(baseW / 2 + poolW / 2 + 1.8, 0.15, 0);
      group.add(poolFrame);

      const waterGeo = new THREE.PlaneGeometry(poolW, poolD);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.85
      });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.rotation.x = -Math.PI / 2;
      water.position.set(baseW / 2 + poolW / 2 + 1.8, 0.28, 0);
      group.add(water);
    }

    // 4. Car Porch & Garage
    if (hasCarPorch) {
      const porchW = 6.5;
      const porchD = 6;
      const porchRoofGeo = new THREE.BoxGeometry(porchW, 0.25, porchD);
      const porchRoof = new THREE.Mesh(porchRoofGeo, accentMaterial);
      porchRoof.position.set(-baseW / 2 - porchW / 2 + 1, 2.8, baseD / 2 + 1);
      porchRoof.castShadow = true;
      group.add(porchRoof);

      // Steel pillars for porch
      const pColGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.8);
      const pCol1 = new THREE.Mesh(pColGeo, accentMaterial);
      pCol1.position.set(-baseW / 2 - porchW + 1.5, 1.4, baseD / 2 + porchD / 2);
      group.add(pCol1);

      // Abstract luxury car representation
      const carBodyGeo = new THREE.BoxGeometry(2.4, 1.1, 4.2);
      const carMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });
      const car = new THREE.Mesh(carBodyGeo, carMat);
      car.position.set(-baseW / 2 - porchW / 2 + 1.5, 0.6, baseD / 2 + 1);
      car.castShadow = true;
      group.add(car);
    }

    // 5. Green Front Lawn Pad
    if (hasGardenLawn) {
      const lawnGeo = new THREE.BoxGeometry(baseW + 14, 0.1, 7);
      const lawnMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.95 });
      const lawn = new THREE.Mesh(lawnGeo, lawnMat);
      lawn.position.set(0, 0.05, baseD / 2 + 4.5);
      lawn.receiveShadow = true;
      group.add(lawn);
    }

    // Camera Target Adjustment
    const totalHeight = floorsCount * (floorH + separation);
    if (controlsRef.current) controlsRef.current.target.set(0, totalHeight / 2.5, 0);

  }, [
    selectedStyleIndex, 
    floorsCount, 
    separation, 
    isWireframe, 
    lightingMode, 
    hasSwimmingPool, 
    hasCarPorch, 
    hasSolarRooftop, 
    hasGardenLawn, 
    hasElevatorShaft, 
    hasTerracePergola,
    floorLayouts,
    editingFloor
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full h-[96vh] max-w-7xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Top Floating App Bar */}
        <div className="p-4 bg-white/95 border-b border-slate-200 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black">
              <Box className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Kontractor 3D Real House Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                  {currentStyle.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Procedural 1-10 Floors • Y-Axis Exploded Floor Planner • Real House Customizer
              </p>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center gap-2">
            {/* Lighting Mode Selector */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                onClick={() => setLightingMode('day')}
                className={`p-1.5 rounded-lg transition-all ${
                  lightingMode === 'day' ? 'bg-white text-amber-500 shadow-xs' : 'text-slate-400'
                }`}
                title="Bright Daylight"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLightingMode('sunset')}
                className={`p-1.5 rounded-lg transition-all ${
                  lightingMode === 'sunset' ? 'bg-white text-orange-500 shadow-xs' : 'text-slate-400'
                }`}
                title="Golden Sunset"
              >
                <Sun className="w-4 h-4 text-orange-500" />
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`p-1.5 rounded-lg transition-all ${
                  lightingMode === 'night' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400'
                }`}
                title="Night Warm Window Glow"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                autoRotate ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}
              title="Toggle Auto Rotation"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsWireframe(!isWireframe)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                isWireframe ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}
              title="Inspect Structural Framing"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Center Body: Left Vertical Sidebar + Main Canvas */}
        <div className="relative flex-1 flex overflow-hidden">
          
          {/* ================= LEFT SLEEK USER-FRIENDLY SIDEBAR ================= */}
          <div
            className={`relative h-full bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-20 ${
              sidebarExpanded ? 'w-80 sm:w-96' : 'w-14'
            }`}
          >
            {/* Collapse/Expand Toggle Header */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              {sidebarExpanded && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                    3D
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 leading-none">
                      3D House Studio
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">
                      सरल 3D घर डिज़ाइनर
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="p-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shadow-xs transition-colors mx-auto sm:mx-0"
                title={sidebarExpanded ? 'Collapse' : 'Expand'}
              >
                {sidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>

            {/* If Collapsed: Vertical Icon Strip */}
            {!sidebarExpanded && (
              <div className="flex-1 py-4 flex flex-col items-center space-y-4">
                <button
                  onClick={() => { setActiveSidebarMenu('floors'); setSidebarExpanded(true); }}
                  className={`p-2.5 rounded-xl transition-all ${activeSidebarMenu === 'floors' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  title="मंजिलें (Floors)"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setActiveSidebarMenu('amenities'); setSidebarExpanded(true); }}
                  className={`p-2.5 rounded-xl transition-all ${activeSidebarMenu === 'amenities' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  title="सुविधाएं (Amenities)"
                >
                  <Waves className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setActiveSidebarMenu('styles'); setSidebarExpanded(true); }}
                  className={`p-2.5 rounded-xl transition-all ${activeSidebarMenu === 'styles' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  title="डिज़ाइन (Styles)"
                >
                  <Home className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setActiveSidebarMenu('rooms'); setSidebarExpanded(true); }}
                  className={`p-2.5 rounded-xl transition-all ${activeSidebarMenu === 'rooms' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'}`}
                  title="कमरे (Rooms)"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* When Expanded: 4 Clear Horizontal Tabs & Friendly Controls */}
            {sidebarExpanded && (
              <>
                {/* 4 Wide Horizontal Tabs */}
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-100 border-b border-slate-200 shrink-0">
                  <button
                    onClick={() => setActiveSidebarMenu('floors')}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      activeSidebarMenu === 'floors'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60 font-medium'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">मंजिलें</span>
                  </button>

                  <button
                    onClick={() => setActiveSidebarMenu('amenities')}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      activeSidebarMenu === 'amenities'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60 font-medium'
                    }`}
                  >
                    <Waves className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">सुविधाएं</span>
                  </button>

                  <button
                    onClick={() => setActiveSidebarMenu('styles')}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      activeSidebarMenu === 'styles'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60 font-medium'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">डिज़ाइन</span>
                  </button>

                  <button
                    onClick={() => setActiveSidebarMenu('rooms')}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      activeSidebarMenu === 'rooms'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60 font-medium'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">कमरे</span>
                  </button>
                </div>

                {/* Tab Content Body (Super Simple & Intuitive) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  
                  {/* TAB 1: FLOORS & EXPLODED VIEW */}
                  {activeSidebarMenu === 'floors' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          कितनी मंजिल बनानी है? (Floors)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          अपनी पसंद की मंजिल पर टैप करें, घर का 3D मॉडल तुरंत बदल जाएगा।
                        </p>
                      </div>

                      {/* 4 Big Floor Selection Cards */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { count: 1, label: '1 मंजिल', sub: 'Ground Villa', badge: 'Single Story' },
                          { count: 2, label: '2 मंजिल (G+1)', sub: 'Duplex Home', badge: '🔥 Most Popular' },
                          { count: 3, label: '3 मंजिल (G+2)', sub: 'Triplex Villa', badge: 'Family Home' },
                          { count: 4, label: '4 मंजिल (G+3)', sub: 'Multi-Floor', badge: 'Apartment' },
                        ].map((item) => (
                          <div
                            key={item.count}
                            onClick={() => setFloorsCount(item.count)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                              floorsCount === item.count
                                ? 'bg-blue-50/80 border-blue-600 shadow-sm ring-1 ring-blue-500'
                                : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded-md">
                              {item.badge}
                            </span>
                            <div className="text-xs font-black text-slate-900 mt-1">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {item.sub}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stepper +/- Controller */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">कस्टम मंजिल (Add/Remove):</span>
                          <span className="text-[10px] text-slate-500">1 से 10 मंजिल तक बढ़ाएं</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setFloorsCount(Math.max(1, floorsCount - 1))}
                            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-sm flex items-center justify-center hover:bg-slate-100 shadow-xs"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-xs">
                            {floorsCount} Floors
                          </span>
                          <button
                            onClick={() => setFloorsCount(Math.min(10, floorsCount + 1))}
                            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-sm flex items-center justify-center hover:bg-slate-100 shadow-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Exploded View Control */}
                      <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-black text-teal-950">
                            फ्लोर अलग करके देखें (Exploded View)
                          </h5>
                          <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                            {separation > 0.2 ? '🚀 अलग-अलग' : '🏢 जुड़ा हुआ'}
                          </span>
                        </div>
                        <p className="text-[10px] text-teal-800">
                          अंदर के कमरे और छत देखने के लिए मंजिलों को अलग करें:
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSeparation(0)}
                            className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                              separation <= 0.2 ? 'bg-teal-700 text-white shadow-xs' : 'bg-white text-teal-900 border border-teal-200'
                            }`}
                          >
                            🏢 एक साथ जोड़ें
                          </button>
                          <button
                            onClick={() => setSeparation(1.2)}
                            className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                              separation > 0.2 ? 'bg-teal-700 text-white shadow-xs' : 'bg-white text-teal-900 border border-teal-200'
                            }`}
                          >
                            🚀 अलग करके देखें
                          </button>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2.5"
                          step="0.1"
                          value={separation}
                          onChange={(e) => setSeparation(Number(e.target.value))}
                          className="w-full accent-teal-600 h-1.5 bg-teal-200/60 rounded-lg cursor-pointer mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: AMENITIES (Pool, Garage, Lawn, Lift, Solar) */}
                  {activeSidebarMenu === 'amenities' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          घर की सुविधाएं (Luxury Amenities)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          जिस सुविधा पर क्लिक करेंगे, वह 3D मॉडल में चालू या बंद हो जाएगी।
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { label: 'स्विमिंग पूल (Swimming Pool)', desc: 'घर के पीछे लग्जरी वाटर पूल', state: hasSwimmingPool, toggle: () => setHasSwimmingPool(!hasSwimmingPool), emoji: '🏊‍♂️' },
                          { label: 'कार पार्किंग व गैराज (Car Porch)', desc: 'सुरक्षित गाड़ी पार्किंग शेड', state: hasCarPorch, toggle: () => setHasCarPorch(!hasCarPorch), emoji: '🚗' },
                          { label: 'हरा-भरा बगीचा (Garden Lawn)', desc: 'घास और खूबसूरत हरियाली', state: hasGardenLawn, toggle: () => setHasGardenLawn(!hasGardenLawn), emoji: '🌳' },
                          { label: 'कांच की लिफ्ट (Glass Elevator)', desc: 'मंजिलों के बीच ट्रांसपेरेंट लिफ्ट', state: hasElevatorShaft, toggle: () => setHasElevatorShaft(!hasElevatorShaft), emoji: '🛗' },
                          { label: 'सोलर पैनल (Solar Rooftop)', desc: 'छत पर बिजली बचाने वाली प्लेट्स', state: hasSolarRooftop, toggle: () => setHasSolarRooftop(!hasSolarRooftop), emoji: '☀️' },
                          { label: 'छत की बैठक (Terrace Pergola)', desc: 'छत पर शेड और बैठने की जगह', state: hasTerracePergola, toggle: () => setHasTerracePergola(!hasTerracePergola), emoji: '⛱️' },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            onClick={item.toggle}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                              item.state
                                ? 'bg-blue-50/70 border-blue-300 text-blue-900 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{item.emoji}</span>
                              <div>
                                <div className="text-xs font-bold leading-snug">{item.label}</div>
                                <div className="text-[10px] text-slate-500">{item.desc}</div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                              item.state ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {item.state ? '✓ चालू (ON)' : 'बंद (OFF)'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: STYLES (Modern, Heritage, Glass, Eco) */}
                  {activeSidebarMenu === 'styles' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          घर का डिज़ाइन स्टाइल (Architectural Style)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          अपनी पसंद के स्टाइल पर क्लिक करें, दीवारें और खिड़कियां बदल जाएंगी।
                        </p>
                      </div>

                      <div className="space-y-2">
                        {ARCHITECTURAL_STYLES.slice(0, 8).map((style, idx) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyleIndex(idx)}
                            className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                              selectedStyleIndex === idx
                                ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs ring-1 ring-blue-500'
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold flex items-center gap-1.5">
                                <span>🏛️</span>
                                <span>{style.name}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{style.facadeStyle}</div>
                            </div>
                            {selectedStyleIndex === idx && (
                              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                ✓
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: ROOMS (Simple List + 1-Click Controls) */}
                  {activeSidebarMenu === 'rooms' && (() => {
                    const currentFloorRooms = floorLayouts[editingFloor] || [];

                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">
                            कमरे व लेआउट (Rooms Setup)
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            मंजिल चुनें और 1-क्लिक में नए कमरे जोड़ें या हटाएं।
                          </p>
                        </div>

                        {/* Floor Level Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                          {Array.from({ length: floorsCount }, (_, i) => i + 1).map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setEditingFloor(lvl)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                editingFloor === lvl
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {lvl === 1 ? 'Ground Floor' : lvl === 2 ? '1st Floor' : lvl === 3 ? '2nd Floor' : `Floor ${lvl}`}
                            </button>
                          ))}
                        </div>

                        {/* Active Rooms on This Floor */}
                        <div className="space-y-2">
                          <span className="text-xs font-extrabold text-slate-800 block">
                            इस मंजिल पर कमरे ({currentFloorRooms.length}):
                          </span>
                          <div className="space-y-1.5">
                            {currentFloorRooms.map((room) => (
                              <div
                                key={room.id}
                                className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                                    style={{ backgroundColor: room.color }}
                                  />
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-slate-900 truncate">
                                      {room.name}
                                    </div>
                                    <div className="text-[10px] text-slate-500">
                                      {room.dimensions} • {room.vastuHint.split(':')[0]}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveRoom(room.id)}
                                  className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 text-xs transition-colors shrink-0"
                                  title="हटाएं"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add New Room Fast Buttons */}
                        <div className="space-y-2 pt-1">
                          <span className="text-xs font-extrabold text-slate-800 block">
                            + नया कमरा जोड़ें (Click to Add):
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {ROOM_TEMPLATES.map((tmpl, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAddRoom(tmpl)}
                                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/70 hover:border-blue-400 text-left transition-all flex items-center gap-1.5 shadow-xs"
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                                  style={{ backgroundColor: tmpl.color }}
                                />
                                <span className="text-[11px] font-bold text-slate-800 truncate">
                                  {tmpl.name.split(' ')[0]} {tmpl.name.split(' ')[1] || ''}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Optional Advanced Vastu Accordion */}
                        <div className="pt-2">
                          <button
                            onClick={() => setShowAdvancedVastu(!showAdvancedVastu)}
                            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-between"
                          >
                            <span>📐 वास्तु 9-जोन ग्रिड देखें (Advanced)</span>
                            <span>{showAdvancedVastu ? '▲' : '▼'}</span>
                          </button>

                          {showAdvancedVastu && (
                            <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200 mt-2">
                              {ZONES.map((zone) => {
                                const placed = currentFloorRooms.find(r => r.zone === zone.id);
                                return (
                                  <div
                                    key={zone.id}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDropOnZone(zone.id)}
                                    className="p-1.5 min-h-[50px] bg-white rounded-lg border border-slate-200 text-center flex flex-col items-center justify-center"
                                  >
                                    <span className="text-[9px] font-black text-slate-500">{zone.id}</span>
                                    <span className="text-[9px] font-bold text-slate-800 truncate max-w-[70px]">
                                      {placed ? placed.name.split(' ')[0] : 'खाली'}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })()}

                </div>

                {/* Bottom Estimate and Turnkey Quote Action Bar */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">अनुमानित एरिया & बजट:</span>
                    <span className="font-extrabold text-blue-600">
                      ~{Math.round(1800 * floorsCount).toLocaleString('en-IN')} sq.ft
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onRequestQuoteWithStyle(currentStyle.name, floorsCount);
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>इस घर के लिए कोटेशन लें / Get Quotes</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ================= MAIN 3D CANVAS VIEWPORT ================= */}
          <div className="relative flex-1 h-full bg-slate-900 overflow-hidden">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Top Friendly Guidance Pill */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs border border-blue-200/80 shadow-lg pointer-events-auto flex items-center gap-2">
                <span className="text-blue-600 animate-pulse">👉</span>
                <span>घर को 360° घुमाने के लिए स्क्रीन पर उंगली या माउस से घुमाएं</span>
              </div>
            </div>

            {/* Bottom Floating Instructions */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between pointer-events-none text-xs">
              <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 font-bold text-[11px] border border-slate-200 shadow-md pointer-events-auto">
                🖱️ Rotate: 360° • Zoom: Scroll • Move: Right Click
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 text-white font-bold text-[11px] shadow-md pointer-events-auto">
                <span>IS 456 Seismic Compliant Standards</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
