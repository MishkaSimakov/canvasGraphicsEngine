import {Graphics} from "./engine/Graphics";
import TestScene from "./TestScene";

document.addEventListener('DOMContentLoaded', () => {
    let graphics = new Graphics({
        width: window.innerWidth,
        height: window.innerHeight,
        container: 'app'
    });

    let scene = new TestScene();
    graphics.add(scene);

    scene.x(10);
});
