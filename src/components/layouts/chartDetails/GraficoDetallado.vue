<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { axiosCliente } from "@/config/axios.js";
import LineChart from "../../charts/LineChart.vue";
import Linea from "../../charts/Linea.vue";
import ColumnChart from "../../charts/ColumnChart.vue";
import Columna from "../../charts/Columna.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";
import Alerta from "@/components/misc/Alerta.vue";
import Tabla from "@/components/charts/Tabla.vue";

const route = useRoute();
const dispositivos = ref([]);
const intervalId = ref(null);
const graficosDisponibles = shallowRef([LineChart, Linea, ColumnChart, Columna, Area, Barra, Tabla]);
const graficoActualNumero = ref(0);
const show = ref(false);
const mostrarAlerta = ref(false);

const obtenerDatos = async () => {
  await axiosCliente
    .get(`${route.params.dispositivoId}`)
    .then((response) => {
      dispositivos.value = response.data;
    })
    .catch((error) => {
      mostrarAlerta.value = true;
    });
};

onMounted(async () => {
  await obtenerDatos();
  intervalId.value = setInterval(obtenerDatos, 60000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <Alerta v-model="mostrarAlerta" />
  <div id="grafico-detallado-container">
    <div v-for="dispositivo in dispositivos" class="grafico-div">
      <BDropdown v-model="show" text="Cambiar gráfico" variant="primary">
        <BDropdownItem
          v-for="(grafico, index) in graficosDisponibles"
          @click="graficoActualNumero = index"
          :disabled="index === graficoActualNumero"
        >
          {{ grafico.__name }}
        </BDropdownItem>
      </BDropdown>
      <component
        :is="graficosDisponibles[graficoActualNumero]"
        :dispositivo="dispositivo"
      />
    </div>
  </div>
  <div id="informacion-medida">
    <h2>Información sobre esta medición</h2>
    <h3>{{ dispositivos[0] ? dispositivos[0].medicion.medicion_fenomeno : "" }}</h3>
    <p>{{ dispositivos[0] ? dispositivos[0].medicion.medicion_descripcion: "" }}</p>
  </div>
</template>
