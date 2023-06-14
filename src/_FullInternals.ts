import { Draw as Core } from './_CoreInternals';
import {Rectangle} from "./shapes/Rectangle";
import {Text} from "./shapes/Text";

export const Draw = Core.Utils.assign(Core, {
    Rectangle,
    Text
});
