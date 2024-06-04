<template>
  <div class="search-results-container">
    <div class="links">
      <router-link class="a" to="/">Search Page</router-link>
      <router-link class="a" to="/add-record">Add New Record</router-link>
    </div>
    <h1>Search List</h1>
    <div v-if="searchResults.length > 3" class="sort-options">
      <label for="">OrderBy: </label>
      <select v-model="sortOption" @change="sortResults" class="sort-select">
        <option value="name" selected>Name</option>
        <option value="date">Date</option>
      </select>
    </div>
    <table v-if="searchResults.length > 0" class="search-results">
      <thead>
        <tr>
          <th @click="sortResults('name')">Name Surname</th>
          <th>Company</th>
          <th>Email</th>
          <th>phone</th>
          <th @click="sortResults('date')">Date</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedResults" :key="item.id">
          <td>{{ item.nameSurname }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.date }}</td>
          <td><button @click="showDetail(item.id)">Detail</button></td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="searchResults.length > 3"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @updatePage="updatePage"
    />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      searchResults: [],
      displayedResults: [],
      currentPage: 1,
      resultsPerPage: 10,
      sortOption: "name",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.searchResults.length / this.resultsPerPage);
    },
  },
  mounted() {
    const searchResults =
      JSON.parse(localStorage.getItem("searchResults")) || [];
    this.searchResults = searchResults;
    this.sortResults();
  },
  methods: {
    updateDisplayedResults() {
      const startIndex = (this.currentPage - 1) * this.resultsPerPage;
      const endIndex = startIndex + this.resultsPerPage;
      this.displayedResults = this.searchResults.slice(startIndex, endIndex);
    },
    updatePage(page) {
      this.currentPage = page;
      this.updateDisplayedResults();
    },
    showDetail(id) {
      this.$router.push({ name: "Detail", params: { id: id } });
    },
    sortResults() {
      if (this.sortOption === "name") {
        this.searchResults.sort((a, b) =>
          a.nameSurname.localeCompare(b.nameSurname)
        );
      } else if (this.sortOption === "date") {
        this.searchResults.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      this.updateDisplayedResults();
    },
  },
};
</script>

<style scoped>
.links {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.a {
  padding: 10px 15px;
  background-color: #182767;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}
.a:hover {
  background-color: #23399a;
}
.search-results-container {
  text-align: center;
  margin: 20px;
}

.sort-options {
  margin-bottom: 20px;
}

.sort-select {
  padding: 10px;
  margin-left: 10px;
}

.search-results {
  margin: 20px auto;
  width: 80%;
  border-collapse: collapse;
}

.search-results th,
.search-results td {
  border: 1px solid #ddd;
  padding: 8px;
}

.search-results th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #182767;
  color: white;
  cursor: pointer;
}

.search-results td button {
  padding: 5px 10px;
  background-color: #182767;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 15px;
}

.search-results td button:hover {
  background-color: #23399a;
}
</style>
