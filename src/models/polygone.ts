import Point from "./point";
import type IForme from "./iForme.ts";

/**
 * Classe abstraite Polygone
 * Implémente l'interface IForme et sert de base à toutes les figures fermées.
 * Elle fournit le calcul générique du périmètre et oblige les classes filles à implémenter calculerAire().
 */
export default abstract class Polygone implements IForme{
    // La liste de points est typée comme un tableau d'instances de Point
    public points: Point[];

    /**
     * @param points - Tableau d'au moins 3 points définissant les sommets du polygone
     */
    constructor(points: Point[]) {
        if (points.length < 3) {
            throw new Error(`Un polygone nécessite au moins 3 points (reçu : ${points.length}).`);
        }

        // Crée une copie superficielle pour protéger la liste interne
        this.points = points.slice();
    }

    /**
     * Je ne sais pas le coder, je transmets le bébé aux classes filles
     */
    abstract calculerAire():number;

    /**
     * Calcule le périmètre du polygone.
     * Somme des distances entre chaque paire de sommets consécutifs en fermant la figure.
     * @returns Périmètre total
     */
    public calculerPerimetre(): number {
        let perimetre = 0;

        // Du premier à l'avant-dernier point
        for (let i = 0; i < this.points.length - 1; i++) {
            perimetre += this.points[i].calculerDistance(this.points[i + 1]);
        }

        // On ferme le polygone en reliant le dernier point au premier
        perimetre += this.points[this.points.length - 1].calculerDistance(this.points[0]);

        return perimetre;
    }

    /**
     * Affiche les coordonnées de tous les sommets séparés par un point-virgule
     */
    public toString(): string {
        return this.points.map((p) => p.toString()).join(" ; ");
    }
}
