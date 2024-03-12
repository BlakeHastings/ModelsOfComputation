import { Deterministic } from './AutomataLibrary/Automata/DeterministicFinite/Deterministic'
import { DeterministicData } from './AutomataLibrary/Automata/DeterministicFinite/DeterministicData'
import './style.css'

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

