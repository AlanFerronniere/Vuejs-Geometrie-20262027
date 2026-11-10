import Point from "./point";
import type IForme from "./iForme.ts";

export default class Cercle implements IForme {
    public centre: Point;
    public rayon: number;

    constructor(centre: Point, rayon: number) {
        this.centre = centre;
        this.rayon = rayon;
    }

    calculerPerimetre(): number {
        return Math.PI * this.rayon * 2;
    }

    calculerAire(): number {
        return Math.PI * this.rayon**2;
    }
}