<template>
  <div class="detail-container" v-if="detailItem">
    <router-link class="a" to="/">Search Page</router-link>
    <h2>Details</h2>
    <p>Name Surname: {{ detailItem.nameSurname }}</p>
    <p>Company: {{ detailItem.company }}</p>
    <p>Email: {{ detailItem.email }}</p>
    <p>Phone: {{ detailItem.phone }}</p>
    <p>
      WebSite:
      <a
        :href="detailItem.shortenedWebsite || detailItem.website"
        target="_blank"
      >
        {{ detailItem.shortenedWebsite || detailItem.website }}
      </a>
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
    async fetchDetail() {
      const id = this.$route.params.id;
      const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
      let record = storedRecords.find((item) => item.id === id);
      if (!record) {
        record = await this.getMockRecordById(id);
      }

      this.detailItem = record;
    },
    async getMockRecordById(id) {
      const index = parseInt(id);
      if (mockData.data && mockData.data[index]) {
        const website = mockData.data[index][5];
        const shortenedWebsite = await this.shortenUrl(website);
        return {
          id: mockData.data[index][0],
          nameSurname: mockData.data[index][1],
          company: mockData.data[index][2],
          email: mockData.data[index][3],
          phone: mockData.data[index][4],
          website: website,
          shortenedWebsite: shortenedWebsite,
          country: mockData.data[index][6],
          city: mockData.data[index][7],
          date: mockData.data[index][8],
        };
      } else {
        return null;
      }
    },
    async shortenUrl(url) {
      const apiKey = import.meta.env.VITE_TINYURL_API_KEY; // API anahtarını .env dosyasından al
      const apiEndpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
        url
      )}&apikey=${apiKey}`;
      try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
          const shortUrl = await response.text();
          return shortUrl;
        } else {
          throw new Error("API isteği başarısız oldu.");
        }
      } catch (error) {
        console.error("URL kısaltma hatası:", error);
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
