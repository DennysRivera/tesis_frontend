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
      horizontal: true,
      borderRadius: 4,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
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
