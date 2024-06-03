<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Ara..."
      @input="search"
    />
    <button @click="goToAddRecord">Yeni Kayıt Ekle</button>
    <div v-if="searchResults.length > 3 && showAll" class="pagination">
      <select v-model="sortOption" @change="sortResults" class="sort-select">
        <option value="name">İsme Göre Sırala</option>
        <option value="date">Tarihe Göre Sırala</option>
      </select>
    </div>
    <table v-if="searchResults.length > 0" class="search-results">
      <thead>
        <tr>
          <th @click="sortResults('name')">Ad Soyad</th>
          <th>Şirket</th>
          <th>E-posta</th>
          <th>Telefon</th>
          <th @click="sortResults('date')">Tarih</th>
          <th>Detay</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedResults" :key="item.id">
          <td>{{ item.nameSurname }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.date }}</td>
          <td><button @click="showDetail(item.id)">Detay</button></td>
        </tr>
      </tbody>
    </table>
    <div v-if="searchResults.length > 3 && !showAll">
      <button @click="showMore">Daha Fazla Göster</button>
    </div>
    <div v-if="searchResults.length > 3 && showAll" class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Önceki
      </button>
      <span>Sayfa {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Sonraki
      </button>
    </div>
  </div>
</template>

<script>
import mockData from "../mock-data.json";

export default {
  data() {
    return {
      searchTerm: "",
      searchResults: [],
      displayedResults: [],
      data: [],
      currentPage: 1,
      resultsPerPage: 10,
      showAll: false,
      sortOption: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.searchResults.length / this.resultsPerPage);
    },
  },
  mounted() {
    this.data = this.processMockData(mockData);
    const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
    this.data = this.data.concat(storedRecords);
  },
  methods: {
    processMockData(mockData) {
      return mockData.data.map((row, index) => {
        const obj = {};
        mockData.cols.forEach((col, colIndex) => {
          obj[col] = row[colIndex];
        });
        obj.id = index.toString();
        return obj;
      });
    },
    search() {
      this.searchResults = this.data.filter((item) => {
        return (
          item.nameSurname
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          (item.company &&
            item.company.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
      });
      this.updateDisplayedResults();
    },
    updateDisplayedResults() {
      if (this.showAll) {
        const startIndex = (this.currentPage - 1) * this.resultsPerPage;
        const endIndex = startIndex + this.resultsPerPage;
        this.displayedResults = this.searchResults.slice(startIndex, endIndex);
      } else {
        this.displayedResults = this.searchResults.slice(0, 3);
      }
    },
    showMore() {
      this.showAll = true;
      this.updateDisplayedResults();
    },
    nextPage() {
      this.currentPage++;
      this.updateDisplayedResults();
    },
    previousPage() {
      this.currentPage--;
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
    goToAddRecord() {
      this.$router.push({ name: "AddRecord" });
    },
  },
};
</script>

<style scoped>
.search-container {
  text-align: center;
}
.search-results {
  margin: 0 auto;
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
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
}
.sort-select {
  margin-left: 10px;
}
</style>
