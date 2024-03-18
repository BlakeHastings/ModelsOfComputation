import * as THREE from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import Deterministic from './AutomataLibrary/Automata/DeterministicFinite/Deterministic';
import { DeterministicData } from './AutomataLibrary/Automata/DeterministicFinite/Models/DeterministicData';
import { State } from './AutomataLibrary/Common/Models/State'
import './style.css';
import { StateGrapherScene } from './GraphAutomataLibrary/StateGrapher';
import InputManager, { MouseKeys } from './GraphAutomataLibrary/Managers/InputManager';
import { CSS3DRenderer } from 'three/examples/jsm/Addons.js';

let dfaData: DeterministicData = {
  states: [
    {
      id: "q0",
      isStartState: true,
      isAcceptingState: false,
      transitions: [
        {
          endingStateId: "q0",
          parameters: ["b"]
        },
        {
          endingStateId: "q1",
          parameters: ["a"]
        },
      ]
    },
    {
      id: "q1",
      isStartState: false,
      isAcceptingState: false,
      transitions: [
        {
          endingStateId: "q1",
          parameters: ["a"]
        },
        {
          endingStateId: "q2",
          parameters: ["b"]
        },
      ]
    },
    {
      id: "q2",
      isStartState: false,
      isAcceptingState: false,
      transitions: [
        {
          endingStateId: "q1",
          parameters: ["a"]
        },
        {
          endingStateId: "q3",
          parameters: ["b"]
        },
      ]
    },
    {
      id: "q3",
      isStartState: false,
      isAcceptingState: false,
      transitions: [
        {
          endingStateId: "q4",
          parameters: ["a"]
        },
        {
          endingStateId: "q0",
          parameters: ["b"]
        },
      ]
    },
    {
      id: "q4",
      isStartState: false,
      isAcceptingState: true,
      transitions: [
        {
          endingStateId: "q4",
          parameters: ["a"]
        },
        {
          endingStateId: "q4",
          parameters: ["b"]
        },
      ]
    },
  ]
}

let dfa = new Deterministic(dfaData);

console.log(dfa.transition("a"));
console.log(dfa.transition("b"));
console.log(dfa.transition("b"));
console.log(dfa.transition("b"));
console.log(dfa.isAccepted());

displayGraph(dfaData.states);

function displayGraph(states: State[]) {
  var canvas = document.getElementById("automatagraph");

  if (!canvas) {
    throw new Error("Canvas does not exist");
    
  }

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  const camera = new THREE.PerspectiveCamera(20, width / height, 0.1,1000);

  let stateGrapherScene = new StateGrapherScene(states, camera, canvas);
  
  stateGrapherScene.initialize();
  
  camera.position.z = 50;

  var inputManager = new InputManager(document);


  inputManager.onMouseWheel((util, event) => {
    const SCALAR = 0.5;
    var newZPosition = camera.position.z + event.deltaY * SCALAR ;
    if (newZPosition < camera.near) return;
    if (newZPosition > camera.far) return;

    console.log(newZPosition);
    camera.position.z = newZPosition;
  })

  inputManager.onMouseDrag((util, event, pressedButtons) => {
    if (pressedButtons.includes(MouseKeys.Wheel)) {
      var currentPosition = camera.position;
      var xMovement = event.movementX;
      var yMovement = event.movementY;
      var SCALAR = 0.5;

      camera.position.x -= xMovement * SCALAR;
      camera.position.y += yMovement * SCALAR;
    }
  });

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const textRenderer = new CSS3DRenderer();
  textRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  textRenderer.domElement.style.position = 'absolute';
  textRenderer.domElement.style.top = '0px';
  textRenderer.domElement.style.left = '0px';
  document.getElementById("app")?.appendChild( textRenderer.domElement );

  function tick() {
    stateGrapherScene.update();
    
    renderer.render( stateGrapherScene, camera );
    textRenderer.render(stateGrapherScene, camera);
    requestAnimationFrame( tick );
  }

  tick();

}

