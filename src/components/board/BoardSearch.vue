<script setup>
import axios from 'axios'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchWord = ref('')
const isResult = ref(true)
const searchResult = ref([])

const searchBoard = () => {
  if (searchWord.value.trim() != '') {
    axios
      .get(`http://localhost:8082/board/${searchWord.value}`)
      .then((res) => {
        console.log(res.data)
        if (Object.keys(res.data).length === 0) {
          isResult.value = false
        } else {
          isResult.value = true
          searchResult.value = res.data
        }
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        alert('로그인 오류 ' + err.data + '관리자에게 문의 바랍니다.')
      })
  }
}
</script>

<template>
  <h1>게시판 검색</h1>
  <div class="search">
    <form @submit.prevent="searchBoard">
      <input v-model="searchWord" type="text" placeholder="검색어를 입력해주세요." />
      <button type="submit">검색</button>
    </form>
  </div>
  <div class="result">
    <h3>게시판</h3>
    <span v-if="!isResult">{{ searchWord }}에 대한 검색 결과가 없습니다.</span>
    <br />
    <table v-if="isResult">
      <tr v-for="result in searchResult" :key="result.BOARD_NO">
        <td>
          <router-link :to="`/post/?id=${result.BOARD_ID}`"
            >{{ result.BOARD_NAME }} 게시판</router-link
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
