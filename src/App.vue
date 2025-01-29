<template>
  <NewsApi />
</template>

<script>
import NewsApi from './components/NewsApi.vue';

export default {
  name: 'App',
  components: {
    NewsApi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
