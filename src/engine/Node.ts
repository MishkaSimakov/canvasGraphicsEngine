import {Utils} from "./Utils";
import {Container} from "./Container";
import {Factory} from "./Factory";
import {GetSet} from "./types";
import Scene from "./Scene";
import {Transform} from "./Transform";
import {Shape} from "./Shape";

export interface NodeConfig {
    [index: string]: any;

    name?: string;
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    width?: number;
    height?: number;
    originX?: number;
    originY?: number;
}

type NodeEventMap = GlobalEventHandlersEventMap & {
    [index: string]: any;
}

export interface EventObject<EventType> {
    type: string;
    target: Shape | Scene;
    evt: EventType;
    currentTarget: Node;
    pointerId: number;
    child?: Node;
}

let idCounter = 0;

export type EventListener<This, EventType> = (
    this: This,
    ev: EventObject<EventType>
) => void;

export abstract class Node<Config extends NodeConfig = NodeConfig> {
    _id = idCounter++;
    index: number = 0;
    attrs: any = {};
    parent?: Container<Node>;

    eventListeners: Record<string, Array<{ name: string, handler: Function }>> = {};

    constructor(config?: Config) {
        this.setAttrs(config);
    }

    requestRedraw() {
        this.getScene()?.batchDraw();
    }

    getScene(): Scene {
        let parent = this.getParent();

        return parent ? parent.getScene() : undefined;
    }

    getParent() {
        return this.parent;
    }

    setAttrs(config: any) {
        if (!config)
            return this;

        for (let key in config) {
            let setterName = 'set' + Utils.capitalize(key);

            if (Utils.isFunction(this[setterName])) {
                this[setterName](config[key]);
            } else {
                this.setAttr(key, config[key]);
            }
        }

        return this;
    }

    getAbsoluteTransform(): Transform {
        let tr = new Transform();

        if (this.parent) {
            this.parent.getAbsoluteTransform().copyInto(tr);
        }

        tr.multiply(this.getTransform());

        return tr;
    }

    getTransform(): Transform {
        let tr = new Transform();

        let x = this.x();
        let y = this.y();
        let width = this.width();
        let height = this.height();

        let originX = this.originX();
        let originY = this.originY();

        if (x !== 0 || y !== 0)
            tr.translate(x, y);

        if (width !== 0 && originX)
            tr.translate(-1 * width * originX, 0);

        if (height !== 0 && originY)
            tr.translate(0, -1 * height * originY);

        return tr;
    }

    setAttr(key: string, value: any) {
        this.attrs[key] = value;

        this.requestRedraw();
    }

    abstract drawScene();

    abstract drawHit();

    draw() {
        this.drawScene();
        this.drawHit();

        return this;
    }

    on<K extends keyof NodeEventMap>(evtStr: K, handler: EventListener<this, NodeEventMap[K]>) {
        let events = (evtStr as string).split(' ');

        for (let event of events) {
            let parts = event.split('.');
            let baseEvent = parts[0];
            let name = parts[1] || '';

            if (!this.eventListeners[baseEvent])
                this.eventListeners[baseEvent] = [];

            this.eventListeners[baseEvent].push({
                name: name,
                handler: handler
            });
        }

        return this;
    }

    _fireAndBubble(eventType: string, evt: any = {}, compareShape?) {
        let shouldStop = (eventType === 'mouseenter' || eventType === 'mouseleave') &&
            (compareShape && (this === compareShape || (this.isAncestorOf && this.isAncestorOf(compareShape))));

        if (shouldStop)
            return;

        this._fire(eventType, evt);

        if (this.parent) {
            this._fireAndBubble.call(this.parent, eventType, evt);
        }
    }

    _fire(eventType: string, evt: any = {}) {
        let listeners = this.eventListeners[eventType];
        if (listeners) {
            for (let listener of listeners) {
                listener.handler.call(this, evt);
            }
        }
    }

    fire(eventType: string, evt: any = {}, bubble?: boolean) {
        evt.target = evt.target || this;

        if (bubble) {
            this._fireAndBubble(eventType, evt);
        } else {
            this._fire(eventType, evt);
        }
    }

    destroy() {
        let parent = this.getParent();

        if (parent && parent.children) {
            parent.children.splice(this.index, 1);
            this.parent.setChildrenIndices();

            this.parent = undefined;
        }
    }

    isAncestorOf(node: Node): boolean {
        return false;
    }

    name: GetSet<string, this>;
    x: GetSet<number, this>;
    y: GetSet<number, this>;
    scaleX: GetSet<number, this>;
    scaleY: GetSet<number, this>;
    width: GetSet<number, this>;
    height: GetSet<number, this>;
    originX: GetSet<number, this>;
    originY: GetSet<number, this>;
}

Factory.addGetterSetter(Node, 'name', '');

Factory.addGetterSetter(Node, 'x', 0);
Factory.addGetterSetter(Node, 'y', 0);

Factory.addGetterSetter(Node, 'scaleX', 1);
Factory.addGetterSetter(Node, 'scaleY', 1);


Factory.addGetterSetter(Node, 'width', 0);
Factory.addGetterSetter(Node, 'height', 0);

Factory.addGetterSetter(Node, 'originX', 0);
Factory.addGetterSetter(Node, 'originY', 0);
