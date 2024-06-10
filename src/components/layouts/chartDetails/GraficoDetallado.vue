<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import LineChart from "../../charts/LineChart.vue";
import ColumnChart from "../../charts/ColumnChart.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";
import Alerta from "@/components/misc/Alerta.vue";

const route = useRoute();
const dispositivos = ref([]);
const intervalId = ref(null);
const graficosDisponibles = shallowRef([LineChart, ColumnChart, Area, Barra]);
const graficoActualNumero = ref(0);
const show = ref(false);
const mostrarAlerta = ref(false);

const obtenerDatos = async () => {
  let apiUrl = import.meta.env.VITE_API_URL;
  await axios
    .get(`${apiUrl}/${route.params.dispositivoId}`)
    .then((response) => {
      dispositivos.value = response.data;
    })
    .catch((error) => {
      mostrarAlerta.value = true;
    });
};

onMounted(async () => {
  await obtenerDatos();
  intervalId.value = setInterval(obtenerDatos, 60000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <Alerta v-model="mostrarAlerta" />
  <div id="grafico-detallado-container">
    <div v-for="dispositivo in dispositivos" class="grafico-div">
      <BDropdown v-model="show" text="Cambiar gráfico" variant="primary">
        <BDropdownItem
          v-for="(grafico, index) in graficosDisponibles"
          @click="graficoActualNumero = index"
          :disabled="index === graficoActualNumero"
        >
          {{ grafico.__name }}
        </BDropdownItem>
      </BDropdown>
      <component
        :is="graficosDisponibles[graficoActualNumero]"
        :dispositivo="dispositivo"
      />
    </div>
  </div>
</template>
