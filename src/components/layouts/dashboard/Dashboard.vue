<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import axios from "axios";
import TarjetaInformativa from "@/components/layouts/dashboard/TarjetaInformativa.vue";
import LineChart from "@/components/charts/LineChart.vue";
import ColumnChart from "@/components/charts/ColumnChart.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";
import Alerta from "@/components/misc/Alerta.vue";

const dispositivos = ref([]);
const intervalId = ref(null);
const numerosAleatorios = ref([]);
const graficosDisponibles = shallowRef([LineChart, ColumnChart, Area, Barra]);
let graficosAleatoriosNumeros = [];
const mostrarAlerta = ref(false);

const obtenerDatos = async () => {
  let apiUrl = import.meta.env.VITE_API_URL;
  await axios
    .get(`${apiUrl}/dashboard`)
    .then((response) => {
      dispositivos.value = response.data;
    })
    .catch((error) => {
      mostrarAlerta.value = true;
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

const crearGraficosAleatoriosNumeros = (cantidadDispositivos) => {
  let numerosAleatorios = [];
  for (let i = 0; i < cantidadDispositivos; i++) {
    numerosAleatorios.push(
      Math.floor(Math.random() * graficosDisponibles.value.length)
    );
  }
  return numerosAleatorios;
};

onMounted(async () => {
  await obtenerDatos();
  numerosAleatorios.value = crearNumerosAleatorios(dispositivos.value.length);
  graficosAleatoriosNumeros = crearGraficosAleatoriosNumeros(
    dispositivos.value.length
  );
  intervalId.value = setInterval(obtenerDatos, 60000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <Alerta v-model="mostrarAlerta" />
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
    <div v-for="(dispositivo, index) in dispositivos" class="grafico-div">
      <BButton
        variant="outline-info"
        size="sm"
        :to="{
          name: 'grafico-detallado',
          params: { dispositivoId: dispositivo.dispositivo_id },
        }"
        >Más información</BButton
      >
      <component
        :is="graficosDisponibles[graficosAleatoriosNumeros[index]]"
        :dispositivo="dispositivo"
      />
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
}

#graficos-container {
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
    background-color: red;
  }
}
</style>
