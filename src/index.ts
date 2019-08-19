import { PacManState, PacManRenderer } from './pacman-preview/PacManRenderer';

const previewRenderer = new PacManRenderer();

const testState: PacManState = {
    pacman: [0, 0, 'down'],
    blinky: [1, 0, 'up'],
    pinky: [2, 0, 'left'],
    inky: [3, 0, 'right'],
    clyde: [4, 0, 'up'],
    map: [5, 6,  [
        [1, 1, 1, 1, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 2, 0, 1],
        [1, 0, 2, 2, 1],
        [1, 0, 0, 3, 0],
        [1, 1, 2, 2, 0]
    ]],
    lives: 3,
    points: 10,
    level: 1,
    ballCount: 6,
    ghostCount: {
        total: 4,
        blinkyCount: 1,
        pinkyCount: 2,
        inkyCount: 0,
        clydeCount: 1
    },
    state: 'regular',
    superTime: 0
};

previewRenderer.loadAssets().then(() => {
    previewRenderer.render(testState);
    window.addEventListener('keydown', event => {
        if (event.key == ' ') {
            // space
            previewRenderer.render(testState);
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


