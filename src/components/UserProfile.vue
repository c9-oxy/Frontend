<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const userId = ref('')
const userNm = ref('')
const userRk = ref('')

const router = useRouter()

onMounted(() => {
  userId.value = Cookies.get('userId')
  userNm.value = Cookies.get('userName')
  userRk.value = Cookies.get('userRank')

  if (!userId.value) {
    router.push('/signup')
  }
})

const logout = () => {
  // 쿠키에서 사용자 정보 삭제
  Cookies.remove('userId', 'userName', 'userRank')
  // 로그아웃 후 리다이렉트
  router.push('/signup')
}

function myPosts() {
  router.push('/profile/post')
}
</script>

<template>
  <div class="personal-info">
    <h1>프로필</h1>
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

    <button @click="myPosts()">내가 쓴 글 보기</button>

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
