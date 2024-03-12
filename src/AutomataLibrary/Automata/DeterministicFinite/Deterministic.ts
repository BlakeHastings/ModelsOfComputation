import { State } from "../../Common/Models/State";
import { Transition } from "../../Common/Models/Transition";
import { DataToFormal } from "./DataToFormal";
import { DeterministicData } from "./DeterministicData";
import { DeterministicFormalDef } from "./DeterministicFormalDef";

export class Deterministic {

    private currState: State;
    private formalDefinition: DeterministicFormalDef;

    constructor(data: DeterministicData) {
        this.formalDefinition = DataToFormal(data);
        this.currState = this.formalDefinition.q0;
    }

    public transition(input: string) : {result: "OutOfLanguage" | "Success" | "Error", errorMessage: string | null, newState: State, transitionTook: Transition | null} {
        
        let possibleTransitions = this.currState.transitions.filter(x => x.parameters.includes(input)) ?? [];

        // out of language if no transition (by the rules of Deterministic Finite Automata)
        if (possibleTransitions.length === 0) {
            return {
                result: "OutOfLanguage",
                errorMessage: null,
                newState: this.currState,
                transitionTook: null
            }
        }

        // error if more than one transition (by the rules of Deterministic Finite Automata)
        if (possibleTransitions.length > 1) {
            return {
                result: "Error",
                errorMessage: `DFA states can only have 1 transition for a symbol. '${input} has ${possibleTransitions.length} transitions from state ${this.currState.id}'`,
                newState: this.currState,
                transitionTook: null
            }
        }

        let endingState = this.formalDefinition.Q.find(x => x.id == possibleTransitions[0].endingStateId);
        if (!endingState) {
            return {
                result: "Error",
                errorMessage: `Transitions must be between two valid states.'`,
                newState: this.currState,
                transitionTook: null
            }
        }

        // take transition
        this.currState = endingState;
        return {
            result: "Success",
            errorMessage: null,
            newState: this.currState,
            transitionTook: possibleTransitions[0]
        }
    }   

    public isAccepted() {
        if (this.currState.isAcceptingState) {
            return true;
        }

        return false;
    }
}