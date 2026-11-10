<script setup lang="ts">
import {ref, computed} from 'vue';
import Point from './models/point';
import Triangle from './models/triangle';

const rxA = ref<number>(0);
const ryA = ref<number>(0);

const rxB = ref<number>(0);
const ryB = ref<number>(0);

const pointA = computed<Point>(() => new Point(rxA.value, ryA.value));
const pointB = computed<Point>(() => new Point(rxB.value, ryB.value));

const distance = computed<number>(() => pointA.value.calculerDistance(pointB.value));

//Etape 2 : un triangle
const sommets = ref<Point[]>([new Point(1, 1), new Point(1, 2), new Point(2, 1)]);
const nouveauX = ref<number>(0);
const nouveauY = ref<number>(0);

const triangle = computed<Triangle | null>(() => {
  if (sommets.value.length == 3)
    return new Triangle(sommets.value[0], sommets.value[1], sommets.value[2]);
  else
    return null;
});
//je peux faire un ref pour le périmètre
const perimetre = computed<number>(() => triangle.value != null ? triangle.value.calculerPerimetre() : 0);

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
        Point A : ({{ pointA }})
        Point B : ({{ pointB }})
        Distance : {{ distance.toFixed(2) }}
      </div>
    </div>
  </div>
  <!--  Etape 2-->
  <div class="card mt-4">
    <div class="card-header">
      <h2>Triangle interactif 😊</h2>
    </div>
    <div class="card-body">
      <div v-if="sommets.length<3">
        Nouveau point
        <div class="row">
          <div class="col-6">
            <label class="form-label">x :</label>
            <input type="number" step="1" class="form-control" v-model="nouveauX">
          </div>
          <div class="col-6">
            <label class="form-label">y :</label>
            <input type="number" step="1" class="form-control" v-model="nouveauX">
          </div>
        </div>
        <button type="submit" class="btn btn-sm btn-primary mt-3" @click="ajouterSommet">+ Ajouter Sommet</button>
      </div>
      <h3>Sommets du triangle :</h3>
      <div class="d-flex flex-wrap gap-2">
        <span class="badge text-bg-primary"
              v-for="(p, index) in sommets"
              :key="index">
          P{{ index + 1 }} {{ p }}
          <button type="button" class="btn-close btn-close-white"
                  @click="supprimerSommet(index)"></button>
        </span>
      </div>
      <div v-if="sommets.length==3" class="mt-2">
        <h3>Périmètre & Aire</h3>
        Périmètre : {{ perimetre }} - Aire : {{ triangle?.calculerAire() }}
      </div>

    </div>
  </div>
</template>
