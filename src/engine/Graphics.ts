import Scene from "./Scene";
import Pointer from "./Pointer";
import EventsManager from "./EventsManager";
import Color from "./types/Color";
import Game from "../../../../Documents/Programs/PhpStormProjects/MyGame/client/src/Game";
import {Container} from "./Container";
import {NodeConfig} from "./Node";
import {Canvas} from "./Canvas";
import {GetSet} from "./types";
import {Factory} from "./Factory";

type GraphicsManagerEvents = 'pointerdown' | 'pointerup' | 'pointermove' | 'ready';

export interface GraphicsConfig extends NodeConfig {
    container: HTMLDivElement | string;
}

class Graphics extends Container<Scene> {
    canvas: Canvas;
    content: HTMLDivElement;


    container: GetSet<HTMLDivElement, this>;

    constructor(config: GraphicsConfig) {
        super(config);

        this.canvas = new Canvas({
            width: this.width(),
            height: this.height(),
        });

        let container = this.container();

        if (!container)
            throw 'There must be container in graphics';

        this.content = document.createElement('div');
        this.content.style.position = 'relative';
        this.content.style.userSelect = 'none';

        this.content.setAttribute('role', 'presentation');

        this.content.appendChild(this.canvas.canvas);

        container.appendChild(this.content);
    }

    setContainer(container: HTMLDivElement|string) {
        if (typeof container === 'string') {
            container = document.getElementById(container) as HTMLDivElement;

            if (!container)
                throw `Cannot find container`;
        }

        this.setAttr('container', container);
        if (this.content) {
            if (this.content.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }

            container.appendChild(this.content);
        }

        return this;
    }
}

Factory.addGetterSetter(Graphics, 'container');

export {GraphicsManagerEvents, Graphics};
