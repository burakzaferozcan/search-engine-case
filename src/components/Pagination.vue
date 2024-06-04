<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1">Prev</button>
    <span>Page {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    nextPage() {
      this.$emit("updatePage", this.currentPage + 1);
    },
    previousPage() {
      this.$emit("updatePage", this.currentPage - 1);
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 10px 20px;
  background-color: #182767;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.3s;
  border-radius: 15px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #23399a;
}
</style>
