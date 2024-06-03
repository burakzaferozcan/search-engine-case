<template>
  <div class="add-record-container">
    <h2>Yeni Kayıt Ekle</h2>
    <form @submit.prevent="addRecord">
      <div>
        <label>Ad Soyad</label>
        <input
          type="text"
          v-model="formData.nameSurname"
          @input="validateForm"
        />
        <span v-if="!isNameValid" class="error"
          >Ad Soyad en az 4, en fazla 60 karakterden oluşmalıdır ve sadece harf
          içerebilir.</span
        >
      </div>
      <div>
        <label>Şirket</label>
        <input type="text" v-model="formData.company" @input="validateForm" />
        <span v-if="!isCompanyValid" class="error"
          >Şirket en az 2, en fazla 40 karakterden oluşmalıdır.</span
        >
      </div>
      <div>
        <label>E-posta</label>
        <input type="email" v-model="formData.email" @input="validateForm" />
        <span v-if="!isEmailValid" class="error"
          >Geçerli bir e-posta adresi giriniz.</span
        >
      </div>
      <div>
        <label>Telefon</label>
        <input type="text" v-model="formData.phone" @input="validateForm" />
        <span v-if="!isPhoneValid" class="error"
          >Geçerli bir telefon numarası giriniz.</span
        >
      </div>
      <div>
        <label>Web Sitesi</label>
        <input type="url" v-model="formData.website" @input="validateForm" />
        <span v-if="!isWebsiteValid" class="error"
          >Geçerli bir web sitesi URL'si giriniz.</span
        >
      </div>
      <div>
        <label>Ülke</label>
        <input type="text" v-model="formData.country" @input="validateForm" />
        <span v-if="!isCountryValid" class="error"
          >Ülke en az 2, en fazla 40 karakterden oluşmalıdır.</span
        >
      </div>
      <div>
        <label>Şehir</label>
        <input type="text" v-model="formData.city" @input="validateForm" />
        <span v-if="!isCityValid" class="error"
          >Şehir en az 2, en fazla 40 karakterden oluşmalıdır.</span
        >
      </div>
      <button type="submit" :disabled="!isFormValid">Ekle</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      formData: {
        id: uuidv4(),
        nameSurname: "",
        company: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        city: "",
      },
      isNameValid: false,
      isCompanyValid: false,
      isEmailValid: false,
      isPhoneValid: false,
      isWebsiteValid: false,
      isCountryValid: false,
      isCityValid: false,
      isFormValid: false,
    };
  },
  methods: {
    validateForm() {
      this.isNameValid = /^[a-zA-Z\s]{4,60}$/.test(this.formData.nameSurname);
      this.isCompanyValid = /^[a-zA-Z\s]{2,40}$/.test(this.formData.company);
      this.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        this.formData.email
      );
      this.isPhoneValid = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(
        this.formData.phone
      );
      this.isWebsiteValid = /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(
        this.formData.website
      );
      this.isCountryValid = /^[a-zA-Z\s]{2,40}$/.test(this.formData.country);
      this.isCityValid = /^[a-zA-Z\s]{2,40}$/.test(this.formData.city);

      this.isFormValid =
        this.isNameValid &&
        this.isCompanyValid &&
        this.isEmailValid &&
        this.isPhoneValid &&
        this.isWebsiteValid &&
        this.isCountryValid &&
        this.isCityValid;
    },
    addRecord() {
      const newRecord = {
        ...this.formData,
        date: this.getCurrentDate(),
      };
      const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
      storedRecords.push(newRecord);
      localStorage.setItem("records", JSON.stringify(storedRecords));

      this.$router.push({ name: "Search" });
    },
    getCurrentDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const year = today.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style scoped>
.add-record-container {
  text-align: left;
  margin: 20px;
}
.add-record-container h2 {
  margin-bottom: 20px;
}
.add-record-container form div {
  margin-bottom: 10px;
}
.add-record-container form label {
  display: block;
}
.add-record-container form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
.add-record-container form button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
.add-record-container form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
