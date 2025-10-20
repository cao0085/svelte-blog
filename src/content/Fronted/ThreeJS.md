---
title: "插入 3D 影像"
date: "2025-08-13"
category: "software"
subCategory: "Frontend"
tags: ["css", "fronted", "web"]
slug: "threeJs"
---
###### [U.S. Web Design System](https://designsystem.digital.gov/)

---

### 匯入 .glb

透過用 three.js 匯入
Canvas ➜ WebGL ➜ Three.js ➜ GLB 模型 ➜ GPU 顯示

```js
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  // 建立場景
  const scene = new THREE.Scene();

  // 建立相機(視角)
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 2);

  // 建立渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 加入控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  // 加入環境光
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  // 載入 glb 模型（放在 public 資料夾）
  const loader = new GLTFLoader();
  loader.load(
    '/DamagedHelmet.glb', // ← public 資料夾下
    (gltf) => {
      console.log('模型載入成功');
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log(`載入進度 ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
    },
    (error) => {
      console.error('載入失敗', error);
    }
  );

  // 渲染迴圈
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // 視窗調整
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
```
