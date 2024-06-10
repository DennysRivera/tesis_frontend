<script setup>
import { ref } from "vue";

const props = defineProps({
  dispositivo: Object,
});

const chartOptions = ref({
  chart: {
    height: 350,
    type: "area",
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 2,
  },
  title: {
    text: props.dispositivo.medicion.medicion_fenomeno,
    align: "left",
    margin: 0,
    style: {
      fontSize: "20px",
      color: "black",
    },
  },
  subtitle: {
    text: `en ${props.dispositivo.ubicacion.ubicacion_nombre}`,
    align: "left",
    margin: 0,
    style: {
      fontSize: "15px",
    },
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: tiemposEnArreglo(props.dispositivo.lecturasRecientes),
    title: {
      text: "Hora de medición",
      style: {
        fontSize: "15px",
        color: "black",
      },
    },
  },
  yaxis: {
    title: {
      text: "Valor de la medición",
      style: {
        fontSize: "15px",
        color: "black",
      },
    },
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
  let valuesArray = [];
  lecturas.forEach((lectura) => {
    valuesArray.push(lectura.lectura_valor);
  });
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
    type="area"
    :options="chartOptions"
    :series="series"
    height="350"
  ></apexchart>
</template>
