<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import BoardHeader from '../board/BoardHeader.vue'
import PostTags from './PostTags.vue'

const router = useRouter()
const currUrl = ref('')

const isTags = ref(false)
const inputTag = ref('')
const postTags = ref([])

const boardId = ref('')
const postTitle = ref('')
const postContent = ref('')
const userId = ref(Cookies.get('userId'))

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  boardId.value = parts[4] //그 리고 거기서 'id' 파라미터를 찾습니다.
})

function submitPost() {
  if (postTitle.value.trim() != '' && postContent.value.trim() != '') {
    const newPost = {
      userId: userId.value,
      boardId: boardId.value,
      postTitle: postTitle.value,
      postContent: postContent.value,
      postTags: postTags.value
    }

    if (boardId.value != null) {
      axios
        .post('http://localhost:8082/posts', newPost) //id 파라미터를 매개로 post들을 검색한다.
        .then((res) => {
          router.push({ name: 'postList', params: { id: boardId.value } })
        })
        .catch((err) => {
          console.error(err) //이건 진짜 에러
          alert(
            '글 작성이 정상적으로 처리되지 않았습니다. ' + err.data + '관리자에게 문의 바랍니다.'
          )
        })
    }
  } else if (postTitle.value.trim() == '') {
    alert('제목을 입력하세요.')
  } else if (postContent.value.trim() == '') {
    alert('내용을 입력하세요.')
  }
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
  <!-- <div v-for="post in postList" :key="post.POST_NO" id="title">
    <h1>{{ post.BOARD_NAME }} 게시판</h1>
  </div> -->
  <header>
    <router-link :to="{ name: 'postList', params: { id: boardId.value } }"
      ><board-header msg> </board-header>
      <h2>게시판</h2></router-link
    >
  </header>
  <article class="write_wrap">
    <input :value="userId" type="text" readonly /><br />
    <input
      v-model="postTitle"
      class="title"
      type="text"
      placeholder="제목을 입력해 주세요."
    /><br />
    <input
      v-model="postContent"
      style="width: 300px; height: 300px"
      class="content"
      type="text"
    /><br /><br />
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
                "
              >
                {{ tag }}
                <button
                  @click="deleteTag(index)"
                  type="button"
                  style="border: none; background: none"
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
