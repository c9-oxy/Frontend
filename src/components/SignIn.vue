<script setup>
import axios from 'axios'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()

const userId = ref('')
const userPw = ref('')

const checkId = () => {
  if (userId.value.trim() != '' && userPw.value.trim() != '') {
    const signInUser = {
      //json 객체에 id와 pw 저장
      userId: userId.value,
      userPw: userPw.value
    }
    axios
      .post('http://localhost:8082/signin', signInUser)
      .then((res) => {
        if (res.data) {
          if (res.data.USER_FAILED > 0) {
            //USER_FAILED로 변경
            alert('비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.')
          } else {
            alert(res.data.USER_NAME + '님 환영합니다.')
            Cookies.set('userId', res.data.USER_ID, { expires: 7, path: '' })
            Cookies.set('userName', res.data.USER_NAME, { expires: 7, path: '' })
            Cookies.set('userRank', res.data.USER_RANK, { expires: 7, path: '' })
            router.push('/')
          }
        } else {
          console.log('값이 오지 않음(계정 없음)')
          alert('비활성화된 계정입니다. 관리자에게 문의 바랍니다.')
        }
      })
      .catch((err) => {
        console.error(err) //이건 진짜 에러
        console.log(signInUser, '로그인에 실패했습니다.')
        alert('로그인 오류 ' + err.data + '관리자에게 문의 바랍니다.')
        userPw.value = null
      })
  }
}
</script>

<template>
  <h1>로그인</h1>
  <div class="signin">
    <form @submit.prevent="checkId">
      <input v-model="userId" type="text" placeholder="아이디를 입력해주세요." /><br />
      <input v-model="userPw" type="password" placeholder="비밀번호를 입력해주세요." /><br />

      <button type="submit">로그인</button>
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
</style>
