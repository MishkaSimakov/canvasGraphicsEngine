import Scene from "./engine/Scene";
import Rectangle from "./engine/shapes/Rectangle";

export default class TestScene extends Scene {
    constructor() {
        super({
            name: "Scene"
        });

        let rect = new Rectangle({
            width: 100,
            height: 100,
            fill: 'black',
            name: "Rect",
        });

        rect.x(10).y(10);

        rect.on('pointerdown', () => {
            console.log('hello world!')
        });

        this.add(rect);
    }
}
