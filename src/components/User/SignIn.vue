<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userId = ref('')
const userPw = ref('')

const router = useRouter()

const signInForm = () => {
  const signInUser = {
    userId: userId.value,
    userPw: userPw.value
  }

  axios
    .post('http://localhost:8082/signin', signInUser)
    .then((res) => {
      if (res.data) {
        alert(res.data.USER_NAME + ' 님 환영합니다.')
        window.localStorage.setItem('userNo', res.data.USER_NO)
        window.localStorage.setItem('userId', res.data.USER_ID)
        window.localStorage.setItem('userName', res.data.USER_NAME)
        window.localStorage.setItem('userRank', res.data.USER_RANK)
        router.push('/')
      } else {
        alert(
          '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'
        )
        userPw.value = null
      }
    })
    .catch((err) => {
      console.error(err)
      console.log(signInUser, '로그인에 실패했습니다.')
      alert(
        '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'
      )
      userPw.value = null
    })
}
</script>

<template>
  <h1>로그인</h1>
  <div class="signin">
    <form @submit.prevent="signInForm">
      <input v-model="userId" type="text" placeholder="아이디를 입력해주세요." autofocus /><br />
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
