<template>
  <div class="search-container">
    <div class="addNewRecordDiv">
      <button class="addNewRecord" @click="goToAddRecord">
        Add New Record
      </button>
    </div>
    <div class="searchBarComp">
      <h1>TESODEV SEARCH APP</h1>
      <div>
        <h3>Find in records</h3>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Ara..."
          @input="search"
        />
      </div>
    </div>
    <div v-if="searchResults.length > 3 && !showAll"></div>
    <div v-if="searchResults.length > 3 && showAll" class="pagination">
      <select v-model="sortOption" @change="sortResults" class="sort-select">
        <option value="name">İsme Göre Sırala</option>
        <option value="date">Tarihe Göre Sırala</option>
      </select>
    </div>
    <table v-if="searchResults.length > 0 && !showAll" class="search-results">
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
    <button @click="showMore" v-if="searchResults.length >= 3">
      Show More
    </button>
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
      resultsPerPage: 3,
      showAll: false,
      sortOption: null,
    };
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
      localStorage.setItem("searchResults", JSON.stringify(this.searchResults));
      this.$router.push({ name: "SearchResults" });
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
    showDetail(id) {
      this.$router.push({ name: "Detail", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.search-container {
  text-align: center;
  margin: 20px;
}

.search-container input[type="text"] {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
}

.search-container button {
  padding: 10px 20px;
  background-color: #182767;
  color: white;
  border: none;
  cursor: pointer;
  margin: 10px 0;
  transition: all 0.3s;
  border-radius: 15px;
}

.search-container button:hover {
  background-color: #23399a;
}

.sort-select {
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
}

.search-results td button:hover {
  background-color: #23399a;
}

.addNewRecordDiv {
  display: flex;
  width: 100%;
  justify-content: end;
}
.searchBarComp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.searchBarComp div {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.searchBarComp h1 {
  color: #182767;
}
</style>
