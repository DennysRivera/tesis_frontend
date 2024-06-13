<script setup>
import { onUpdated, ref } from "vue";

const props = defineProps({
  dispositivo: Object,
});

const chartOptions = ref({
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    zoom: {
      enabled: true,
    },
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 4,
    dashArray: [0, 0, 10],
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
  tooltip: {
    y: {
      title: {
        formatter: () =>
          props.dispositivo.medicion.medicion_unidad_abreviatura
            ? props.dispositivo.medicion.medicion_unidad_abreviatura
            : props.dispositivo.medicion.medicion_unidad,
      },
    },
  },
});

const series = ref([
  {
    name: "Mediciones recientes",
    data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
    color: "#000080",
  },
  {
    name: "Promedio actual",
    data: promedioValores(props.dispositivo.lecturasRecientes),
    color: "#0b6623",
  },
  {
    name: "Mediciones 24 horas antes",
    data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
    color: "#ffa500",
  },
]);
/*
if (!props.dispositivo.lecturasAnteriores) {
  series.value = [
    {
      name: "Mediciones recientes",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
    },
    {
      name: "Promedio actual",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
    },
  ];
} else {
  series.value = [
    {
      name: "Mediciones recientes",
      data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
      color: "#000080",
    },
    {
      name: "Promedio actual",
      data: promedioValores(props.dispositivo.lecturasRecientes),
      color: "#0b6623",
    },
    {
      name: "Mediciones 24 horas antes",
      data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
      color: "#ffa500",
    },
  ];
}
*/

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

function promedioValores(lecturas) {
  let promedio = 0;
  let promedioArreglo = [];
  let valores = valoresEnArreglo(lecturas);
  for (let i = 0; i < valores.length; i++) {
    promedio += valores[i];
  }
  promedio = promedio / valores.length;
  for (let i = 0; i < valores.length; i++) {
    promedioArreglo.push(promedio);
  }
  console.log(promedio);
  return promedioArreglo;
}

onUpdated(() => {
  console.log(series);
  ApexCharts.exec(
    "realtime",
    "updateSeries",
    [
      {
        name: "Mediciones recientes",
        data: valoresEnArreglo(props.dispositivo.lecturasRecientes),
        color: "#000080",
      },
      {
        name: "Promedio actual",
        data: promedioValores(props.dispositivo.lecturasRecientes),
        color: "#0b6623",
      },
      {
        name: "Mediciones 24 horas antes",
        data: valoresEnArreglo(props.dispositivo.lecturasAnteriores),
        color: "#ffa500",
      },
    ],
    true
  );

  ApexCharts.exec(
    "realtime",
    "updateOptions",
    {
      xaxis: {
        categories: tiemposEnArreglo(props.dispositivo.lecturasRecientes),
      },
    },
    true,
    true
  );
});
</script>

<template>
  <div id="chart">
    <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
      height="350"
    ></apexchart>
  </div>
</template>

<style>
.apexcharts-tooltip-y-group {
  display: flex;
  flex-direction: row-reverse;
}
.apexcharts-tooltip-text-y-label {
  margin-left: 5px;
}
</style>
