<script setup>
import { ref } from "vue";

const props = defineProps({
  dispositivo: Object,
});

const chartOptions = ref({
  chart: {
    height: 350,
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: "transparent",
  },
  fill: {
    opacity: 1,
  },
  title: {
    text:
      props.dispositivo.medicion.medicion_fenomeno +
      " en " +
      props.dispositivo.ubicacion.ubicacion_nombre,
    align: "left",
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
  let arregloValores = [];
  lecturas.forEach((lectura) => {
    arregloValores.push(lectura.lectura_valor);
  });
  return arregloValores;
}

function tiemposEnArreglo(lecturas) {
  let arregloTiempos = [];
  lecturas.forEach((lectura) => {
    arregloTiempos.push(lectura.createdAt.hora);
  });
  return arregloTiempos;
}
</script>

<template>
  <apexchart
    type="bar"
    :options="chartOptions"
    :series="series"
    height="350"
  ></apexchart>
</template>
