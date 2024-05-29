<script setup>
import { ref } from 'vue'
import axios from 'axios'

const str = ref('')

// axios로 Spring Boot에 GET request를 보냄
axios
  .get('http://localhost:8082/api/about')
  .then((res) => {
    console.log(res.data)
    console.log(res.data.str)
    str.value = res.data.str
  })
  .catch((err) => {
    console.error(err)
  })
</script>

<template>
  <div class="about">
    <h1>{{ str }}</h1>
    <input type="text" placeholder="쏼라리쏼라쏴쓰" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
