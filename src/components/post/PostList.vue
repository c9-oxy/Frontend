<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BoardHeader from '../board/BoardHeader.vue'
import dayjs from 'dayjs'

const router = useRouter()

const currUrl = ref('')

const isPost = ref(true)
const postList = ref([])
const boardId = ref('')

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  boardId.value = parts[4] //그 리고 거기서 'id' 파라미터를 찾습니다.

  if (boardId.value != null) {
    axios
      .get(`http://localhost:8082/posts/${boardId.value}`) //id 파라미터를 매개로 post들을 검색한다.
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          isPost.value = false
          //   router.push('/board')
        } else {
          isPost.value = true
          postList.value = res.data
        }
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        alert('페이지 로드 중 오류가 발생했습니다. ' + err.data + '관리자에게 문의 바랍니다.')
      })
  }
})

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD : HH:mm:ss')
}

function routeWrite(boardId) {
  router.push({ name: 'postWrite', params: { id: boardId.value } })
}
</script>

<template>
  <!-- <div v-for="post in postList" :key="post.POST_NO" id="title">
    <h1>{{ post.BOARD_NAME }} 게시판</h1>
  </div> -->
  <div class="search">
    <!-- <form @submit.prevent="searchBoard">
      <input v-model="searchWord" type="text" placeholder="검색어를 입력해주세요." />
      <button type="submit">검색</button>
    </form> -->
  </div>
  <header>
    <router-link :to="{ name: 'postList', params: { id: boardId.value } }"
      ><board-header msg> </board-header>
    </router-link>
  </header>
  <div class="posts">
    <h4>전체 글 보기</h4>
    <!-- <h1>{{ $route.params.id }}</h1> -->
    <button @click="routeWrite(boardId)">글쓰기</button><br />
    <span v-if="!isPost">글이 없습니다.</span>
    <br />
    <table>
      <div v-if="isPost">
        <tr>
          <td>번호</td>
          <td>제목</td>
          <td>작성자</td>
          <td>작성시간</td>
        </tr>
        <tr v-for="post in postList" :key="post.POST_NO">
          <td>{{ post.POST_NO }}</td>
          <td>
            <!-- <router-link :to="`/board/view/?id=${post.BOARD_ID}&no=${post.POST_NO}`">{{
              post.POST_TITLE
            }}</router-link> -->
            <router-link
              :to="{ name: 'postView', params: { id: post.BOARD_ID, no: post.POST_NO } }"
              >{{ post.POST_TITLE }}</router-link
            >
          </td>
          <td>{{ post.POST_AUTHOR }}</td>
          <td>{{ formatDate(post.POST_TIME) }}</td>
          <td v-if="post.TOTAL > 0" style="color: red">[{{ post.TOTAL }}]</td>
        </tr>
      </div>
    </table>
  </div>
</template>

<style scope>
@media (min-width: 1024px) {
  .signup {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
