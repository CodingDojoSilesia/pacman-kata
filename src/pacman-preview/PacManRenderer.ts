// @ts-ignore:
import spritemapUrl from "../public/spritemap.png";

import Renderer from 'js13k-2d';

const { Point, Sprite } = Renderer;
const TILE_SIZE = 24;

interface PacManState {
    pacmanPosition: [number, number];
    blinkyPosition: [number, number];
    pinkyPosition: [number, number];
    inkyPosition: [number, number];
    clydePosition: [number, number];
    mapSize: [number, number];
    mapData: number[][];
};

interface Assets {
    spritemap: any;
}

class PacManRenderer {
    private view: HTMLCanvasElement;
    private scene: any;
    private sprites: any[];
    private assets: Assets;
    
    public constructor(viewId: string = 'pacman-preview') {
        this.view = <HTMLCanvasElement>document.getElementById(viewId);
        this.scene = Renderer(this.view);
        this.scene.background(0, 0, 0);
        this.sprites = [];
        this.assets = {
            spritemap: null
        };
    }
    
    public loadAssets(): Promise<null[]> {
        const spritemapPromise = new Promise<null>(resolve => {
            let spritemap = new Image();
            spritemap.addEventListener('load', _ => {
                this.assets.spritemap = this.scene.texture(spritemap);
                resolve(null);
            });
            spritemap.src = spritemapUrl;
        });
        return Promise.all([spritemapPromise]);
    }
    
    public render(state: PacManState): void {
        this.view.width = state.mapSize[0] * TILE_SIZE;
        this.view.height = state.mapSize[1] * TILE_SIZE;
        this.scene.resize();
        const sprite = Sprite(this.assets.spritemap.frame(Point(0, 0), Point(24, 24)));
        this.scene.add(sprite);
        this.scene.render();
    }
}

export default PacManRenderer;