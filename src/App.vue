<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Search from "./components/Search.vue";

export default {
  components: {
    Search,
  },
};
</script>
