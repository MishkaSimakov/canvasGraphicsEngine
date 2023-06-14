import {Shape, ShapeConfig} from "../Shape";
import {Context} from "../Context";
import {GetSet} from "../types";
import {Factory} from "../Factory";
import {_registerNode} from "../Global";
import {_registerShape} from "../Scene";

export interface RectangleConfig extends ShapeConfig {
    cornerRadius?: number | number[];
}

export class Rectangle extends Shape<RectangleConfig> {
    _sceneFunc(context: Context) {
        let cornerRadius = this.cornerRadius(),
            width = this.width(),
            height = this.height();

        context.beginPath();

        if (!cornerRadius) {
            context.rect(0, 0, width, height);
        } else {
            context.roundRect(0, 0, width, height, cornerRadius);
        }

        context.closePath();

        context.fillStrokeShape(this);
    }

    cornerRadius: GetSet<number | number[], this>;
}

Rectangle.prototype.className = 'Rectangle';
_registerNode(Rectangle);
_registerShape(Rectangle);

Factory.addGetterSetter(Rectangle, 'cornerRadius', 0);
