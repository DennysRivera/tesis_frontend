<script setup>
import { onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import axios from 'axios';

const devices = ref([]);

const getData = () => {
  axios.get("https://tesis-dashboard.onrender.com/dashboard").then((response) => {
    console.log(response);
    devices.value = response.data
  }).catch((error) => {
    console.log(error)
  })
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div v-for="device in devices">
    <h1>ID del dispositivo{{ device.id }}</h1>
    <h2>Último valor registrado: {{ device.value }}</h2>
    <h3>Hora de última actualización: {{ device.updatedAt }}</h3>
  </div>
</template>