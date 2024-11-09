import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css'],
})
export class ElevatorComponent implements AfterViewInit {
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private rotateDirection: 'left' | 'right' | null = null;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor() {}

  ngAfterViewInit() {
    const container = document.getElementById('three-container');
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 2;

    // Initialize scene
    this.scene = new THREE.Scene();

    // Create geometry and material
    const material = new THREE.MeshNormalMaterial();

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xb4b4b4, // Grey color
      metalness: 0.7, // High metalness for a metallic appearance
      roughness: 0.3, // Low roughness for a somewhat reflective surface
    });

    const light = new THREE.PointLight(0xffffff, 2, 7);
    light.position.set(1, 1, 2);
    this.scene.add(light);

    const leftDoor = new THREE.BoxGeometry(0.55, 1.5, 1.1);
    const meshLeftDoor = new THREE.Mesh(leftDoor, metalMaterial);
    meshLeftDoor.position.set(-0.29, 0, 0);
    this.scene.add(meshLeftDoor);

    const rightDoor = new THREE.BoxGeometry(0.55, 1.5, 1.1);
    const meshRightDoor = new THREE.Mesh(rightDoor, metalMaterial);
    meshRightDoor.position.set(0.29, 0, 0);
    this.scene.add(meshRightDoor);

    // Initialize renderer with transparency
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Transparent background

    // Append the renderer's DOM element to the component's container
    if (container) {
      container.appendChild(this.renderer.domElement);
      this.renderer.render(this.scene, this.camera);
    }
  }

  rotateLeft() {
    this.scene.rotation.y -= 0.1;
    this.renderer.render(this.scene, this.camera);
  }

  rotateRight() {
    this.scene.rotation.y += 0.1;
    this.renderer.render(this.scene, this.camera);
  }

  stopRotation() {
    this.rotateDirection = null;
  }
}
