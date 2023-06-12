import {Utils} from "./Utils";
import {Container} from "./Container";
import {Factory} from "./Factory";
import {GetSet} from "./types";

let idCounter = 0;

export interface NodeConfig {
    [index: string]: any;

    id?: number;
    name?: string;
    x?: number;
    y?: number;
    scaleX?: number,
    scaleY?: number,
    width?: number;
    height?: number;
}

export abstract class Node<Config extends NodeConfig = NodeConfig> {
    index: number = 0;
    attrs: any = {};
    parent?: Container<Node>;

    constructor(config?: Config) {
        this.setAttrs(config);
    }

    requestRedraw() {

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

    setAttr(key: string, value: any) {
        this.attrs[key] = value;
    }


    id: GetSet<number, this>;
    name: GetSet<string, this>;
    x: GetSet<number, this>;
    y: GetSet<number, this>;
    scaleX: GetSet<number, this>;
    scaleY: GetSet<number, this>;
    width: GetSet<number, this>;
    height: GetSet<number, this>;
}

Factory.addGetterSetter(Node, 'width', 0);

Factory.addGetterSetter(Node, 'height', 0);
