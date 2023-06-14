import {Container} from "./Container";
import {Shape} from "./Shape";
import {_registerNode} from "./Global";
import {_registerShape} from "./Scene";

export class Group extends Container<Shape> {

}

Group.prototype.nodeType = 'Group';
_registerNode(Group);
_registerShape(Group);
