<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { axiosCliente } from "@/config/axios.js";
import Linea from "../../charts/Linea.vue";
import Columna from "../../charts/Columna.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";
import Alerta from "@/components/misc/Alerta.vue";

const route = useRoute();
const dispositivos = ref([]);
const intervalId = ref(null);
const graficosDisponibles = shallowRef([Linea, Columna, Area, Barra]);
const graficoActualNumero = ref(0);
const show = ref(false);
const mostrarAlerta = ref(false);

const obtenerDatos = async () => {
  await axiosCliente
    .get(`${route.params.dispositivoId}`)
    .then((response) => {
      console.log(response.data)
      dispositivos.value = response.data;
      convertirFechaIso(dispositivos.value[0]);
    })
    .catch((error) => {
      mostrarAlerta.value = true;
    });
};

const convertirFechaIso = (dispositivo) => {
    dispositivo.lecturasRecientes.forEach((lectura) => {
      lectura.createdAt = {
        hora: new Date(lectura.createdAt).toLocaleTimeString(undefined, {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        fecha: new Date(lectura.createdAt).toLocaleDateString("es-SV"),
      };
    });
    dispositivo.lecturasAnteriores.forEach((lectura) => {
      lectura.createdAt = {
        hora: new Date(lectura.createdAt).toLocaleTimeString(undefined, {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        fecha: new Date(lectura.createdAt).toLocaleDateString("es-SV"),
      };
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
