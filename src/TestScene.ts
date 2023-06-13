import Scene from "./engine/Scene";
import Rectangle from "./engine/shapes/Rectangle";
import {Group} from "./engine/Group";

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

        let group = new Group({
            name: "Group"
        });

        group.add(rect);

        rect.on('pointerenter', () => {
            rect.fill('yellow')
        });

        rect.on('pointerout', () => {
            rect.fill('red')
        });

        this.add(group);
    }
}
