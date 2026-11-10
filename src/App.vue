<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import Point from './models/point';
import Triangle from './models/triangle';
import type IForme from "./models/iForme.ts";
import Quadrilatere from "./models/quadrilatere.ts";
import FigureSvg from "./components/FigureSvg.vue";
import type {PolygoneDTO} from "./DTO/polygoneDTO";
import type {PolygonePayloadDTO} from "./DTO/polygonePayloadDTO";

//URL de l'API
const API_URL: string = "https://127.0.0.1:8000/api/polygones";

const rxA = ref<number>(0);
const ryA = ref<number>(0);

const rxB = ref<number>(0);
const ryB = ref<number>(0);

const pointA = computed<Point>(() => new Point(rxA.value, ryA.value));
const pointB = computed<Point>(() => new Point(rxB.value, ryB.value));

const distance = computed<number>(() => pointA.value.calculerDistance(pointB.value));

//Etape 2 : une forme
const nom = ref<string>("Ma forme");
const sommets = ref<Point[]>([new Point(1, 1), new Point(1, 2), new Point(2, 1)]);
const nouveauX = ref<number>(0);
const nouveauY = ref<number>(0);

const typeDeForme = computed<string>(() => {
  if (sommets.value.length == 3)
    return "Triangle";
  else if (sommets.value.length == 4)
    return "Quadrilatère";
  else
    return "...";
});

const forme = computed<IForme | null>(() => {
  if (sommets.value.length == 3)
    return new Triangle(sommets.value[0], sommets.value[1], sommets.value[2]);
  else if (sommets.value.length == 4)
    return new Quadrilatere(sommets.value[0], sommets.value[1], sommets.value[2], sommets.value[3]);
  else
    return null;
});
//je peux faire un ref pour le périmètre
const perimetre = computed<number>(() => forme.value != null ? forme.value.calculerPerimetre() : 0);

//mais je peux utiliser directement la méthode dans la vue aussi (voir calculerAire() dessous)

function ajouterSommet(): void {
  //push c'est pour ajouter un élément dans un tableau
  sommets.value.push(new Point(nouveauX.value, nouveauY.value));
}

function supprimerSommet(index: number): void {
  //splice c'est pour supprimer des cases de tableau à partir d'un index et
  //du nombre de case qu'on veut enlever
  sommets.value.splice(index, 1);
}

//Gestion de l'API
const polygonesEnregistres = ref<PolygoneDTO[]>([]);
const chargementEnCours = ref<boolean>(false);

async function chargerPolygonesDepuisLAPI(): Promise<void> {
  try {
    chargementEnCours.value=true;
    const response = await fetch(API_URL);
    if (!response.ok)
      throw new Error(`HTTP ${response.status}`);
    polygonesEnregistres.value = await response.json();
  } catch (error) {
    //todo gérer l'erreur
  }
  finally {
    chargementEnCours.value=false;
  }
}

//au chargement on charge les polygones de la BDD
onMounted(() => {
  chargerPolygonesDepuisLAPI();
});

function chargerPolygoneDansCanvas(polygone: PolygoneDTO): void {
  nom.value = polygone.nom;
  sommets.value = polygone.points.map(pDTO => new Point(pDTO.x, pDTO.y));
}

async function supprimerPolygoneDansLAPI(id: number): Promise<void> {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le polygone d'id ${id} ?`)) return;

  try {
    chargementEnCours.value=true;

    const response = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    if (!response.ok)
      throw new Error(`HTTP ${response.status}`);
    //si ça marche on rafraichit la liste
    await chargerPolygonesDepuisLAPI();
  } catch (error) {
    //todo gérer l'erreur
  }
  finally {
    chargementEnCours.value=false;
  }
}

