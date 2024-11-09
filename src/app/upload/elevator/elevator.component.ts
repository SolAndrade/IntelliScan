import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css'],
  providers: [{ provide: Window, useValue: window }],
})
export class ElevatorComponent implements AfterViewInit {
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private camera!: THREE.PerspectiveCamera;

  constructor() {}

  ngAfterViewInit() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 2; // Start with a farther position to enable zooming

    // Initialize scene
    const scene = new THREE.Scene();

    // Create geometry and material
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initialize renderer with transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.render(scene, this.camera);

    // Append the renderer's DOM element to the component's container
    const container = document.getElementById('three-container');
    if (container) {
      container.style.width = '100vw'; // Full width
      container.style.height = '100vh'; // Full height
      container.appendChild(renderer.domElement);
    }

    // Event listeners for mouse interaction
    renderer.domElement.addEventListener('mousedown', (event) =>
      this.onMouseDown(event)
    );
    renderer.domElement.addEventListener('mousemove', (event) =>
      this.onMouseMove(event, mesh, renderer, scene)
    );
    renderer.domElement.addEventListener('mouseup', () => this.onMouseUp());
    renderer.domElement.addEventListener('wheel', (event) =>
      this.onMouseWheel(event, renderer, scene)
    );

    // Touch events
    renderer.domElement.addEventListener('touchstart', (event) =>
      this.onTouchStart(event)
    );
    renderer.domElement.addEventListener('touchmove', (event) =>
      this.onTouchMove(event, scene)
    );
    renderer.domElement.addEventListener('touchend', () => this.onTouchEnd());

    // Animation function to re-render scene
    const animate = () => {
      renderer.render(scene, this.camera);
      requestAnimationFrame(animate);
    };
    animate();
  }

  // Mouse events
  private onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  private onMouseMove(
    event: MouseEvent,
    mesh: THREE.Mesh,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene
  ) {
    if (this.isDragging) {
      const deltaMove = {
        x: event.clientX - this.previousMousePosition.x,
        y: event.clientY - this.previousMousePosition.y,
      };

      const rotationX = scene.rotation.x + deltaMove.y * 0.01;
      const rotationY = scene.rotation.y + deltaMove.x * 0.01;

      // Limit rotation to prevent flipping upside down
      scene.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, rotationX)
      );
      scene.rotation.y = rotationY;

      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  }

  private onMouseUp() {
    this.isDragging = false;
  }

  // Touch events
  private onTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.isDragging = true;
      const touch = event.touches[0];
      this.previousMousePosition = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  }

  private onTouchMove(event: TouchEvent, scene: THREE.Scene) {
    if (this.isDragging && event.touches.length === 1) {
      const touch = event.touches[0];
      const deltaMove = {
        x: touch.clientX - this.previousMousePosition.x,
        y: touch.clientY - this.previousMousePosition.y,
      };

      const rotationX = scene.rotation.x + deltaMove.y * 0.01;
      const rotationY = scene.rotation.y + deltaMove.x * 0.01;

      // Limit rotation to prevent flipping upside down
      scene.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, rotationX)
      );
      scene.rotation.y = rotationY;

      this.previousMousePosition = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  }

  private onTouchEnd() {
    this.isDragging = false;
  }

  private onMouseWheel(
    event: WheelEvent,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene
  ) {
    // Adjust camera zoom based on scroll direction
    if (event.deltaY < 0) {
      this.camera.position.z = Math.max(1, this.camera.position.z - 0.5); // Zoom in
    } else {
      this.camera.position.z = Math.min(10, this.camera.position.z + 0.5); // Zoom out
    }

    renderer.render(scene, this.camera);
  }
}
