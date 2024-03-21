import * as THREE from "three";
import { State } from "../AutomataLibrary/Common/Models/State";
import { CSS2DObject, CSS3DObject } from "three/examples/jsm/Addons.js";
import { degToRad } from "three/src/math/MathUtils.js";
import "./Extensions/Extensions";
import { SceneObject } from "./SceneObjects/SceneObject";
import { StateObject } from "./SceneObjects/StateObject";
import System from 'three-nebula-types';

export class StateGrapherScene extends THREE.Scene {

    private states: State[];
    private circle!: THREE.Mesh;
    private camera: THREE.Camera;
    private canvas: HTMLElement;

    private stateCircles: StateObject[] = [];
    private sceneObjects: SceneObject[] = [];

    private transitionLineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
    private particleSystem = new System();

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
        
        // this.states.forEach(state => {
        //     this.createTransitions(state);
        // })
        
        this.background = new THREE.Color(0xDDDDDD);

        this.sceneObjects.forEach(x => {
            x.initialize();
            this.add(x); 
        });
    }

    private createState(state: State) {
        var object = new StateObject(state.id);
        this.sceneObjects.push(object);
        this.stateCircles.push(object);

        this.particleSystem.addEmitter()
    }

    private positionStates(states: State[], canvas : HTMLElement) {
        var width = canvas.offsetWidth;
        var height = canvas.offsetHeight
        var PADDING = 5; 

        var spaceForEachNode = (width / this.stateCircles.length + this.RADIUS * 2) / 5;
        for (let i = 0; i < this.stateCircles.length; i++) {
           this.stateCircles[i].position.x += spaceForEachNode * i;
        }
    }

    private createTransitions(state: State) {
        var startCircle = this.getObjectByName("state_" + state.id);
        
        if (!startCircle) { console.error("state_" + state.id + " does not exist"); return;}

        state.transitions.forEach(transition => {
            var endCircle = this.getObjectByName("state_" + transition.endingStateId);
            if (!endCircle) {console.error("state_" + transition.endingStateId + " does not exist")}
            
            var linePoints = [
                startCircle!.position.clone().add(new THREE.Vector3(this.RADIUS)),
                endCircle!.position.clone().sub(new THREE.Vector3(this.RADIUS)),
            ];

            // handle self loop 
            if (startCircle?.name == endCircle?.name) {
                linePoints.splice(1, 0, startCircle!.position.clone().add(new THREE.Vector3(0,this.RADIUS*2)));
            }

            var transitionGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
            var line = new THREE.Line(transitionGeometry, this.transitionLineMaterial);
            this.add(line);

             // create label
             const labelDiv = document.createElement('div');
             labelDiv.className = "label";
             labelDiv.textContent = transition.parameters.toString();
             labelDiv.style.backgroundColor = 'transparent';
 
             const label = new CSS3DObject(labelDiv);
             label.position.set((linePoints.first().x + linePoints.last().x) / 2, linePoints.middle().y + 5, 0);
             line.add(label);
             label.layers.set(0);  
        });
        
    } 

    update() {
        this.sceneObjects.forEach(x => x.update());
        
        
       
    }

}