<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref("")
const password = ref("")
const isFetching = ref(false)
const router = useRouter()

const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL


async function signUpFormSubmit() {
  isFetching.value = true
  try {
    const apiUrl = `${API_URL}/users`;
    const payload = {"user": { "email": email.value, "password": password.value }}

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      isFetching.value = false
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data from backend:', data);
    const token = data.token
    document.cookie = `jwt_token=${token}`
    isFetching.value = false
    router.replace("/")

  } catch (error) {
    console.error('Error:', error.message);
    isFetching.value = false
  }
}

// postData();

</script>

<template>
  <div class="auth-card">
    <p>Sign up for a new account</p>
    <div>
      <form @submit.prevent="signUpFormSubmit">
        <div class="email-field-container">
          <label for="email">Email</label>
          <input v-model="email" placeholder="example@gmail.com" type="email" name="email" />
        </div>
        <div class="pwd-field-container">
          <label for="password">Password</label>
          <input v-model="password" placeholder="abcd" type="password" name="password" />
        </div>
        <a href="/login">Already have an account?</a>
        <input v-if="isFetching" style="background-color:lightgray;" type="submit" value="Signing Up.." />
        <input v-else type="submit" value="Sign Up" />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

a {
  font-size: 12px;
  display: block;
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

button {
  border: none;
  padding: 5px 10px 5px 10px;
  background-color: #47cf73;
  margin-right: 10px;
  border-radius: 5px;
  &:hover {
    background-color: lightgreen;
    transition-duration: 200ms;
  }
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
