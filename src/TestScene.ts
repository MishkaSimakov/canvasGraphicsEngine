import Scene from "./engine/Scene";
import Rectangle from "./engine/shapes/Rectangle";
import {Node} from './engine/Node'

export default class TestScene extends Scene {
    constructor() {
        super({
            name: "Scene"
        });

        let rect = new Rectangle({
            originX: 1,
            width: 100,
            height: 100,
            fill: 'black',
            name: "Rect",
        });

        this.add(rect);
    }
}
