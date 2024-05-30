<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

function getCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)') //이름이 일치할 시 선택스
  return value ? value[2] : null
}
const userList = ref([])
const router = useRouter()
const id = getCookie('userId')
const userRk = ref('')

axios
  .get(`http://localhost:8082/user/${id}`)
  .then((res) => {
    userRk.value = res.data.USER_RANK
  })
  .catch((err) => {
    console.error(err)
  })

axios
  .get('http://localhost:8082/list')
  .then((res) => {
    if (res.data) {
      if (userRk.value != 'A') {
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
    <table>
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
