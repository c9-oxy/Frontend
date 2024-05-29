<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userNm = ref('')
const userRk = ref('')

const router = useRouter()

onMounted(() => {
  userNm.value = window.localStorage.getItem('userName')
  userRk.value = window.localStorage.getItem('userRank')
  console.log(userRk.value)
})

const updateNameForm = () => {
  const updateName = {
    userId: window.localStorage.getItem('userId'),
    userNm: userNm.value,
    userRk: userRk.value
  }

  axios
    // .put('http://localhost:8082/user', updateName)
    .post('http://localhost:8082/personal-info', updateName)
    .then((res) => {
      if (res.data) {
        alert('수정되었습니다')
        console.log(userNm.value)
        window.localStorage.setItem('userName', userNm.value)
        window.localStorage.setItem('userRank', userRk.value)
        router.push('/profile')
      } else {
        console.log(updateName)
        alert('수정에 실패하였습니다. 정확한 값을 입력해주세요.')
      }
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
