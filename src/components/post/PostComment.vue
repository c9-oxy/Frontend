<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'

const currUrl = ref('')

const isComment = ref(true)
const commentList = ref([])

const userId = ref(Cookies.get('userId')) //댓글 작성자
const commContent = ref('') //댓글 내용
const commPostNo = ref('') //원글 번호
const commGroup = ref('') //댓글 그룹

const isReply = ref(false)
const replyContent = ref('')
const replyNo = ref('')

onMounted(() => {
  currUrl.value = window.location.href //먼저 자신의 현재 url을 가져옵니다.
  const parts = currUrl.value.split('/')
  commPostNo.value = parts[5] //그리고 거기서 'id' 파라미터를 찾습니다.
  if (commPostNo.value != null) {
    getCommentList()
  }
})

function getCommentList() {
  axios
    .get(`http://localhost:8082/comments/${commPostNo.value}`) //id 파라미터를 매개로 post들을 검색한다.
    .then((res) => {
      if (Object.keys(res.data).length === 0) {
        isComment.value = false
        //   router.push('/board')
      } else {
        isComment.value = true
        commentList.value = res.data
      }
    })
    .catch((err) => {
      console.error(err) //이건 진짜 에러
      alert('페이지 로드 중 오류가 발생했습니다. ' + err.data + '관리자에게 문의 바랍니다.')
    })
}

function replyComment(group, no) {
  console.log(group)
  isReply.value = !isReply.value
  commGroup.value = group
  replyNo.value = no
}

function submitComment() {
  if (commContent.value.trim() != '') {
    const newComment = {
      userId: userId.value,
      commContent: commContent.value,
      commPostNo: commPostNo.value,
      commClass: 0
    }

    axios
      .post('http://localhost:8082/comments', newComment) //id 파라미터를 매개로 post들을 검색한다.
      .then(() => {
        // router.push({ name: 'postList', params: { id: commPostNo.value } })
        getCommentList(commPostNo.value)
        console.log('전송됨', newComment.value)
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        alert('글 작성이 정상적으로 처리되지 않았습니다. ' + err.data + '관리자에게 문의 바랍니다.')
      })
  } else {
    alert('내용을 입력하세요.')
  }
}

function submitReply() {
  //대댓글 서브밋 함수
  if (replyContent.value.trim() != '') {
    //댓글이 null일 경유
    const newComment = {
      //대댓글 객체
      userId: userId.value,
      commContent: replyContent.value,
      commPostNo: commPostNo.value,
      commClass: 1,
      commGroup: commGroup.value
    }

    axios
      .post('http://localhost:8082/comments', newComment) //
      .then(() => {
        // router.push({ name: 'postList', params: { id: commPostNo.value } })
        console.log('전송됨')
        isReply.value = !isReply.value
        commGroup.value = ''
        replyNo.value = ''
        getCommentList()
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        alert('글 작성이 정상적으로 처리되지 않았습니다. ' + err.data + '관리자에게 문의 바랍니다.')
      })
  } else {
    alert('내용을 입력하세요.')
  }
}
</script>

<template>
  <div class="list">
    <table border="1">
      <div v-if="isComment">
        <tr v-for="comment in commentList" :key="comment.COMM_NO">
          <div v-if="comment.COMM_CLASS == 0">
            <td style="font-weight: 500">{{ comment.USER_NAME }}</td>
            <td>{{ comment.COMM_CONTENT }}</td>
            <td>{{ comment.COMM_TIME }}</td>
            <!-- <input v-model="commGroup" :value="comment.COMM_GROUP" type="hidden" /> -->
            <td>
              <button @click="replyComment(comment.COMM_GROUP, comment.COMM_NO)" type="button">
                답글
              </button>
            </td>
          </div>

          <div v-if="comment.COMM_CLASS == 1" style="position: relative; left: 30px">
            <td>{{ comment.USER_NAME }}</td>
            <td>{{ comment.COMM_CONTENT }}</td>
            <td>{{ comment.COMM_TIME }}</td>
          </div>
          <div v-if="isReply && comment.COMM_NO == replyNo">
            <form action="">
              <input :value="userId" type="text" readonly /><br />
              <input v-model="replyContent" type="text" />
              <button @click="submitReply()" type="button">등록</button>
            </form>
          </div>
        </tr>
      </div>
    </table>
  </div>
  <div class="comment">
    <form action="">
      <input :value="userId" type="text" readonly /><br />
      <input
        v-model="commContent"
        type="text"
        placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 운영방침 및 관련 법률에 따라 제재를 받을 수 있습니다."
      />
      <button @click="submitComment()" type="button">등록</button>
    </form>
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

.content {
  width: 400px;
  height: 500px;
}
</style>
