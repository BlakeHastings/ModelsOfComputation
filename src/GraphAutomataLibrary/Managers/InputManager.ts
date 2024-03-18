export default class InputManager {
    private element : EventTarget;

    private pressedKeys : { [keyCode: string] : boolean } = {};
    private pressedMouseButtons : { [button: number] : boolean } = {};

    constructor(element: EventTarget) {
        this.element = element;

        window.addEventListener("keydown", (event) => {
            this.pressedKeys[event.code] = true;
        });

        window.addEventListener("mousedown", (event: MouseEvent) => {
            this.pressedMouseButtons[event.button] = true;
        });

        window.addEventListener("mouseup", (event: MouseEvent) => {
            this.pressedMouseButtons[event.button] = false;
        })

        window.addEventListener("keyup", (event) => {
            this.pressedKeys[event.code] = false;
        });
    }   

    public onMouseWheel(callback: (util: InputManager, event: WheelEvent) => void): InputManager {
        this.element.addEventListener('wheel', (event)=> {
            callback.call(this, this, event as WheelEvent);
        });
        return this;
    }

    public onMouseDrag(callback: (util: InputManager, event: MouseEvent, pressedButtons : MouseKeys[]) => void): InputManager {
        this.element.addEventListener('mousemove', (event) => {
            // check if button is down
            var pressedMouseButtons : MouseKeys[] = [];
            Object.keys(this.pressedMouseButtons).forEach(key => {
                if (this.pressedMouseButtons[Number(key)]) {
                    pressedMouseButtons.push(Number(key) as MouseKeys);
                }
            });

            if (pressedMouseButtons && pressedMouseButtons.length > 0) {
                callback.call(this, this, event as MouseEvent, pressedMouseButtons);
            }
        });
        return this;
    }

    public onMouseDown(callback: (util: InputManager, event: MouseEvent) => void): InputManager {
        this.element.addEventListener('mousedown', (event)=> {
            callback.call(this, this, event as MouseEvent);
        });
        return this;
    }
}

export enum MouseKeys {
    Left = 0,
    Wheel = 1,
    Right = 2,
    SideFront = 3,
    SideBack = 4
}