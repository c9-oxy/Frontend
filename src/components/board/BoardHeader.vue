<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const currUrl = ref('')
const boardId = ref('')
const boardName = ref('')

defineProps({
  msg: {
    type: String,
    required: true
  }
})

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  boardId.value = parts[4] //그 리고 거기서 'id' 파라미터를 찾습니다.
  axios
    .get(`http://localhost:8082/board/name/${boardId.value}`) //id 파라미터를 매개로 post들을 검색한다.
    .then((res) => {
      if (Object.keys(res.data).length === 0) {
        alert('이름이 존재하지 않습니다.')
        //   router.push('/board')
      } else {
        boardId.value = res.data.BOARD_ID
        boardName.value = res.data.BOARD_NAME
      }
    })
    .catch((err) => {
      console.error(err) //이건 진짜 에러
      alert('페이지 로드 중 오류가 발생했습니다. ' + err.data + '관리자에게 문의 바랍니다.')
    })
})
</script>

<template>
  <div>
    <h2>{{ boardName }}게시판</h2>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
