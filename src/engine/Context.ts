import {Canvas} from "./Canvas";
import {Shape} from "./Shape";

export class Context extends CanvasRenderingContext2D {
    customCanvas: Canvas;

    getCanvas() {
        return this.customCanvas;
    }

    clear() {
        let canvas = this.getCanvas();

        this.clearRect(0, 0, canvas.width / canvas.pixelRatio, canvas.height / canvas.pixelRatio);
    }

    fillStrokeShape(shape: Shape) {
        this.fillShape(shape);
        this.strokeShape(shape);
    }

    strokeShape(shape: Shape) {
        if (!shape.hasStroke())
            return;

        this.lineWidth = shape.strokeWidth();
        this.strokeStyle = shape.stroke();

        this.stroke();
    }

    fillShape(shape: Shape) {
        this.fillStyle = shape.fill();

        this.fill();
    }
}
