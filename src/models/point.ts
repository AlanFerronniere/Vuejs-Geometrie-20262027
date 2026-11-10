/**
 * Classe Point
 * Représente un point dans un repère à 2 dimensions (x, y)
 */
export default class Point {
    public x: number;
    public y: number;

    /**
     * @param x - Abscisse du point
     * @param y - Ordonnée du point
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Convertit le point en chaîne de caractères
     * @returns ex: "(2, 3)"
     */
    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    /**
     * Calcule la distance euclidienne entre ce point et un autre point (Pythagore)
     * @param autrePoint - L'autre point cible (fortement typé !)
     * @returns Distance calculée
     */
    calculerDistance(autrePoint: Point): number {
        const dx = autrePoint.x - this.x;
        const dy = autrePoint.y - this.y;

        return Math.hypot(dx, dy); // Math.sqrt(dx * dx + dy * dy)
    }
}
