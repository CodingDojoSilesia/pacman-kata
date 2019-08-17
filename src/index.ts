import PacManRenderer from './pacman-preview/PacManRenderer';

const previewRenderer = new PacManRenderer();

previewRenderer.loadAssets().then(() => {
    previewRenderer.render({
        pacmanPosition: [0, 0],
        blinkyPosition: [0, 0],
        pinkyPosition: [0, 0],
        inkyPosition: [0, 0],
        clydePosition: [0, 0],
        mapSize: [10, 10],
        mapData: [
            [0, 0, 0, 0, 0]
        ]
    });
    window.addEventListener('keydown', event => {
        if (event.key == ' ') {
            // space
        } else if (event.keyCode == 38) {
            // up arrow
        }
        else if (event.keyCode == 40) {
            // down arrow
        }
        else if (event.keyCode == 37) {
           // left arrow
        }
        else if (event.keyCode == 39) {
           // right arrow
        }
    });
});


