<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const currUrl = ref('')
const boardId = ref('')
const postTitle = ref('')
const postContent = ref('')
const userId = ref(Cookies.get('userId'))

const isTags = ref(false)
const inputTag = ref('')
const postTags = ref([])

onMounted(() => {
  currUrl.value = window.location.href
  const parts = currUrl.value.split('/')
  boardId.value = parts[4]
})

watch(inputTag, async (newTag) => {
  if (newTag.indexOf(',') > -1) {
    isTags.value = true
    try {
      const parts = newTag.split(',')
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].trim() !== '') {
          postTags.value.push(parts[i].trim())
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
  <article class="write_wrap">
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
        <input v-model="inputTag" class="title" type="text" placeholder="태그를 입렷하게요" />
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
