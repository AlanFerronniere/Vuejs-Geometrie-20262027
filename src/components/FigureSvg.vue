<script setup lang="ts">
import { computed } from 'vue';
import type Point from '../models/point';

// Props fortement typées avec l'API générique de Vue 3 + TypeScript
interface Props {
  points: Point[];
}

const props = withDefaults(defineProps<Props>(), {
  points: () => []
});

// Dimensions du repère SVG
const width: number = 360;
const height: number = 240;
const scale: number = 22; // Pixels par unité
const originX: number = 30;
const originY: number = height - 30;

// Transformation des coordonnées (x, y) réelles en coordonnées SVG (pixels)
const pointsPourSvg = computed<string>(() => {
  return props.points
    .map(p => `${originX + p.x * scale},${originY - p.y * scale}`)
    .join(' ');
});
</script>

<template>
  <div class="d-flex justify-content-center my-3">
    <svg :width="width" :height="height" class="border rounded bg-light shadow-sm">
      <!-- Axe X -->
      <line :x1="originX" :y1="originY" :x2="width - 10" :y2="originY" stroke="#6c757d" stroke-width="2" />
      <text :x="width - 20" :y="originY + 18" fill="#6c757d" font-size="12">X</text>

      <!-- Axe Y -->
      <line :x1="originX" :y1="originY" :x2="originX" :y2="10" stroke="#6c757d" stroke-width="2" />
      <text :x="originX - 18" :y="20" fill="#6c757d" font-size="12">Y</text>

      <!-- Polygone fermé (s'il y a au moins 3 points) -->
      <polygon
        v-if="points.length >= 3"
        :points="pointsPourSvg"
        fill="rgba(13, 110, 253, 0.2)"
        stroke="#0d6efd"
        stroke-width="3"
      />

      <!-- Lignes partielles si 2 points -->
      <polyline
        v-else-if="points.length === 2"
        :points="pointsPourSvg"
        fill="none"
        stroke="#0d6efd"
        stroke-dasharray="4 4"
        stroke-width="2"
      />

      <!-- Dessin de chaque sommet individuel -->
      <g v-for="(p, index) in points" :key="index">
        <circle
          :cx="originX + p.x * scale"
          :cy="originY - p.y * scale"
          r="6"
          fill="#0d6efd"
          stroke="#ffffff"
          stroke-width="2"
        />
        <text
          :x="originX + p.x * scale + 8"
          :y="originY - p.y * scale - 6"
          font-size="12"
          font-weight="bold"
          fill="#212529"
        >
          P{{ index + 1 }} {{ p }}
        </text>
      </g>
    </svg>
  </div>
</template>
