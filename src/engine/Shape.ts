import {Node, NodeConfig} from './Node'
import {Context} from "./Context";
import {GetSet} from "./types";
import {Factory} from "./Factory";

interface ShapeConfig extends NodeConfig {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    drawFunc?: (context: Context, shape: Shape) => void;
}

export class Shape<Config extends ShapeConfig = ShapeConfig> extends Node<Config> {
    constructor(config?: Config) {
        super(config);
    }

    getDrawFunc() {
        return this.attrs.drawFunc || this['_drawFunc'];
    }

    draw() {
        let context = this.getScene().getContext();

        context.save();

        let m = this.getAbsoluteTransform().getMatrix();

        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);

        this.getDrawFunc().call(this, context, this);

        context.restore();
    }

    hasStroke(): boolean {
        return !!(this.strokeWidth() && this.stroke());
    }

    fill: GetSet<string, this>;
    stroke: GetSet<string, this>;
    strokeWidth: GetSet<number, this>;
    drawFunc: GetSet<(context: Context, shape: Shape) => void, this>;
}


Factory.addGetterSetter(Shape, 'fill');
Factory.addGetterSetter(Shape, 'stroke');
Factory.addGetterSetter(Shape, 'strokeWidth', 0);
Factory.addGetterSetter(Shape, 'drawFunc');
