import Point from "./point";
import Polygone from "./polygone";
import Triangle from "./triangle";

/**
 * Classe Quadrilatere
 * Hérite de Polygone et calcule son aire par triangulation (2 triangles de Héron)
 */
export default class Quadrilatere extends Polygone {
    /**
     * @param p1 - Premier sommet (A)
     * @param p2 - Deuxième sommet (B)
     * @param p3 - Troisième sommet (C)
     * @param p4 - Quatrième sommet (D)
     */
    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
        super([p1, p2, p3, p4]);
    }

    /**
     * Calcule l'aire du quadrilatère en appliquant la Formule de Héron.
     * Tout quadrilatère simple ABCD est divisé par sa diagonale [AC] en 2 triangles : ΔABC et ΔACD.
     * Aire(ABCD) = Aire(ΔABC) + Aire(ΔACD)
     *
     * @returns Aire totale du quadrilatère
     */
    calculerAire(): number {
        const [p1, p2, p3, p4] = this.points;

        const triangle1 = new Triangle(p1, p2, p3);
        const triangle2 = new Triangle(p1, p3, p4);

        return triangle1.calculerAire() + triangle2.calculerAire();
    }
}
