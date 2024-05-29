<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userId = ref('')
const userNm = ref('')
const userRk = ref('')

const userList = ref([])

const router = useRouter()

onMounted(() => {
  const id = window.localStorage.getItem('userId')
  const name = window.localStorage.getItem('userName')
  const rank = window.localStorage.getItem('userRank')

  if (!id && !name && !rank) {
    // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
    router.push('/signup')
  } else if (rank != 'A') {
    router.push('/profile')
  } else {
    userId.value = id
    userNm.value = name
    userRk.value = rank
  }
})

const logout = () => {
  // localStorage에서 사용자 정보 삭제
  window.localStorage.removeItem('userId')
  window.localStorage.removeItem('userName')
  window.localStorage.removeItem('userRank')

  // 로그아웃 후 리다이렉트
  router.push('/signup')
}
///////////////////////////////////////////////////////

axios
  .get('http://localhost:8082/user-list')
  .then((res) => {
    if (res.data) {
      const rank = window.localStorage.getItem('userRank')
      if (rank != 'A') {
        router.push('/profile')
      } else {
        alert('관리자 확인되었습니다.')
        console.log(res.data)
        userList.value = res.data
      }
    } else {
      alert('아차...!')
    }
  })
  .catch((err) => {
    console.error(err)
    alert('게다츠님, 오류가 나셔야죠')
  })
</script>

<template>
  <div class="user-list">
    <h1>회원 일괄 조회</h1>
    <br />
    <table border="1">
      <tr>
        <td>번호</td>
        <td>ID</td>
        <td>이름</td>
        <td>등급</td>
        <td>상태</td>
      </tr>
      <tr v-for="list in userList" :key="list.USER_NO">
        <td>{{ list.USER_NO }}</td>
        <td>{{ list.USER_ID }}</td>
        <td>{{ list.USER_NAME }}</td>
        <td>{{ list.USER_RANK }}</td>
        <td>{{ list.USER_ACTIVATION }}</td>
        <td><router-link to=""></router-link></td>
      </tr>
    </table>
    <router-link to="/personal-info">내 정보 수정</router-link> <br /><br />

    <button @click="logout">로그아웃</button>

    <button>계정 삭제</button>
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
