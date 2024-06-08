<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import LineChart from "../../charts/LineChart.vue";
import ColumnChart from "../../charts/ColumnChart.vue";
import axios from "axios";


const route = useRoute();
const dispositivo = ref({});
const intervalId = ref(null);
const graficosDisponibles = shallowRef([LineChart, ColumnChart]);
const graficoActualNumero = ref(0);

const obtenerDatos = async () => {
  let apiUrl = import.meta.env.VITE_API_URL;
  await axios
    .get(`${apiUrl}/${route.params.dispositivoId}`)
    .then((response) => {
      //console.log(response.data);
      dispositivo.value = response.data;
      console.log(dispositivo.value);
      console.log(typeof dispositivo.value)
    })
    .catch((error) => {
      console.log(error);
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
  <div id="grafico-detallado-container">
    <div class="grafico-div">
      <component
        :is="graficosDisponibles[graficoActualNumero]"
        :dispositivo="dispositivo"
      />
    </div>
  </div>
</template>
