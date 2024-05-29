<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userId = ref('')
const userNm = ref('')
const userRk = ref('')

const router = useRouter()

onMounted(() => {
  //페이지 로드 시
  const id = window.localStorage.getItem('userId') //id, name, rank에 로컬스토리지 내의 데이터를 불러옴
  const name = window.localStorage.getItem('userName')
  const rank = window.localStorage.getItem('userRank')

  if (!id && !name && !rank) {
    // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
    router.push('/signup')
  } else {
    //로그인을 했다면 userId 등등에 로컬스토리지에서 가져온 데이터를 삽입
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
</script>

<template>
  <div class="personal-info">
    <h1>마이페이지</h1>
    <br />
    <h3>나의정보</h3>
    <hr />
    <br />
    <h3 style="display: inline">아이디:</h3>
    <h3 style="display: inline">{{ userId }}</h3>
    <br />
    <h3 style="display: inline">이름:</h3>
    <h3 style="display: inline">{{ userNm }}</h3>
    <br />
    <h3 style="display: inline">유저등급:</h3>
    <h3 style="display: inline">{{ userRk }}</h3>
    <br /><br /><br /><br /><br />
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
