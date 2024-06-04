<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const postTitle = ref('')
const postContent = ref('')
const currUrl = ref('')
const postNo = ref('')

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  postNo.value = parts[4] //그 리고 거기서 'id' 파라미터를 찾습니다.
  console.log(postNo.value)
})

const updatePost = () => {
  const updatedPost = {
    postNo: postNo.value,
    postTitle: postTitle.value,
    postContent: postContent.value
  }

  axios
    .put('http://localhost:8082/posts', updatedPost)
    .then(() => {
      alert('게시글이 성공적으로 수정되었습니다.')
      router.push(`/board`)
    })
    .catch((error) => {
      alert('게시글을 업데이트하는 데 실패했습니다')
      console.log(error)
    })
}
</script>

<template>
  <div>
    <h2>게시글 수정</h2>
    <form @submit.prevent="updatePost">
      <div>
        <input type="text" v-model="postTitle" />
      </div>
      <div>
        <input type="text" v-model="postContent" />
      </div>
      <button type="submit">수정</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 1em;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5em;
  margin-top: 0.5em;
}

button {
  padding: 0.5em;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
