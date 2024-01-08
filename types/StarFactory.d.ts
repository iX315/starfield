import { Star } from './Star';
import type { MoveParams } from './Star';
import type { Coords } from './Starfield';
interface StarFactoryParams extends Coords {
    count: number;
    width: number;
    height: number;
}
export declare class StarFactory {
    store: Star[];
    params: StarFactoryParams;
    constructor(params: StarFactoryParams);
    createStar(): Star;
    destroyStar(i: number): void;
    move(params: MoveParams): void;
}
export {};
