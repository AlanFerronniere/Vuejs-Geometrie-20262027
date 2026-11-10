import Point from "./point";
import Polygone from "./polygone";

/**
 * Classe Triangle
 * Hérite de Polygone (avec mot-clé standard 'extends' et 'super')
 */
export default class Triangle extends Polygone {
    /**
     * @param p1 - Premier sommet
     * @param p2 - Deuxième sommet
     * @param p3 - Troisième sommet
     */
    constructor(p1: Point, p2: Point, p3: Point) {
        // En TypeScript / ES6, super(...) remplace :
        // Polygone.call(this, [p1, p2, p3]) et Object.create(Polygone.prototype) !
        super([p1, p2, p3]);
    }

    /**
     * Calcule l'aire du triangle avec la Formule de Héron :
     * Soit a, b, c les 3 côtés et s le demi-périmètre : s = (a + b + c) / 2
     * Aire = √(s * (s - a) * (s - b) * (s - c))
     *
     * @returns Aire du triangle
     */
    calculerAire(): number {
        const [p1, p2, p3] = this.points;

        const a = p1.calculerDistance(p2);
        const b = p2.calculerDistance(p3);
        const c = p3.calculerDistance(p1);

        const s = this.calculerPerimetre() / 2;
        const produitHeron = s * (s - a) * (s - b) * (s - c);

        if (produitHeron < 0) return 0;
        return Math.sqrt(produitHeron);
    }
}
