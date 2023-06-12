export const Utils = {
    isFunction(obj: any): boolean {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    createCanvasElement(): HTMLCanvasElement {
        return document.createElement('canvas');
    },
    releaseCanvas(canvas: HTMLCanvasElement) {
        canvas.width = 0;
        canvas.height = 0;
    }
}
