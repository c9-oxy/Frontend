<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

//쿠키 값 가져오는 함수

const userId = ref(Cookies.get('userId'))
const userNm = ref(Cookies.get('userName'))
const userRk = ref(Cookies.get('userRank'))
const router = useRouter()

const updateNameForm = () => {
  const updateName = {
    userId: userId.value,
    userNm: userNm.value,
    userRk: userRk.value
  }

  axios
    .put('http://localhost:8082/user', updateName) //
    .then((res) => {
      alert('수정되었습니다')
      Cookies.set('userName', userNm.value, { expires: 7, path: '' })
      Cookies.set('userRank', userRk.value, { expires: 7, path: '' })
      router.push('/profile')
    })
    .catch((err) => {
      console.log('2')
      console.error(err)
      console.log(updateName, '실빼애애앳!!!!')
    })
}
</script>

<template>
  <h1>프로필 수정</h1>
  <div class="signin">
    <form @submit.prevent="updateNameForm">
      <input v-model="userNm" type="text" placeholder="이름을 입력해주세요." /><br />

      <select :value="userRk" v-model="userRk" name="rank" id="rank">
        <option value="A">관리자</option>
        <option value="B">일반</option>
      </select>

      <button type="submit">수정</button>
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
