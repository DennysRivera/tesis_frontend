<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    aria-label="Fotorresistencias"
  />
</template>

<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  device: Object,
});

function valuesToArray(device) {
  let valuesArray = [];
  device.value.forEach((arr) => {
    valuesArray.push(Number(arr[0]));
  });
  return valuesArray;
}

function timesToArray(device) {
  let timesArray = [];
  device.value.forEach((arr) => {
    timesArray.push(arr[1]);
  });
  return timesArray;
}

const chartData = ref({
  labels: timesToArray(props.device),
  datasets: [
    {
      label: "Fotorresistencias",
      backgroundColor: "#f87979",
      data: valuesToArray(props.device),
    },
  ],
});
const chartOptions = ref({
  responsive: true,
});
</script>