async function ajouterPolygoneDansLAPI(): Promise<void> {
  try {
    chargementEnCours.value=true;

    const payload: PolygonePayloadDTO = {
      nom: nom.value,
      points: sommets.value.map(p => ({x: p.x, y: p.y}))
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, //pour être sûr c'est plus propre
      body: JSON.stringify(payload)
    });

    if (!response.ok)
      throw new Error(`HTTP ${response.status}`);
    //si ça marche on rafraichit la liste
    await chargerPolygonesDepuisLAPI();
  } catch (error) {
    //todo gérer l'erreur
  }
  finally {
    chargementEnCours.value=false;
  }
}

</script>

<template>
  <div class="card">
    <div class="card-header"><h2>Point interactif avec ref</h2></div>
    <div class="card-body">
      Point A
      <div class="row">
        <div class="col-6">
          <label class="form-label">x :</label>
          <input type="number" step="1" class="form-control" v-model="rxA">
        </div>
        <div class="col-6">
          <label class="form-label">y :</label>
          <input type="number" step="1" class="form-control" v-model="ryA">
        </div>
      </div>
      Point B
      <div class="row">
        <div class="col-6">
          <label class="form-label">x :</label>
          <input type="number" step="1" class="form-control" v-model="rxB">
        </div>
        <div class="col-6">
          <label class="form-label">y :</label>
          <input type="number" step="1" class="form-control" v-model="ryB">
        </div>
      </div>
      <div class="alert alert-info mt-3">
        Point A : {{ pointA }}
        Point B : {{ pointB }}
        Distance : {{ distance.toFixed(2) }}
      </div>
    </div>
  </div>
  <!--  Etape 2-->
  <div class="card mt-4">
    <div class="card-header">
      <h2>{{ typeDeForme }} interactif 😊</h2>
      <input class="form-control" v-model="nom" placeholder="Nom de la figure" type="text">
    </div>
    <div class="card-body">
      <FigureSvg :points="sommets"/>
      <div v-if="sommets.length < 4">
        Nouveau point
        <div class="row">
          <div class="col-6">
            <label class="form-label">x :</label>
            <input type="number" step="1" class="form-control" v-model="nouveauX">
          </div>
          <div class="col-6">
            <label class="form-label">y :</label>
            <input type="number" step="1" class="form-control" v-model="nouveauY">
          </div>
        </div>
        <button type="submit" class="btn btn-sm btn-primary mt-3" @click="ajouterSommet">+ Ajouter Sommet</button>
      </div>
      <h3>Sommets du {{ typeDeForme }} :</h3>
      <div class="d-flex flex-wrap gap-2">
        <span class="badge text-bg-primary"
              v-for="(p, index) in sommets"
              :key="index">
          P{{ index + 1 }} {{ p }}
          <button type="button" class="btn-close btn-close-white"
                  @click="supprimerSommet(index)"></button>
        </span>
      </div>
      <div v-if="sommets.length >= 3" class="mt-2">
        <h3>Périmètre & Aire</h3>
        Périmètre : {{ perimetre }} - Aire : {{ forme?.calculerAire() }}
        <br>
        <button type="button" class="btn btn-success" @click="ajouterPolygoneDansLAPI">Enregistrer</button>
      </div>
    </div>
  </div>
  <div class="card mt-4">
    <div class="card-header">
      <h2>Polygones de la BDD</h2>
      <button type="button" class="btn btn-sm btn-primary"
              @click="chargerPolygonesDepuisLAPI">Actualiser
      </button>
    </div>
    <div class="card-body">
      <div v-if="chargementEnCours">Chargement...</div>
      <div v-if="!chargementEnCours && polygonesEnregistres.length>0">
        <div class="d-flex flex-wrap gap-2">
          <div class="card" v-for="poly in polygonesEnregistres" :key="poly.id">
            <div class="card-header">{{ poly.id }} {{ poly.nom }}</div>
            <div class="card-body">
              {{ poly.points.map(p => `(${p.x},${p.y})`).join(" ; ") }}
              <button type="button" class="btn btn-sm btn-success"
                      @click="chargerPolygoneDansCanvas(poly)">charger
              </button>
              <button type="button" class="btn btn-sm btn-danger"
                      @click="supprimerPolygoneDansLAPI(poly.id)">supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>