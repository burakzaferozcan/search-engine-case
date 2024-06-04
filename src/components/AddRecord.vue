<template>
  <div class="container">
    <router-link class="a" to="/">Search Page</router-link>

    <div class="add-record-container">
      <h2>Add New Record</h2>
      <form @submit.prevent="addRecord">
        <div v-for="(field, index) in formFields" :key="index">
          <div class="inputContainer">
            <label v-bind:class="{ error: !field.isValid }">{{
              field.label
            }}</label>

            <input
              v-bind:class="{ inputError: !field.isValid }"
              :type="field.type"
              v-model="formData[field.name]"
              @input="validateField(index)"
              :placeholder="field.placeholder"
            />
            <span v-if="!field.isValid" class="error">{{
              field.errorMessage
            }}</span>
          </div>
        </div>
        <button type="submit" :disabled="!isFormValid">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toast-notification";

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
      formFields: [
        {
          name: "nameSurname",
          label: "Name Surname",
          type: "text",
          placeholder: "Jhon Adam",
          isValid: true,
          errorMessage:
            "Ad Soyad en az 4, en fazla 60 karakterden oluşmalıdır ve sadece harf içerebilir.",
          validation: /^[a-zA-Z\s]{4,60}$/,
        },
        {
          name: "company",
          label: "Company",
          type: "text",
          placeholder: "Example Company",
          isValid: true,
          errorMessage: "Şirket en az 2, en fazla 40 karakterden oluşmalıdır.",
          validation: /^[a-zA-Z\s0-9]{2,40}$/,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
          isValid: true,
          errorMessage: "Geçerli bir e-posta adresi giriniz.",
          validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        {
          name: "phone",
          label: "Phone",
          type: "text",
          placeholder: "5534473025",
          isValid: true,
          errorMessage: "Geçerli bir telefon numarası giriniz.",
          validation: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
        },
        {
          name: "website",
          label: "Website",
          type: "url",
          placeholder: "https://example.com",
          isValid: true,
          errorMessage: "Geçerli bir web sitesi URL'si giriniz.",
          validation: /^(http|https):\/\/[^\s$.?#].[^\s]*$/,
        },
        {
          name: "country",
          label: "Country",
          type: "text",
          placeholder: "Turkey",
          isValid: true,
          errorMessage: "Ülke en az 2, en fazla 40 karakterden oluşmalıdır.",
          validation: /^[a-zA-Z\s]{2,40}$/,
        },
        {
          name: "city",
          label: "City",
          type: "text",
          placeholder: "Kocaeli",
          isValid: true,
          errorMessage: "Şehir en az 2, en fazla 40 karakterden oluşmalıdır.",
          validation: /^[a-zA-Z\s]{2,40}$/,
        },
      ],
      isFormValid: true,
      formattedPhone: "",
    };
  },
  methods: {
    validateField(index) {
      const field = this.formFields[index];
      if (field.name === "phone") {
        const phone = this.formData.phone.replace(/[^0-9]/g, "");
        this.formattedPhone = phone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          "$1-$2-$3"
        );
        this.formData.phone = this.formattedPhone;
        field.isValid = field.validation.test(this.formattedPhone);
      } else {
        field.isValid = field.validation.test(this.formData[field.name]);
      }
      this.validateForm();
    },
    validateForm() {
      this.isFormValid = this.formFields.every((field) => field.isValid);
    },
    addRecord() {
      const newRecord = {
        ...this.formData,
        date: this.getCurrentDate(),
      };

      this.shortenUrl(this.formData.website)
        .then((shortUrl) => {
          if (shortUrl) {
            newRecord.website = shortUrl;
            const storedRecords =
              JSON.parse(localStorage.getItem("records")) || [];
            storedRecords.push(newRecord);
            localStorage.setItem("records", JSON.stringify(storedRecords));
            this.showToast();
            this.$router.push({ name: "Search" });
          }
        })
        .catch((error) => {
          console.error("URL kısaltma hatası:", error);
        });
    },
    showToast() {
      const toast = useToast();
      toast.success("Record created successfully.");
    },
    getCurrentDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();

      return `${day}.${month}.${year}`;
    },
    async shortenUrl(url) {
      const apiKey = import.meta.env.VITE_TINYURL_API_KEY;
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

<style>
.a {
  margin: 20px 0 0 20px;
  display: flex;
  padding: 10px 15px;
  background-color: #182767;
  color: white;
  border: none;
  cursor: pointer;
  width: 105px;
  border-radius: 15px;
  text-decoration: none;
  cursor: pointer;
}
.a:hover {
  background-color: #23399a;
}
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.add-record-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.inputContainer {
  margin-bottom: 15px;
}

.inputContainer label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.inputContainer input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.inputContainer input.inputError {
  border-color: red;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

button {
  background-color: #182767;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #23399a;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
