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

    draw() {
        this.children.forEach(child => {
            child.draw();
        });
    }
}
