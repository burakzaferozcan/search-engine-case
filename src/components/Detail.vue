<template>
  <div class="detail-container" v-if="detailItem">
    <h2>Details</h2>
    <p>Name Surname: {{ detailItem.nameSurname }}</p>
    <p>Company: {{ detailItem.company }}</p>
    <p>Email: {{ detailItem.email }}</p>
    <p>Phone: {{ detailItem.phone }}</p>
    <p>
      WebSite:
      <a :href="detailItem.website" target="_blank">{{ detailItem.website }}</a>
    </p>
    <p>Country: {{ detailItem.country }}</p>
    <p>City: {{ detailItem.city }}</p>
    <p>Date: {{ detailItem.date }}</p>
  </div>
  <div v-else>
    <p>Veri bulunamadı.</p>
  </div>
</template>

<script>
import mockData from "../mock-data.json";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailItem: null,
    };
  },
  mounted() {
    this.fetchDetail();
  },
  methods: {
    fetchDetail() {
      const id = this.$route.params.id;

      const storedRecords = JSON.parse(localStorage.getItem("records")) || [];

      let record = storedRecords.find((item) => item.id === id);

      if (!record) {
        record = this.getMockRecordById(id);
      }

      this.detailItem = record;
    },
    getMockRecordById(id) {
      const index = parseInt(id) - 1;
      if (mockData.data[index]) {
        return {
          id: mockData.data[index][0],
          nameSurname: mockData.data[index][1],
          company: mockData.data[index][2],
          email: mockData.data[index][3],
          phone: mockData.data[index][4],
          website: mockData.data[index][5],
          country: mockData.data[index][6],
          city: mockData.data[index][7],
          date: mockData.data[index][8],
        };
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
.detail-container {
  text-align: left;
  margin: 20px;
}
.detail-container h2 {
  margin-bottom: 20px;
}
.detail-container p {
  margin: 5px 0;
}
</style>
