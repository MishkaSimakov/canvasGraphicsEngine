import {Container} from "./Container";
import {Shape} from "./Shape";
import {Group} from "./Group";
import {Canvas} from "./Canvas";
import {Context} from "./Context";
import {NodeConfig} from "./Node";

export default class Scene extends Container<Group | Shape> {
    canvas: Canvas = new Canvas({
        width: 0,
        height: 0
    });

    waitingForDraw: boolean = false;

    constructor(config?: NodeConfig) {
        super(config);
    }

    setSize({width, height}) {
        this.canvas.setSize(width, height);

        return this;
    }

    getScene(): Scene {
        return this;
    }

    batchDraw() {
        if (!this.waitingForDraw) {
            this.waitingForDraw = true;

            requestAnimationFrame(() => {
                this.draw();
                this.waitingForDraw = false;
            });
        }
    }

    draw() {
        this.canvas.getContext().clear();

        Container.prototype.draw.call(this);

        return this;
    }

    getContext(): Context {
        return this.canvas.getContext();
    }
}
