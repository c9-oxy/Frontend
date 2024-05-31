<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

function getCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)') //이름이 일치할 시 선택스
  return value ? value[2] : null
}
const userList = ref([])
const router = useRouter()
const id = getCookie('userId')
const userRk = ref('')

const detailUserId = ref('')
const detailUserName = ref('')

const userCheck = ref(false)

onMounted(() => {
  axios
    .get(`http://localhost:8082/user/${id}`)
    .then((res) => {
      userRk.value = res.data.USER_RANK
    })
    .catch((err) => {
      console.error(err)
    })

  axios
    .get('http://localhost:8082/list') //유저 리스트 조회
    .then((res) => {
      if (res.data) {
        console.log(userRk.value)
        if (userRk.value == 'A') {
          console.log(userRk.value)
          router.push('/profile')
        } else {
          // alert('관리자 확인되었습니다.')
          console.log(res.data) //관리자임이 확인될 경우 userList 변수에 받아온 데이터를 삽입합니다.
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
})

function UserDetail(userId) {
  //유저 상세정보 조회
  console.log('요청할 유저 id:' + userId + ', ' + userId.value)
  axios
    .get(`http://localhost:8082/user/${userId}`)
    .then((res) => {
      userCheck.value = true
      detailUserId.value = res.data.USER_ID
      detailUserName.value = res.data.USER_NAME
      console.log('불러온 유저' + detailUserId.value + ' , ' + res.data.USER_ID)
    })
    .catch((err) => {
      console.error(err)
    })
}
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
        <td>상세조회</td>
      </tr>
      <tr v-for="list in userList" :key="list.USER_NO">
        <td>{{ list.USER_NO }}</td>
        <td>{{ list.USER_ID }}</td>
        <td>{{ list.USER_NAME }}</td>
        <td>{{ list.USER_RANK }}</td>
        <td>{{ list.USER_ACTIVATION }}</td>
        <td><input @click="UserDetail(list.USER_ID)" type="button" value="조회" /></td>
      </tr>
    </table>
  </div>
  <div v-if="userCheck">
    <button>ㅎㅇ</button>
    <p>{{ detailUserId }}</p>
    <p>{{ detailUserName }}</p>
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
