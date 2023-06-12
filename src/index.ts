import {Graphics} from "./engine/Graphics";
import TestScene from "./TestScene";

document.addEventListener('DOMContentLoaded', () => {
    let graphics = new Graphics({
        width: 100,
        height: 100,
        container: 'app'
    });

    let scene = new TestScene();
    graphics.add(scene);

    scene.x(10);
});
