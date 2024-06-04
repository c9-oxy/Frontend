<!-- eslint-disable no-undef -->
<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'

// User 입력 필드를 위한 ref 변수 선언
const ID = ref('')
const PW = ref('')
const NAME = ref('')
const RANK = ref('')
const idrr = ref('이미 사용중인 아이디입니다')
const idCheck = ref(true)
const pwrr = ref('특수문자가 포함되어야 합니다.')
const pwCheck = ref(true)
const PWPW = ref('')
const pwpwCheck = ref(true)
const pwpwrr = ref('비밀번호가 일치하지 않습니다')
const nameCheck = ref(true)
const namerr = ref('이미 사용중인 이름입니다')
const router = useRouter()

// id 중복 체크 함수
const checkId = () => {
  axios
    .get(`http://localhost:8082/check-id/${ID.value}`) // 서버에 id 중복 체크 요청을 보냄
    .then((res) => {
      console.log(res.data)
      if (res.data == false) {
        idCheck.value = false // id가 중복되면 false로 설정
      } else {
        idCheck.value = true // id가 중복되지 않으면 true로 설정
      }
    })
    .catch((err) => {
      console.error(err)
      idError.value = 'ID 체크 실패: ' + err.message
    })
}

// name 중복 체크 함수
const checkName = () => {
  axios
    .get(`http://localhost:8082/check-name/${NAME.value}`) // 서버에 id 중복 체크 요청을 보냄
    .then((res) => {
      console.log(res.data)
      if (res.data == false) {
        nameCheck.value = false // name가 중복되면 false로 설정
      } else {
        nameCheck.value = true // name가 중복되지 않으면 true로 설정
      }
    })
    .catch((err) => {
      console.error(err)
      idError.value = 'NAME 체크 실패: ' + err.message
    })
}

// 회원가입 함수
// 회원가입 함수
const register = () => {
  if (
    ID.value &&
    PW.value &&
    PWPW.value &&
    NAME.value &&
    RANK.value &&
    pwCheck.value &&
    nameCheck.value &&
    pwpwCheck.value
  ) {
    // 비밀번호와 비밀번호 재입력이 일치하는지 확인합니다.

    // 새 User 정보를 담은 객체 생성
    const newUser = {
      USER_ID: ID.value,
      USER_PW: PW.value,
      USER_NAME: NAME.value,
      USER_RANK: RANK.value
    }
    router.push('/')
    axios
      .post('http://localhost:8082/User', newUser)
      .then((res) => {
        console.log(res.data)
        alert(res.data)
      })
      .catch((err) => {
        console.error(err)
        alert('회원가입 실패: ' + err.message)
      })
  } else {
    alert('입력되지 않는 것이 있습니다.')
  }
}

// 비밀번호의 특수문자 포함됬는지 확인하는 watch 함수
const index = () => {
  const text = /[!@#$%^&*(),.?":{}|<>]/ // 특수문자 정규 표현식 특수문자 포함이 되어있는지 안되어있는지 확인
  if (!text.test(PW.value)) {
    //여기서 보면 월래 정상은 특수문자가 들어있다면 true를 반환함 하지만 !느낌표(조건의 반대)를 붙혔기 때문에 만약
    //특수문자를 포함해서 text가 true가 된다면 반대로 false가 됨 그래서 if문이 아니라 else문으로 내려가서
    //else문이 실행되어 true로 만듬 반대로 특수문자가 포함되지 않으면 text가 false가 되고 그걸 !느낌표로 true로 바꿔준다음
    //if문 실행 하여 false로 만듬
    pwCheck.value = false
  } else {
    pwCheck.value = true
  }
}
// 비밀번호 일치 여부 확인하는 watch 함수
watch([PW, PWPW], ([valuePW, valuePWPW]) => {
  if (valuePW !== valuePWPW) {
    //이것도 마찬가지로 만약 PW과 PWPW이 적은게 안맞으면 false가 되지만 !느낌표를 사용하여 true로 바꿔 if문 실행
    //하여 pwpwCheck를 false로 바꿈 반대로 PW과 PWPW이 적은게 똑같으면 true가 되지만 !느낌표를 사용하여 false로 바꿈
    //그리고 if문에서 else문으로 내려감 pwpwCheck를 true로 만듬
    pwpwCheck.value = false
  } else {
    pwpwCheck.value = true
  }
})
</script>

<template>
  <div>
    <form name="frm" method="POST" @submit.prevent="submitForm">
      <table>
        <tr>
          <th>ID</th>
          <td>
            <input type="text" v-model="ID" placeholder="ID 입력" @mouseout="checkId" />
            <span v-if="!idCheck">{{ idrr }}</span>
          </td>
        </tr>
        <tr>
          <th>PW</th>
          <td>
            <input type="password" v-model="PW" placeholder="PW 입력" @mouseout="index" />
            <!--
              만약 특수문자가 포함 되어있다면 pwCheck가 true가 됨 하지만 여기서도 !느낌표(조건의 반대)를 붙혀서
              만약 true면 반대로 false가 되면서 pwrr 실행하지 않음 또 만약 pwCheck가 false면 반대로 true가 되며
              if문 실행함
            -->
            <span v-if="!pwCheck">{{ pwrr }}</span>
          </td>
        </tr>
        <tr>
          <th>PW 확인</th>
          <td>
            <input type="password" v-model="PWPW" placeholder="PW 재입력" />
            <!--
              요기도 이제 만약 pwpwCheck가 true면 반대로 pwpwCheck를 false로 바꿔 실행 안함
              반대로 pwpwCheck가 false면 true로 바꿔 실행함
            -->
            <span v-if="!pwpwCheck">{{ pwpwrr }}</span>
          </td>
        </tr>
        <tr>
          <th>NAME</th>
          <td>
            <input type="text" v-model="NAME" placeholder="NAME 입력" @mouseout="checkName" />
            <!--
              이 친구도 똑같이 위와 동일하게 코드짬
            -->
            <span v-if="!nameCheck">{{ namerr }}</span>
          </td>
        </tr>
        <tr>
          <th>RANK</th>
          <td>
            <select id="dnwns" v-model="RANK">
              <option value="">등급을 선택하세요</option>
              <option value="A">관리자</option>
              <option value="B">일반</option>
            </select>
          </td>
        </tr>
        <td colspan="2">
          <!--
            @click를 이용해서 클릭하면 모든 값이 잘 들어와있나 확인한뒤 다 잘 값이 들어와있다면 register 함수
          -->
          <button type="button" @click="register()">회원가입</button>
          <button type="reset">다시쓰기</button>
        </td>
      </table>
    </form>
  </div>
</template>

<style scoped>
span {
  color: red;
}
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
span {
  font-size: 12px;
  display: block;
  margin-top: 5px;
}
</style>
