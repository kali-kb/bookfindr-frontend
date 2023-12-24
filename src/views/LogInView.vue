<script setup>

import { ref, watch } from "vue"
import { useRouter } from "vue-router";


const router = useRouter()

const email = ref("")
const password = ref("")
const isFetching = ref(false)
const errors = ref([])
const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL

// watch


watch(email, (newVal) => {
  console.log(`new email value: ${newVal}`)
})



async function logInHandler() {
	isFetching.value = true
  errors.value = []
	const payload = {"user": { "email": email.value, "password": password.value }}

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetch(`${API_URL}/signin`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    console.log('API response:', data);
    const token = data.token
    document.cookie = `jwt_token=${token}`
    router.replace("/")

  } catch (error) {
    // Handle network or other errors, or errors in the response
    console.error('The Error:', error.message);
    errors.value.push("Something went wrong")
    isFetching.value = false
  }
}

</script>

<template>
  <div class="auth-card">
    <p>Log into your account</p>
    <div>
      <div v-if="errors.length > 0">
        <p style="color:red;" v-for="(error, index) in errors" :key="index">{{ error }}</p>
      </div>
      <form @submit.prevent="logInHandler">
        <div class="email-field-container">
          <label for="email">Email</label>
          <input v-model="email" @input="handleInput" placeholder="example@gmail.com" type="email" name="email" />
        </div>
        <div class="pwd-field-container">
          <label for="password">Password</label>
          <input v-model="password"  placeholder="abcd" type="password" name="password" />
        </div>
        <a href="/signup">Don't have an account?</a>
        <input v-if="isFetching" style="background-color:lightgray;" type="submit" value="Logging in.." />
        <input v-else type="submit" value="Log In" />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.auth-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  max-width: 20rem;
  border-radius: 5px;

  @media (max-width: 767px) {
    width: 90%;
  }

  p {
    text-align: center;
    margin: 30px 0 30px 0;
    font-weight: bold;
  }

  & > div {
    margin: 30px;

    & > form > * {
      margin: 10px 0 10px 0;
    }
  }
}

a {
  font-size: 12px;
  display: block;
}

input[type="submit"] {
  border: none;
  padding: 5px 10px 5px 10px;
  background-color: #47cf73;
  margin-right: 10px;
  border-radius: 5px;
  width: auto;
  &:hover {
    background-color: lightgreen;
    transition-duration: 200ms;
  }
}

input {
  width: 90%;
  outline: none;
  padding: 5px;
}
</style>
