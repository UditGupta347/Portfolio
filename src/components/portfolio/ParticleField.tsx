import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleField({ mousePosition }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const cubesRef = useRef([]);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#8b5cf6');
    const color3 = new THREE.Color('#ff006e');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const rand = Math.random();
      const color = rand < 0.33 ? color1 : rand < 0.66 ? color2 : color3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Floating cubes
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 8; i++) {
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? '#00f0ff' : '#8b5cf6',
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      cube.scale.setScalar(0.2 + Math.random() * 0.3);
      cube.userData.speed = 0.5 + Math.random() * 0.5;
      scene.add(cube);
      cubesRef.current.push(cube);
    }

    // Central glowing sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: '#00f0ff',
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.z = -5;
    scene.add(sphere);

    // Animation
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.x = time * 0.05;
        particlesRef.current.rotation.y = time * 0.03;
      }

      // Animate cubes
      cubesRef.current.forEach((cube) => {
        cube.rotation.x += 0.01 * cube.userData.speed;
        cube.rotation.y += 0.015 * cube.userData.speed;
        cube.position.y += Math.sin(time * cube.userData.speed) * 0.002;
      });

      // Animate sphere
      sphere.scale.setScalar(1 + Math.sin(time) * 0.1);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update rotation based on mouse position
  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += mousePosition.y * 0.1;
      particlesRef.current.rotation.y += mousePosition.x * 0.1;
    }
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
      style={{ background: 'transparent' }}
    />
  );
}