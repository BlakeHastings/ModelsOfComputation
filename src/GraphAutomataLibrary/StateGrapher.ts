import * as THREE from "three";
import { State } from "../AutomataLibrary/Common/Models/State";
import { CSS2DObject, CSS3DObject } from "three/examples/jsm/Addons.js";
import { degToRad } from "three/src/math/MathUtils.js";

export class StateGrapherScene extends THREE.Scene {

    private states: State[];
    private circle!: THREE.Mesh;
    private camera: THREE.Camera;
    private canvas: HTMLElement;
    private stateColor = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    private stateCircles: THREE.Mesh[] = [];
    private stateLabels: CSS3DObject[] = [];

    private transitionLineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );

    RADIUS = 10;

    constructor(states: State[], camera: THREE.Camera, canvas: HTMLElement) {
        super();
        this.states = states;
        this.camera = camera;
        this.canvas = canvas;
    }


    initialize() {
        this.add(new THREE.GridHelper(100,100).rotateX(degToRad(90)));
        this.states.forEach(state => {
            this.createState(state);
        });
        this.positionStates(this.states, this.canvas);
        this.createTransitions(this.states[0]);
        this.background = new THREE.Color(0xDDDDDD);
    }

    private createState(state: State) {
        const geometry = new THREE.CircleGeometry(this.RADIUS);
        const stateCircle = new THREE.Mesh(geometry, this.stateColor);
        stateCircle.name = "state_" + state.id;
        stateCircle.userData.type = "state";
        this.add(stateCircle);
        
        // create label
        const stateDiv = document.createElement('div');
        stateDiv.className = "label";
        stateDiv.textContent = state.id;
        stateDiv.style.backgroundColor = 'transparent';

        const stateLabel = new CSS3DObject(stateDiv);
        //stateLabel.position.set(5 / 2, 5 / 2, 0);
        stateCircle.add(stateLabel);
        stateLabel.layers.set(0);
        this.stateLabels.push(stateLabel);
    }

    private positionStates(states: State[], canvas : HTMLElement) {
        var stateCircles = this.children.filter(x => x.userData.type = "state");

        var width = canvas.offsetWidth;
        var height = canvas.offsetHeight
        var PADDING = 5; 

        var spaceForEachNode = (width / stateCircles.length + this.RADIUS * 2) / 5;
        for (let i = 0; i < stateCircles.length; i++) {
           stateCircles[i].position.x += spaceForEachNode * i;
        }
    }

    private createTransitions(state: State) {
        var startCircle = this.getObjectByName("state_" + state.id);
        
        if (!startCircle) { console.error("state_" + state.id + " does not exist"); return;}

        state.transitions.forEach(transition => {
            var endCircle = this.getObjectByName("state_" + transition.endingStateId);
            if (!endCircle) {console.error("state_" + transition.endingStateId + " does not exist")}
            
            var transitionGeometry = new THREE.BufferGeometry().setFromPoints( [startCircle!.position, endCircle!.position])
            this.add(new THREE.Line(transitionGeometry, this.transitionLineMaterial));
        });
        
    }

    update() {
        // this.stateLabels.forEach(label => {
        //     if (!label.parent) {
        //         return;
        //     }
        //     var scaleVector = new THREE.Vector3();
        //     var scaleFactor = 4;
        //     var sprite = label;
        //     var scale = scaleVector.subVectors(label.parent.position, this.camera.position).length() / scaleFactor;
        //     sprite.scale.set(scale, scale, 1); 
        // });
       
    }

}