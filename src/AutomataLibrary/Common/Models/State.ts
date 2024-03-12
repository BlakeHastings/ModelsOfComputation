import { Transition } from "./Transition";

export interface State {
    id: string;
    isStartState: boolean;
    isAcceptingState: boolean;
    transitions: Transition[];
}