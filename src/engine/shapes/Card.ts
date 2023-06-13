import {Shape, ShapeConfig} from "../Shape";
import {Container} from "../Container";
import {Rectangle} from "./Rectangle";
import {Text} from "./Text";

export interface CardConfig extends ShapeConfig {
    text?: string;
}

export class Card extends Container<Shape> {
    background: Rectangle;
    text: Text;
    connectors: Rectangle[] = [];

    constructor(config?: CardConfig) {
        super(config);

        let width = this.width();
        let height = this.height();

        this.background = new Rectangle({
            width: width,
            height: height,
            fill: '#4dd170',
        });
        this.text = new Text({
            text: "Hello world",
            originY: 0.5,
            originX: 0.5,
            x: width / 2,
            y: height / 2,
            fill: 'white',
        });

        this.add(this.background, this.text);
    }
}
