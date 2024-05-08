<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import BarChart from "./components/BarChart.vue";
import axios from "axios";

const devices = ref([]);
const intervalId = ref(null);

const getData = () => {
  axios
    .get("https://tesis-dashboard.onrender.com/dashboard")
    .then((response) => {
      console.log(response);
      devices.value = response.data;
      console.log(devices.value[0])
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  getData(), (intervalId.value = setInterval(getData, 60000));
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <div v-for="device in devices">
    <BarChart :device="device"/>
    <h1>ID del dispositivo: {{ device.id }}</h1>
    <h2>Valores registrados:</h2>
    <div v-for="value in device.value">
      <h3>valor: {{ value[0] }}</h3>
      <h3>Hora registrada: {{ value[1] }}</h3>
    </div>
    <h3>Hora de última actualización: {{ device.updatedAt }}</h3>
    <br />
  </div>
</template>
