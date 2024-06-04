<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import BoardHeader from '../board/BoardHeader.vue'
import PostComment from './PostComment.vue'
import dayjs from 'dayjs'
import router from '@/router'
import Cookies from 'js-cookie'

const currUrl = ref('')
const userId = Cookies.get('userId')

const isPost = ref(true)
const boardId = ref('')
const postNo = ref('')

const postTitle = ref('')
const postContent = ref('')
const postAuthor = ref('')
const postTime = ref('')
const postEDITTIME = ref('')
const postEDITS = ref('')
const postCommentsCount = ref('')

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  boardId.value = parts[4] //그 리고 거기서 'id' 파라미터를 찾습니다.
  postNo.value = parts[5] //id는 게시판 id, no는 글 번호를 의미합니다.

  if (postNo.value != null) {
    axios
      .get(`http://localhost:8082/posts/${boardId.value}/${postNo.value}`) //id 파라미터를 매개로 post들을 검색한다.
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          console.log(res.data)
          isPost.value = false
          alert('글이 존재하지 않습니다.')
          //   router.push('/board')
        } else {
          isPost.value = true
          postTitle.value = res.data.POST_TITLE
          postContent.value = res.data.POST_CONTENT
          postAuthor.value = res.data.POST_AUTHOR
          postTime.value = res.data.POST_TIME
          // postCommentsCount.value = res.data.TOTAL
          postEDITTIME.value = res.data.POST_EDIT_TIME
          postEDITS.value = res.data.POST_EDITS
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

const deletePost = () => {
  axios
    .delete(`http://localhost:8082/posts/${postNo.value}`)
    .then(() => {
      alert('게시글이 성공적으로 삭제되었습니다.')
      router.push(`/board`)
    })
    .catch((error) => {
      console.error('게시글을 삭제하는 데 실패했습니다:', error)
      alert('게시글 삭제에 실패했습니다.')
    })
}

const clickupdatepush = () => {
  router.push({ name: 'postUpdate', params: { no: postNo.value } })
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
      <h2>게시판</h2></router-link
    >
  </header>
  <div class="posts">
    <span v-if="!isPost">글이 없습니다.</span>
    <br />
    <div v-if="isPost" class="post">
      <article>
        <header>
          <div class="title">
            &nbsp;
            <p style="font-weight: 500; display: inline">{{ postTitle }}</p>
          </div>
          <div class="author" style="display: inline">
            &nbsp;
            {{ postAuthor }}
          </div>
          <div class="time" style="display: inline">
            &nbsp;
            {{ formatDate(postTime) }}
          </div>
          <div v-if="postEDITS == 'Y'" style="display: inline">
            &nbsp;수정시각:
            {{ formatDate(postEDITTIME) }}
          </div>
          <div v-if="postAuthor == userId">
            <button @click="clickupdatepush">수정하기</button>
            <button @click="deletePost">삭제</button>
          </div>
          <hr />
        </header>
        <br />
        <div class="content">
          {{ postContent }}
        </div>
        <br /><br />
        <hr />
        <div class="comments">
          <p style="display: inline">전체 댓글</p>
          <!-- <p style="display: inline; color: red">{{ postCommentsCount }}</p> -->
          <p style="display: inline">개</p>
          <post-comment></post-comment>
        </div>
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
