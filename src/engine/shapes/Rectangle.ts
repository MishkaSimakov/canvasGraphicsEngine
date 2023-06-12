import {Shape} from "../Shape";
import {Context} from "../Context";

export default class Rectangle extends Shape {
    _drawFunc(context: Context) {
        context.beginPath();

        context.rect(0, 0, this.width(), this.height());

        context.closePath();

        context.fillStrokeShape(this);
    }
}
