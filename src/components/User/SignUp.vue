<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 사용자 입력 값을 저장할 ref 변수
const ID = ref('')
const PW = ref('')
const NAME = ref('')
const RANK = ref('')

// 폼 제출 시 호출되는 함수
const register = (e) => {
  e.preventDefault() // 폼의 기본 동작을 막음

  // 입력된 사용자 정보를 담은 객체 생성
  const newUser = {
    USER_ID: ID.value,
    USER_PW: PW.value,
    USER_NAME: NAME.value,
    USER_RANK: RANK.value
  }

  // 서버에 POST 요청을 보내 사용자 등록
  axios
    .post('http://localhost:8082/signup', newUser)
    .then((res) => {
      console.log(res.data) // 응답 데이터 콘솔에 출력
      alert(res.data) // 응답 메시지를 알림으로 표시
    })
    .catch((err) => {
      console.error(err) // 오류 콘솔에 출력
      alert('회원가입에 실패하였습니다.') // 오류 메시지를 알림으로 표시
    })
}
</script>

<template>
  <div>
    <form @submit="register">
      <!-- 폼 제출 시 register 함수 호출 -->
      <table>
        <tr>
          <th>ID</th>
          <td><input type="text" v-model="ID" placeholder="ID 입력" /></td>
        </tr>
        <tr>
          <th>PW</th>
          <td><input type="password" v-model="PW" placeholder="PW 입력" /></td>
        </tr>
        <tr>
          <th>NAME</th>
          <td><input type="text" v-model="NAME" placeholder="NAME 입력" /></td>
        </tr>
        <tr>
          <th>RANK</th>
          <td>
            <select id="dnwns">
              <option value="">등급을 선택하세요</option>
              <option value="A">관리자</option>
              <option value="B">일반</option>
            </select>
          </td>
        </tr>
        <td colspan="2">
          <button type="submit">회원가입</button>
          <button type="reset">다시쓰기</button>
        </td>
      </table>
    </form>
  </div>
</template>

<style>
#dnwns {
  width: 200px;
  height: 46px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
table {
  border: solid 1px black;
}
tr {
  border: solid 1px black;
}
td {
  border: solid 1px black;
  text-align: center;
}
th {
  border: solid 1px black;
  font-size: 20px;
  font-weight: bold;
}
button {
  width: 150px;
  height: 30px;
}
input {
  height: 50px;
  width: 300px;
}
</style>
