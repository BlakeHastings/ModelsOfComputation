import { CSS3DObject } from "three/examples/jsm/Addons.js";
import { SceneObject } from "./SceneObject";
import * as THREE from 'three';

export class StateObject extends SceneObject{
    
    RADIUS = 5; 
    private stateColor = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    private label = '';

    constructor(label: string) {
        super();
        this.label = label;
    }

    update(): void {
        
    }

    initialize(): void {
        const geometry = new THREE.CircleGeometry(this.RADIUS);
        const stateCircle = new THREE.Mesh(geometry, this.stateColor);
        this.add(stateCircle);
        
        // create label
        const stateDiv = document.createElement('div');
        stateDiv.className = "label";
        stateDiv.textContent = this.label;
        stateDiv.style.backgroundColor = 'transparent';

        const stateLabel = new CSS3DObject(stateDiv);
        stateCircle.add(stateLabel);
        stateLabel.layers.set(0);
    }


}