<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const currUrl = ref('')

const isPost = ref(true)
const postContent = ref('')
const boardId = ref('')
const postNo = ref('')
const boardName = ref('')

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const url = new URL(currUrl.value) //이걸 url로 선언합니다.
  const urlParams = url.searchParams //그리고 그 url의 전체 파라미터 값을 가져옵니다.
  boardId.value = urlParams.get('id') //그리고 거기서 'id' 파라미터와, 'no' 파라미터를 찾습니다.
  postNo.value = urlParams.get('no') //id는 게시판 id, no는 글 번호를 의미합니다.
  console.log(postNo)

  if (postNo.value != null) {
    axios
      .get(`http://localhost:8082/view/${boardId.value}/${postNo.value}`) //id 파라미터를 매개로 post들을 검색한다.
      .then((res) => {
        console.log(res.data)
        if (Object.keys(res.data).length === 0) {
          isPost.value = false
          alert('글이 존재하지 않습니다.')
          //   router.push('/board')
        } else {
          isPost.value = true
          postContent.value = res.data
        }
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        alert('페이지 로드 중 오류가 발생했습니다. ' + err.data + '관리자에게 문의 바랍니다.')
      })
  }
})
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
  <div class="posts">
    <h3>내용</h3>
    <span v-if="!isPost">글이 없습니다.</span>
    <br />
    <div v-if="isPost" class="post">
      <article>
        <div class="title"></div>
        <div class="content"></div>
        <div class="comments"></div>
      </article>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .signup {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
