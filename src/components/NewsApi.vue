<template>
  <div class="api-main">
    <main>
        <h1>Daily News From Apostle Nath</h1>
        <div v-for="article in articles.articles" v-bind:key="article.url" class="article">
            <h2>{{ article.title }}</h2>
            <p><strong>Author:</strong> {{ article.author || "Unknown" }}</p>
            <p><strong>Source:</strong> {{ article.source.name }}</p>
            <img :src="article.urlToImage" alt="Article Image" class="article-image" />
            <p>{{ article.description }}</p>
            <a :href="article.url" target="_blank">Read More</a>
        </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=tesla&from=2024-12-29&sortBy=publishedAt&apiKey=093c01deb6b54ae9becbbc755e2f8e48"
      )
      .then((response) => {
        this.articles = response.data;
        console.log(this.articles)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
    margin: 0;
    padding: 0;
}
.article {
    /* border: 2px solid black; */
    width: 50%;
    padding: 20px;
    margin: 0 auto;
    transition: 0.4s;
    cursor: pointer;
    box-shadow: 2px 1px 2px 2px #000;
    margin-bottom: 30px;
}

.article:hover {
    background-color: #000;
    color: #ffff;
}

.article-image {
    width: 100%;
}


@media (max-width: 500px) {
  .article {
    width: 90%;
 
}
}
</style>
