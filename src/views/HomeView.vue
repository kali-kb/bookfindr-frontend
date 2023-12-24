<script setup>
import NavBar from '../components/NavBar.vue'
import BookList from '../components/BooksList.vue'
import { ref, watch, onMounted } from 'vue'
import { parseJwt } from '../utils/helpers'
import { useRouter } from 'vue-router'


var books = ref([])
var user = ref({})
var isFetching = ref(false)
var searchInputValue = ref('')
const API_URL = import.meta.env.VITE_BACKEND_SERVER_URL





var router = useRouter()


async function getInitialBooks(token) {
  const apiUrl = `${API_URL}/books.json`
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data)
    return data

  } catch (error) {
    console.error('Error:', error.message);
  }
}


async function getAllInitialData() {
  if ($cookies.isKey("jwt_token")) {
    const token = $cookies.get("jwt_token")
    const user_data = parseJwt(token)
    const books_data = await getInitialBooks(token)
    user.value = user_data
    books.value = books_data

  } else {
    router.replace('/login')
  }  
}

onMounted(() => {
  console.log(API_URL)
  getAllInitialData()
})


watch(searchInputValue, (old, newer) => {
  console.log(old)
  console.log(newer)
})



async function searchBooks() {
  isFetching.value = true;
  try {
    const jwtToken = $cookies.get("jwt_token");

    const queryParams = new URLSearchParams({
      query: searchInputValue.value,
    });

    const url = new URL(`${API_URL}/books/search`);
    url.search = queryParams.toString(); // Set the query string in the URL
    console.log(url.search)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      isFetching.value = false;
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    books.value = data
    isFetching.value = false;
    // console.log('API response:', data);

  } catch (error) {
    isFetching.value = false;
    console.error('Error:', error.message);
  }
}


</script>

<template>
  <main>
    <NavBar :user="user" />
    <section>
      <div>
        <h1>Unveiling Worlds: Your Ultimate Book Odyssey Begins Here</h1>
        <div id="search-bar">
          <input v-model="searchInputValue" type="text" placeholder="Search books..." />
          <button v-if="isFetching" style="background-color: lightgray;" id="search-btn">Searching...</button>
          <button v-else @click="searchBooks" id="search-btn">Search</button>
        </div>
      </div>
    </section>
    <div v-if="books.length > 0">
      <BookList :data="books" :fromView="'home'" :isSearchedBook="true" />
    </div>
    <div v-else>
      <p id="loading-text">Loading...</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#search-bar {
  margin-top: 50px;
  margin-bottom: 50px;

}

input[type='text'] {
  // width: 500px;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid lightgray;
}

section > div {
  text-align: center;
}

h1 {
  // text-align: center;
  font-size: 35px;
}

#search-btn {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #47cf73;
  font-weight: bold;
  &:hover {
    background-color: #2fa354;
    transition-duration: 200ms;
  }
}



@media (max-width: 600px) {
  #search-bar {
    width: 150px;
  }
}


#loading-text {
  text-align: center;
  margin: 100px;
}


</style>
