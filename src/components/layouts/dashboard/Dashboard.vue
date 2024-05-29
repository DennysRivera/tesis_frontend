<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import axios from "axios";
import TarjetaInformativa from "@/components/layouts/dashboard/TarjetaInformativa.vue";
import LineChart from "@/components/charts/LineChart.vue";
import ColumnChart from "@/components/charts/ColumnChart.vue";

const dispositivos = ref([]);
const intervalId = ref(null);
const numerosAleatorios = ref([]);

const obtenerDatos = async () => {
  let apiUrl = import.meta.env.VITE_API_URL;
  await axios
    .get(`${apiUrl}/dashboard`)
    .then((response) => {
      console.log(response);
      dispositivos.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const crearNumerosAleatorios = (cantidadDispositivos) => {
  let numerosAleatorios = [];
  let max = cantidadDispositivos > 3 ? 3 : cantidadDispositivos;
  for (let i = 0; i < max; i++) {
    numerosAleatorios.push(i);
  }
  numerosAleatorios.sort(() => Math.random() - 0.5);
  return numerosAleatorios;
};

onMounted(async () => {
  await obtenerDatos();
  numerosAleatorios.value = crearNumerosAleatorios(dispositivos.value.length);
  intervalId.value = setInterval(obtenerDatos, 60000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <div id="tarjetas-informativas-div">
    <TarjetaInformativa
      titulo="Medidores registrados"
      :valor="dispositivos.length"
    />

    <TarjetaInformativa
      v-for="n in numerosAleatorios"
      :titulo="dispositivos[n].medicion.medicion_fenomeno"
      :ubicacion="dispositivos[n].ubicacion.ubicacion_nombre"
      :valor="dispositivos[n].lecturasRecientes[0].lectura_valor"
      :unidad="
        dispositivos[n].medicion.medicion_unidad_abreviatura
          ? dispositivos[n].medicion.medicion_unidad_abreviatura
          : dispositivos[n].medicion.medicion_unidad
      "
    />
  </div>

  <div id="graficos-container">
    <div v-for="dispositivo in dispositivos" class="grafico-div">
    <LineChart :dispositivo="dispositivo" />
    <ColumnChart :dispositivo="dispositivo" />
  </div>
  </div>
</template>

<style scoped>
#tarjetas-informativas-div {
  width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: blue;
}

#graficos-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.grafico-div {
  width: 40%;
}

@media (max-width: 1070) {
  #tarjetas-informativas-div {
    width: 90vw;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: blue;
  }
}
</style>
