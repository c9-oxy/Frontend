<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const currUrl = ref('')

const boardId = ref('')
const postTitle = ref('')
const postContent = ref('')
const userId = ref(Cookies.get('userId'))

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const url = new URL(currUrl.value) //이걸 url로 선언합니다.
  const urlParams = url.searchParams //그리고 그 url의 전체 파라미터 값을 가져옵니다.
  boardId.value = urlParams.get('id') //그 리고 거기서 'id' 파라미터를 찾습니다.
})

function submitPost() {
  const newPost = {
    userId: userId.value,
    boardId: boardId.value,
    postTitle: postTitle.value,
    postContent: postContent.value
  }

  if (boardId.value != null) {
    axios
      .post('http://localhost:8082/board/write', newPost) //id 파라미터를 매개로 post들을 검색한다.
      .then((res) => {
        router.push(`/board/post/?id=${boardId.value}`)
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        alert('글 작성이 정상적으로 처리되지 않았습니다. ' + err.data + '관리자에게 문의 바랍니다.')
      })
  }
}
</script>

<template>
  <!-- <div v-for="post in postList" :key="post.POST_NO" id="title">
    <h1>{{ post.BOARD_NAME }} 게시판</h1>
  </div> -->
  <article class="write_wrap">
    <div class="posts">
      <form>
        <input :value="userId" type="text" readonly /><br />
        <input v-model="postTitle" class="title" type="text" placeholder="제목을 입력해 주세요." />
        <input v-model="postContent" class="tx-canvas" type="text" />
        <button @click="submitPost()" type="button">등록</button>
      </form>
    </div>
  </article>
</template>

<style>
@media (min-width: 1024px) {
  .signup {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.tx-canvas {
  width: 400px;
  height: 500px;
}
</style>
