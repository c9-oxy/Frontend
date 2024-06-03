<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
// import Cookies from 'js-cookie'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const searchWord = ref('')
const isResult = ref(true)
const searchResult = ref([])

const isRanked = ref(true)
const rankedResult = ref([])

onMounted(() => {
  axios
    .get('http://localhost:8082/board')
    .then((res) => {
      if (Object.keys(res.data).length === 0) {
        isRanked.value = false
      } else {
        isRanked.value = true
        rankedResult.value = res.data
      }
    })
    .catch((err) => {
      console.error(err) //이건 진짜 에러
      alert('로그인 오류 ' + err.data + '관리자에게 문의 바랍니다.')
    })
})

const searchBoard = () => {
  //게시판을 검색합니다.
  if (searchWord.value.trim() != '') {
    //먼저 검색어가 null이 아닌지 우선적으로 검사합니다.
    axios
      .get(`http://localhost:8082/board/${searchWord.value}`) //이후 get으로 검색어를 보내 결과값을 받습니다.
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          //검색 결과가 null이 아닌지 확인한 후
          isResult.value = false //null일 시  isResult를 false로 하여 '결과가 없습니다' 출력되도록 합니다.
        } else {
          //만약 결과가 있을 경우
          isResult.value = true //true로 바꾸고
          searchResult.value = res.data //searchResult 배열에 res.data를 전부 넣습니다.
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
    <span v-if="!isResult">{{ searchWord }}에 대한 검색 결과가 없습니다.</span>
    <br />
    <table v-if="isResult">
      <tr v-for="result in searchResult" :key="result.BOARD_NO">
        <td>
          <router-link :to="{ name: 'postList', params: { id: result.BOARD_ID } }"
            >{{ result.BOARD_NAME }} 게시판</router-link
          >
        </td>
      </tr>
    </table>
  </div>
  <div>
    <h2>HOT 게시판</h2>
    <table v-if="isRanked">
      <tr v-for="result in rankedResult" :key="result.TOTAL">
        <td>
          <router-link
            :to="{ name: 'postList', params: { id: result.BOARD_ID } }"
            style="display: inline"
            >{{ result.BOARD_NAME }} 게시판
          </router-link>
          <p style="display: inline; font-size: 8pt">글 {{ result.TOTAL }}</p>
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
