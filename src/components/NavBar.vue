<script setup>

import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  user: Object
})

const logOut = () => {
  $cookies.remove("jwt_token")
  router.replace("/login")
}


</script>

<template>
  <nav>
    <div v-if="!user">
      <a href="/">
        <div class="logo-container">
            <img src="../assets/bookfindr-logo.png" />
        </div>
      </a>
      <div>
        <button @click="$router.push({path: '/signup'})" id="signup-btn">
            Sign up
        </button>
        <button @click="$router.push({path: '/login'})" id="login-btn">Log in</button>
      </div>
    </div>
    <div v-else>
      <div id="left-container">
        <a href="/">
          <div class="logo-container">
            <img src="../assets/bookfindr-logo.png" />
          </div>
        </a>
        <div>
          <a href="/saved-books">Saved Books</a>
        </div>
      </div>
      <div id="right-container">
        <div>
          <img id="avatar" :src="'https://avatars.jakerunzer.com/'+ user.username" />
          <span>{{user.username}}</span>        
        </div>
        <button @click="logOut" id="logout-btn">Log Out</button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

nav {
  border-bottom: 1px solid lightgray;
}

@mixin button-style {
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 5px;
}

nav > div {
  position: sticky;
  background-color: #fff;
  top: 0;
  padding-right: 25px;
  padding-left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;

  .logo-container {
    height: 36px;
    width: 188px;
    overflow: hidden;

    & > img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
}

#signup-btn {
  @include button-style;
  border: none;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #47cf73;
  margin-right: 10px;
  &:hover {
    background-color: lightgreen;
    transition-duration: 200ms;
  }
}

#login-btn {
  @include button-style;
  padding-top: 3px;
  padding-bottom: 3px;
  background: transparent;
  border: 2px solid black;
  &:hover {
    border: 2px solid #47cf73;
    transition-duration: 200ms;
  }
}


#logout-btn {
  background: transparent;
  border: 2px solid red;
  border-radius: 5px;
}

#left-container {
  display: flex;
  align-items: center;
  & > div:nth-child(2) {
    margin-left: 20px;
  }
}

#right-container {
  display: flex;
  align-items: center;
  & > div {
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    & > * {
      padding: 4px;
    }
  }

}

a {
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}


// #right-container > div {
//   display: flex;
//   & > * {
//     padding: 4px;
//   }
// }

#avatar {
  height: 25px;
  width: 25px;
}

</style>
