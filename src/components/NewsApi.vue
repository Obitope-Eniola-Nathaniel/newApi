<template>
  <div class="api-main">
    <main>
      <h1>Daily News From Niel Tech</h1>

      <!-- Country Selection Buttons -->
      <div>
        <button v-for="country in countries" 
                :key="country.code" 
                @click="fetchNewsData(country.code)" 
                class="btn">
          {{ country.name }}
        </button>
      </div>

      <h3>News Articles</h3>

      <!-- Display Error Message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Show Loading State -->
      <h2 v-if="loading" class="loading">Loading...</h2>

      <!-- Show News Articles -->
      <transition-group name="fade" tag="section" v-if="articles.length > 0 && !loading" class="news-section">
        <div v-for="article in articles" :key="article.url" class="article">
    
            <img v-if="article.image_url" :src="article.image_url" alt="Article Image" class="article-image" />
            <p>{{ article.description }}</p>
            <a :href="article.link" target="_blank">Read More</a>
     
            <p><strong>Author:</strong> {{ article.creator || "Unknown" }}</p>
            <h2>{{ article.title }}</h2>
        
       
        </div>
      </transition-group>
    </main>
  </div>
</template>

<script>
import { fetchCountry } from '@/utils/fetchNews'; 

export default {
  data() {
    return {
      articles: [],
      errorMessage: "", 
      loading: false, // New loading state
      countries: [
        { code: "us", name: "United States" },
        { code: "ng", name: "Nigeria" },
        { code: "gb", name: "United Kingdom" },
        { code: "in", name: "India" }
      ],  
    };
  },
  methods: {
    fetchNewsData(country) {
      this.errorMessage = ""; 
      this.loading = true; // Show loading state

      fetchCountry(country, (data, error) => {
        this.loading = false; // Stop loading

        if (error) {
          this.errorMessage = error.message; 
          this.articles = []; 
        } else {
          this.articles = data.results || [];
        }
      });
    }
  },
  mounted() {
    this.fetchNewsData("ng"); // Default: Load Nigeria's news on mount
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap');

h1 {
  font-family: "Bungee Spice", serif;
  font-weight: 400;
  font-style: normal;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.news-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.article {
  width: 30%;
  padding: 20px;
  margin: 10px;
  transition: 0.4s;
  cursor: pointer;
  box-shadow: 2px 1px 2px 2px #000;
  border-radius: 20px;
  background: white;
}

.article:hover {
  transform: scale(0.8);
}

.article:hover {
  background-color: #000;
  color: #fff;
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.btn {
  padding: 10px;
  background-color: #333;
  color: white;
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
  border: none;
  transition: transform 0.2s ease-in-out;
}

.btn:hover {
  background-color: #555;
}

.btn:active {
  transform: scale(0.9);
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

/* Fade-in animation for news articles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Loading Animation */
.loading {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #555;
  animation: blink 1.5s infinite alternate;
}

@keyframes blink {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 500px) {
  .article {
    width: 90%;
  }
}

/* 3D Book Effect */

</style>
