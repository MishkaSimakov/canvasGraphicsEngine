import {Node, NodeConfig} from './Node'
import {Context} from "./Context";
import {GetSet} from "./types";
import {Factory} from "./Factory";
import {Utils} from "./Utils";

interface ShapeConfig extends NodeConfig {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    sceneFunc?: (context: Context, shape: Shape) => void;
    hitFunc?: (context: Context, shape: Shape) => void;
}

export const shapes: Record<string, Shape> = {};

export class Shape<Config extends ShapeConfig = ShapeConfig> extends Node<Config> {
    colorKey: string;

    constructor(config?: Config) {
        super(config);

        while (true) {
            this.colorKey = Utils.randomColor();

            if (this.colorKey && !shapes[this.colorKey])
                break;
        }

        shapes[this.colorKey] = this;
    }

    getSceneFunc() {
        return this.attrs.sceneFunc || this['_sceneFunc'];
    }

    drawScene() {
        let context = this.getScene().canvas.getContext();

        let drawFunc = this.sceneFunc();

        if (!drawFunc)
            return;

        context.save();

        let m = this.getAbsoluteTransform().getMatrix();

        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

        this.getSceneFunc().call(this, context, this);

        context.restore();
    }

    drawHit() {
        let context = this.getScene().hitCanvas.getContext();
        let drawFunc = this.hitFunc() || this.sceneFunc();

        if (!drawFunc)
            return;

        context.save();

        let m = this.getAbsoluteTransform().getMatrix();

        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

        drawFunc.call(this, context, this);

        context.restore();
    }

    hasStroke(): boolean {
        return !!(this.strokeWidth() && this.stroke());
    }

    destroy() {
        Node.prototype.destroy.call(this);

        delete shapes[this.colorKey];
        delete this.colorKey;

        return this;
    }

    fill: GetSet<string, this>;
    stroke: GetSet<string, this>;
    strokeWidth: GetSet<number, this>;
    sceneFunc: GetSet<(context: Context, shape: Shape) => void, this>;
    hitFunc: GetSet<(context: Context, shape: Shape) => void, this>;
}


Factory.addGetterSetter(Shape, 'fill');
Factory.addGetterSetter(Shape, 'stroke');
Factory.addGetterSetter(Shape, 'strokeWidth', 0);
Factory.addGetterSetter(Shape, 'sceneFunc');
Factory.addGetterSetter(Shape, 'hitFunc');
