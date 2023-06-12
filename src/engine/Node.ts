import {Utils} from "./Utils";

let idCounter = 0;

interface NodeConfig {
    [index: string]: any;

    id?: number;
    name?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    parent?: Container<Node>;
}

export abstract class Node<Config extends NodeConfig = NodeConfig> {
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
                this[key] = config[key];
            }
        }

        return this;
    }
}
