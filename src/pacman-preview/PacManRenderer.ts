// @ts-ignore:
import spritemapUrl from "../public/spritemap.png";

import Renderer from 'js13k-2d';

const { Point, Sprite } = Renderer;
const TILE_SIZE = 64;

export interface PacManState {
    pacman: [number, number, string];
    blinky: [number, number, string];
    pinky: [number, number, string];
    inky: [number, number, string];
    clyde: [number, number, string];
    map: [number, number, number[][]];
    lives: number,
    points: number,
    level: number,
    ballCount: number,
    ghostCount: {
        total: number,
        blinkyCount: number,
        pinkyCount: number,
        inkyCount: number,
        clydeCount: number
    },
    state: string,
    superTime: number
};

interface Assets {
    spritemap: any;
}

export class PacManRenderer {
    private view: HTMLCanvasElement;
    private status: HTMLElement;
    private scene: any;
    private sprites: any[];
    private assets: Assets;
    private frame: number;
    
    public constructor(viewId: string = 'pacman-preview', statusId = 'pacman-status') {
        this.view = <HTMLCanvasElement>document.getElementById(viewId);
        this.status = <HTMLElement>document.getElementById(statusId);
        this.scene = Renderer(this.view);
        this.scene.background(0, 0, 0);
        this.sprites = [];
        this.assets = {
            spritemap: null
        };
        this.frame = 0;
    }
   
    public loadAssets(): Promise<null[]> {
       const spritemapPromise = new Promise<null>(resolve => {
            let spritemap = new Image();
            spritemap.addEventListener('load', _ => {
                this.assets.spritemap = this.scene.texture(spritemap);
                this.assets.spritemap.frames = {
                    pacman: {},
                    blinky: {},
                    pinky: {},
                    inky: {},
                    clyde: {}
                }
                // Pac-Man
                let xoffset: number = 0;
                let yoffset: number = 0;
                for (let dir of ['right', 'left', 'up', 'down']) {
                    this.assets.spritemap.frames['pacman'][dir] = [
                        this.assets.spritemap.frame(Point(xoffset, yoffset), Point(TILE_SIZE, TILE_SIZE)),
                        this.assets.spritemap.frame(Point(xoffset + TILE_SIZE, yoffset), Point(TILE_SIZE, TILE_SIZE))
                    ];
                    yoffset += TILE_SIZE;
                }
                // Ghosts
                yoffset = TILE_SIZE * 4;
                for (let ghost of ['blinky', 'pinky', 'inky', 'clyde']) {
                    xoffset = 0;
                    for (let dir of ['right', 'left', 'up', 'down']) {
                        this.assets.spritemap.frames[ghost][dir] = [
                            this.assets.spritemap.frame(Point(xoffset, yoffset), Point(TILE_SIZE, TILE_SIZE)),
                            this.assets.spritemap.frame(Point(xoffset + TILE_SIZE, yoffset), Point(TILE_SIZE, TILE_SIZE))
                        ];
                        xoffset += TILE_SIZE * 2;
                    }
                    yoffset += TILE_SIZE;
                }
                // Other
                this.assets.spritemap.frames['wall'] =
                    this.assets.spritemap.frame(Point(TILE_SIZE * 2, TILE_SIZE * 2), Point(TILE_SIZE, TILE_SIZE));
                this.assets.spritemap.frames['small-dot'] =
                    this.assets.spritemap.frame(Point(TILE_SIZE * 3, TILE_SIZE * 2), Point(TILE_SIZE, TILE_SIZE));
                this.assets.spritemap.frames['big-dot'] =
                    this.assets.spritemap.frame(Point(TILE_SIZE * 4, TILE_SIZE * 2), Point(TILE_SIZE, TILE_SIZE));
                resolve(null);
            });
            spritemap.src = spritemapUrl;
        });
        return Promise.all([spritemapPromise]);
    }
    
    public render(state: PacManState): void {
        this.view.width = state.map[0] * TILE_SIZE;
        this.view.height = state.map[1] * TILE_SIZE;
        this.scene.resize();
        this.sprites.forEach(sprite => sprite.remove());
        this.sprites = [];
        for (let y: number = 0; y < state.map[1]; ++y) {
            for (let x: number = 0; x < state.map[0]; ++x) {
                if (state.map[2][y][x] === 0) {
                    this.sprites.push(Sprite(
                        this.assets.spritemap.frames['wall'],
                        { position: Point(x * TILE_SIZE, y * TILE_SIZE) }
                    ));
                } else if (state.map[2][y][x] === 2) {
                    this.sprites.push(Sprite(
                        this.assets.spritemap.frames['small-dot'],
                        { position: Point(x * TILE_SIZE, y * TILE_SIZE) }
                    ));
                } else if (state.map[2][y][x] === 3) {
                    this.sprites.push(Sprite(
                        this.assets.spritemap.frames['big-dot'],
                        { position: Point(x * TILE_SIZE, y * TILE_SIZE) }
                    ));
                }
            }
        }
        for (let name of ['pacman', 'blinky', 'pinky', 'inky', 'clyde']) {
            this.sprites.push(Sprite(
                this.assets.spritemap.frames[name][(state as any)[name][2]][this.frame % 2],
                { position: Point((state as any)[name][0] * TILE_SIZE, (state as any)[name][1] * TILE_SIZE) }
            ));
        }
        this.sprites.forEach(sprite => this.scene.add(sprite));
        this.scene.render();
        this.status.innerHTML = [
            'Lives: ' + state.lives,
            'State: ' + state.state,
            'Super time: ' + state.superTime,
            'Level: ' + state.level,
            'The balls counter: ' + state.ballCount,
            'The ghosts counter: ' + state.ghostCount.total,
            'The Blinky counter: ' + state.ghostCount.blinkyCount,
            'The Pinky counter: ' + state.ghostCount.pinkyCount,
            'The Inky counter: ' + state.ghostCount.inkyCount,
            'The Clyde counter: ' + state.ghostCount.clydeCount,
            'Current frame: ' + this.frame
        ].join('<br>');
        this.frame++;
    }
}