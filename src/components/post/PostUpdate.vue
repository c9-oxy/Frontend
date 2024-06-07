<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const postTitle = ref('')
const postContent = ref('')
const currUrl = ref('')
const postNo = ref('')

const isTags = ref(false)
const inputTag = ref('')
const postTags = ref([])

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  postNo.value = parts[4] //그 리고 거기서 'id' 파라미터를 찾습니다.
})

const updatePost = () => {
  const updatedPost = {
    postNo: postNo.value,
    postTitle: postTitle.value,
    postContent: postContent.value,
    postTags: postTags.value
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

watch(inputTag, async (newTag) => {
  if (newTag.indexOf(',') > -1) {
    isTags.value = true
    try {
      const parts = newTag.split(',')
      for (let i = 0; i < parts.length; i++) {
        const tag = parts[i].trim()
        if (postTags.value.length < 5) {
          if (tag !== '') {
            if (!postTags.value.includes(tag)) {
              postTags.value.push(tag)
            }
          }
        }
      }
      inputTag.value = ''
    } catch (error) {
      console.log('오류오류')
    }
  }
})

function deleteTag(index) {
  postTags.value.splice(index, 1)
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
      <p style="display: inline">태그</p>
      &nbsp;
      <p style="font-size: small; display: inline">구분은 쉼표입니다.</p>
      <div class="tags">
        <form>
          <div v-if="isTags">
            <ul style="list-style-type: none; display: flex">
              <li
                v-for="(tag, index) in postTags"
                :key="index"
                style="margin-right: 10px; margin-left: 0px"
              >
                <div
                  style="
                    background-color: white;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    padding: 1px;
                    color: black;
                  "
                >
                  {{ tag }}
                  <button
                    @click="deleteTag(index)"
                    type="button"
                    style="border: none; background: none; color: black"
                  >
                    X
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <input
            v-model="inputTag"
            class="title"
            type="text"
            maxlength="10"
            placeholder="태그는 20자까지 5개만 허용됩니다."
          />
        </form>
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
