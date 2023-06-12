import {Utils} from "./Utils";
import {Container} from "./Container";
import {Factory} from "./Factory";
import {GetSet} from "./types";
import Scene from "./Scene";
import {Transform} from "./Transform";

let idCounter = 0;

export interface NodeConfig {
    [index: string]: any;

    name?: string;
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    width?: number;
    height?: number;
    originX?: number;
    originY?: number;
}

export abstract class Node<Config extends NodeConfig = NodeConfig> {
    index: number = 0;
    attrs: any = {};
    parent?: Container<Node>;

    constructor(config?: Config) {
        this.setAttrs(config);
    }

    requestRedraw() {
        this.getScene()?.batchDraw();
    }

    getScene(): Scene {
        let parent = this.getParent();

        return parent ? parent.getScene() : undefined;
    }

    getParent() {
        return this.parent;
    }

    setAttrs(config: any) {
        if (!config)
            return this;

        for (let key in config) {
            let setterName = 'set' + Utils.capitalize(key);

            if (Utils.isFunction(this[setterName])) {
                this[setterName](config[key]);
            } else {
                this.setAttr(key, config[key]);
            }
        }

        return this;
    }

    getAbsoluteTransform(): Transform {
        let tr = new Transform();

        if (this.parent) {
            this.parent.getAbsoluteTransform().copyInto(tr);
        }

        tr.multiply(this.getTransform());

        return tr;
    }

    getTransform(): Transform {
        let tr = new Transform();

        let x = this.x();
        let y = this.y();
        let width = this.width();
        let height = this.height();

        let originX = this.originX();
        let originY = this.originY();

        if (x !== 0 || y !== 0)
            tr.translate(x, y);

        if (width !== 0 && originX)
            tr.translate(-1 * width * originX, 0);

        if (height !== 0 && originY)
            tr.translate(0, -1 * height * originY);

        return tr;
    }

    setAttr(key: string, value: any) {
        this.attrs[key] = value;

        this.requestRedraw();
    }

    abstract draw();

    name: GetSet<string, this>;
    x: GetSet<number, this>;
    y: GetSet<number, this>;
    scaleX: GetSet<number, this>;
    scaleY: GetSet<number, this>;
    width: GetSet<number, this>;
    height: GetSet<number, this>;
    originX: GetSet<number, this>;
    originY: GetSet<number, this>;
}

Factory.addGetterSetter(Node, 'name', '');

Factory.addGetterSetter(Node, 'x', 0);
Factory.addGetterSetter(Node, 'y', 0);

Factory.addGetterSetter(Node, 'scaleX', 1);
Factory.addGetterSetter(Node, 'scaleY', 1);


Factory.addGetterSetter(Node, 'width', 0);
Factory.addGetterSetter(Node, 'height', 0);

Factory.addGetterSetter(Node, 'originX', 0);
Factory.addGetterSetter(Node, 'originY', 0);
