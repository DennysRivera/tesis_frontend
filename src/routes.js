import { createMemoryHistory, createRouter } from "vue-router";

import Dashboard from "./components/layouts/dashboard/Dashboard.vue";
import GraficoDetallado from "./components/layouts/chartDetails/GraficoDetallado.vue";

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: Dashboard
    },
    {
        path: "/grafico-detallado/:dispositivoId",
        name: "grafico-detallado",
        component: GraficoDetallado
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;