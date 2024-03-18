/*
    (Q, Σ, q0, F, δ)
    Q = set of all states
    Σ = inputs
    q0 = start state / initial state
    F = set of final states
    δ = transition function
*/

import { State } from "../../../Common/Models/State";

export interface DeterministicFormalDef {
    /** 
     * @description Set of all states
     */
    Q: State[];
    /** 
     * @description Initial state
     */
    q0: State;
    /** 
     * @description Accepting states
     */
    F: State[];
}