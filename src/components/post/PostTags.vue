<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const isPost = ref(true)
const postList = ref([])

const currUrl = ref('')
const postTag = ref('')

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  postTag.value = parts[5] //id는 게시판 id, no는 글 번호를 의미합니다.

  axios
    .get(`http://localhost:8082/tags/${postTag.value}`) // '황우준' 태그를 사용하여 게시글을 가져오는 엔드포인트
    .then((res) => {
      if (Object.keys(res.data).length === 0) {
        isPost.value = false // isPost를 거짓으로 설정한다. 이렇게 되면 밑의 v-if에서 포스트가 존재하지 않음으로 받아들이고 '작성된 글이 없습니다'를 출력한다.
      } else {
        isPost.value = true
        postList.value = res.data
      }
    })
    .catch((err) => {
      console.error(err)
      alert('페이지 로드 중 오류가 발생했습니다. ' + err.data)
    })
})

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD -- HH:mm:ss')
}
</script>

<template>
  <div class="posts">
    <h3>태그: {{ postTag }}</h3>
    <span v-if="!isPost">작성된 글이 없습니다.</span>
    <br />
    <table v-if="isPost" class="post-table">
      <thead>
        <tr class="post-table-header">
          <th class="post-table-author" id="dnwns">태그</th>
          <th class="post-table-title" id="dnwnsdnwns">제목</th>
          <th class="post-table-date">작성일</th>
          <th class="post-table-edit-date">수정일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in postList" :key="post.POST_NO" class="post-table-row">
          <td class="post-table-author">{{ post.TAG_NAME }}</td>
          <td class="post-table-title">
            <router-link
              :to="{ name: 'postView', params: { id: post.BOARD_ID, no: post.POST_NO } }"
            >
              {{ post.POST_TITLE }}
            </router-link>
          </td>
          <td class="post-table-date">{{ formatDate(post.POST_TIME) }}</td>
          <td class="post-table-edit-date">
            <span v-if="post.POST_EDITS === 'Y'">{{ formatDate(post.POST_EDIT_TIME) }}</span>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.posts {
  font-size: 20px;
  margin: 0 auto;
  width: 1200px;
  padding: 20px;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table-header {
  font-weight: bold;
  background: #f1f1f1;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열을 가진 그리드 레이아웃 */
}

.post-table-row {
  border-bottom: 1px solid #ddd;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열을 가진 그리드 레이아웃 */
}

.post-table-author,
.post-table-title,
.post-table-date,
.post-table-edit-date,
.post-table-comm {
  padding: 10px;
  text-align: center;
}

.post-table-title {
  text-align: left;
}

.post-table-title a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

.post-table-title a:hover {
  text-decoration: underline;
  color: #007bff;
}

.post-table-comm {
  color: red;
}
.post-table-author {
  text-align: left;
}
#dnwns {
  text-align: center;
}
#dnwnsdnwns {
  text-align: center;
}
</style>
