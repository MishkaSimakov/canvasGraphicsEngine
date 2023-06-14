import {Node} from './Node';
import {Factory} from "./Factory";

export abstract class Container<ChildType extends Node = Node> extends Node {
    children?: Array<ChildType> = [];

    getChildren(): Array<ChildType> {
        return this.children;
    }

    add(...children: ChildType[]) {
        if (children.length === 0)
            return this;

        if (children.length > 1) {
            for (let child of children) {
                this.add(child);
            }

            return this;
        }

        const child = children[0];

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

    isAncestorOf(node: Node): boolean {
        let parent = node.getParent();

        while (parent) {
            if (parent._id === this._id) {
                return true;
            }

            parent = parent.getParent();
        }

        return false;
    }

    getWidth(): number {
        if (this.attrs.width !== 'auto')
            return this.attrs.width;
        // TODO: add origin support for container
    }

    getHeight(): number {
        return this.attrs.height;
    }
}

Factory.overwriteGetter(Container, 'width', 'auto');
Factory.overwriteGetter(Container, 'height', 'auto');
