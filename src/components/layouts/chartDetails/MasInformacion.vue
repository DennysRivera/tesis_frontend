<script setup>
import { ref } from "vue";
import GraficoDetallado from "./GraficoDetallado.vue";
import Tabla from "../../charts/Tabla.vue";

const tab = ref("grafico");
</script>

<template>
  <div id="mas-informacion-div">
    <div class="botones-container">
      <component
      :is="tab === 'grafico' ? 'button' : 'router-link'"
        :to="{ name: 'grafico-detallado' }"
        class="btn-tab"
        :disabled="tab === 'grafico'"
        @click="tab = 'grafico'"
        >Gráfico</component
      >
      <component
      :is="tab === 'tabla' ? 'button' : 'router-link'"
        :to="{ name: 'tabla-historial' }"
        class="btn-tab"
        :disabled="tab === 'tabla'"
        @click="tab = 'tabla'"
        >Tabla</component
      >
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
#mas-informacion-div {
  height: 90vh;
}

.botones-container {
  width: 100%;
  padding-left: 25px;
  margin-bottom: 10px;
  border-bottom: 2px rgb(114, 104, 104, 0.5) solid;
}

.btn-tab {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  margin-bottom: -2px;
  border: 2px rgb(114, 104, 104, 0) solid;
  border-radius: 10px 10px 0 0;
  background: none;
  color: black;
  text-decoration: none;
}

.btn-tab:hover {
  color: #48cae4;
  background: none;
  border-left: 2px rgb(114, 104, 104, 0.5) solid;
  border-right: 2px rgb(114, 104, 104, 0.5) solid;
  border-top: 2px rgb(114, 104, 104, 0.5) solid;
  border-bottom: 2px rgb(255, 255, 255) solid;
}

.btn-tab:disabled {
  color: #48cae4;
  border-left: 2px rgb(114, 104, 104, 0.5) solid;
  border-right: 2px rgb(114, 104, 104, 0.5) solid;
  border-top: 2px rgb(114, 104, 104, 0.5) solid;
  border-bottom: 2px rgb(255, 255, 255) solid;
}

.boton{
    background-color: blue;
}
</style>