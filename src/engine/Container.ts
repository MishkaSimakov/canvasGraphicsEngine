import { Node } from './Node';

export abstract class Container<ChildType extends Node = Node> extends Node {
    children?: Array<ChildType> = [];

    getChildren(): Array<ChildType> {
        return this.children;
    }

    add(child: ChildType) {
        child.index = this.children.length;
        child.parent = this;

        this.children.push(child);

        this.requestRedraw();

        return this;
    }

    drawScene() {
        this.drawChildren('drawScene');
    }

    drawHit() {
        this.drawChildren('drawHit');
    }

    private drawChildren(drawMethod: string) {
        this.children?.forEach(child => {
            child[drawMethod]();
        })
    }

    setChildrenIndices() {
        if (!this.children)
            return;

        this.children.forEach((child, index) => {
            child.index = index;
        });
        
        this.requestRedraw();
    }
}
