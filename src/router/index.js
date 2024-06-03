import { createRouter, createWebHistory } from "vue-router";
import Search from "../components/Search.vue";
import Detail from "../components/Detail.vue";
import AddRecord from "../components/AddRecord.vue";
const routes = [
  {
    path: "/",
    name: "Search",
    component: Search,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
    props: true,
  },
  {
    path: "/add-record",
    name: "AddRecord",
    component: AddRecord,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
