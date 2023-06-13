import Scene from "./engine/Scene";
import {Card} from "./engine/shapes/Card";

export default class TestScene extends Scene {
    constructor() {
        super({
            name: "Scene"
        });

        let card = new Card({
            width: 200,
            height: 200,
            x: 100,
            y: 100
        });

        this.add(card);
    }
}
