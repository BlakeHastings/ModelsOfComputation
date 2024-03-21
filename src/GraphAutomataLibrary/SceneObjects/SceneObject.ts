import { Object3D } from "three";

export abstract class SceneObject extends Object3D {
    public abstract update(): void;
    public abstract initialize(): void;
}