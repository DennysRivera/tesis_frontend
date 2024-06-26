<script setup>
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import { axiosCliente } from "@/config/axios.js";
import TarjetaInformativa from "@/components/layouts/dashboard/TarjetaInformativa.vue";
import LineChart from "@/components/charts/LineChart.vue";
import ColumnChart from "@/components/charts/ColumnChart.vue";
import Area from "@/components/charts/Area.vue";
import Barra from "@/components/charts/Barra.vue";
import Alerta from "@/components/misc/Alerta.vue";

const dispositivos = ref([]);
const numerosAleatorios = ref([]);
const graficosDisponibles = shallowRef([LineChart, ColumnChart, Area, Barra]);
let graficosAleatoriosNumeros = [];
const mostrarAlerta = ref(false);

const obtenerDatos = async () => {
  let fechaInicio = new Date(Date.now());
  fechaInicio.setDate(fechaInicio.getDate() - 1);
  fechaInicio = fechaInicio.toISOString().slice(0, 10);

  await axiosCliente
    .get("dashboard", {
      params: {
        fechaInicio,
      },
    })
    .then((response) => {
    console.log(response.data)
      dispositivos.value = response.data;
      convertirFechaIso(dispositivos.value);
    })
    .catch((error) => {
      mostrarAlerta.value = true;
    });
};

const convertirFechaIso = (dispositivos) => {
  dispositivos.forEach((dispositivo) => {
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
      :valor="
        dispositivos[n].lecturasRecientes[
          dispositivos[n].lecturasRecientes.length - 1
        ].lectura_valor
      "
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
