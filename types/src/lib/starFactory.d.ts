import { Star, MoveParams } from './star';
import { Coords } from './coordinates';
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
