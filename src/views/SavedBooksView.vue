<script setup>

import NavBar from "../components/NavBar.vue"	
import BooksList from "../components/BooksList.vue"
import { parseJwt } from '../utils/helpers'
import { onMounted, ref } from "vue";


const saved_books = ref([])
const user = ref({})

const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL




async function fetchData() {
  try {
    const apiUrl = `${API_URL}/saved_books`;
    
    const jwtToken = $cookies.get("jwt_token");

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken ? `Bearer ${jwtToken}` : '',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data from backend:', data);
    saved_books.value = data

  } catch (error) {
    console.error('Error:', error.message);
  }
}


async function getUserData() {
  if ($cookies.isKey("jwt_token")) {
    const token = $cookies.get("jwt_token")
    const user_data = parseJwt(token)
    user.value = user_data

  } else {
    console.log("token doesnt exists")
    router.replace('/login')
  }  
}

onMounted(() => {
	getUserData()	
	fetchData()
})



</script>

<template>
	<div>
		<NavBar :user="user" />
		<div>
			<h1 class="page-header">Saved Books</h1>
			<BooksList :fromView="'saved_books'"  :data="saved_books" />
		</div>
	</div>	
</template>

<style lang="scss" scoped>

.page-header {
	padding-left: 40px;

	@media (max-width: 767px) {
		text-align: center;
	}
}


</style>