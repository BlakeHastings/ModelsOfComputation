import { DeterministicData } from "../Models/DeterministicData";
import { DeterministicFormalDef } from "../Models/DeterministicFormalDef";

export function DataToFormal(data: DeterministicData): DeterministicFormalDef {
    let initialState = data.states.find(x => x.isStartState);
    if (!initialState) {throw new Error("Data must have initial state for formal def");
    }

    let formal: DeterministicFormalDef = {
        Q: data.states,
        q0:  initialState,
        F: data.states.filter(x => x.isAcceptingState)
    }

    return formal;
}