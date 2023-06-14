import {Draw as Global} from './Global';

import {Utils} from "./Utils";
import {Transform} from "./Transform";
import {Node} from "./Node";
import {Container} from "./Container";
import {Graphics} from "./Graphics";
import Scene from "./Scene";
import {Group} from "./Group";
import {DD} from "./Drag";
import {Shape, shapes} from "./Shape";
import {Context} from "./Context";
import {Canvas} from "./Canvas";

export const Draw = Utils.assign(Global, {
    Utils,
    Transform,
    Node,
    Container,
    Graphics,
    Scene,
    Group,
    DD,
    Shape,
    shapes,
    Context,
    Canvas
});
