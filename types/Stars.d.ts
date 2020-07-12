declare type StarObject = {
    x: any;
    y: any;
    z: any;
    from: any;
    to: any;
};
export declare class Stars {
    store: StarObject[];
    x_save: any;
    y_save: any;
    speed_save: number;
    constructor(count: Number, width: number, height: number, startX: number, startY: number, startZ: number);
}
export default Stars;
