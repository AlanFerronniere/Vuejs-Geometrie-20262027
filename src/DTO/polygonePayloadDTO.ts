export interface PolygonePayloadDTO {
    nom: string;
    points: { x: number; y: number }[]; //un tableau d'objet contenant x et y
}

/*
* {
*   "nom": "Triangle 3-4-5",
*   "points": [
*     { "x": 1, "y": 1 },
*     { "x": 7, "y": 1 },
*     { "x": 1, "y": 9 }
*   ]
* }
 */