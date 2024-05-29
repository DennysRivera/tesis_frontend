<script setup>
import { ref } from "vue";

const props = defineProps({
  dispositivo: Object,
});

const chartOptions = ref({
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  title: {
    text:
      props.dispositivo.medicion.medicion_fenomeno +
      " en " +
      props.dispositivo.ubicacion.ubicacion_nombre,
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: tiemposEnArreglo(props.dispositivo.lecturasRecientes),
  },
});

const series = ref([
  {
    name: props.dispositivo.medicion.medicion_unidad_abreviatura
      ? props.dispositivo.medicion.medicion_unidad_abreviatura
      : props.dispositivo.medicion.medicion_unidad,
    data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
  },
]);

function valoresEnArreglo(lecturas) {
  console.log(lecturas);
  let valuesArray = [];
  lecturas.forEach((lectura) => {
    valuesArray.push(lectura.lectura_valor);
  });
  console.log("array", valuesArray);
  return valuesArray;
}

function tiemposEnArreglo(lecturas) {
  let timesArray = [];
  lecturas.forEach((lectura) => {
    timesArray.push(lectura.createdAt.hora);
  });
  return timesArray;
}
</script>

<template>
  <apexchart
    type="line"
    :options="chartOptions"
    :series="series"
    height="350"
  ></apexchart>
</template>
