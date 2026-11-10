import type {PointDTO} from "./pointDTO";

export interface PolygoneDTO {
    id: number;
    nom: string;
    createdAt: string;
    points: PointDTO[];
}