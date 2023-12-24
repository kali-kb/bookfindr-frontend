<script setup>

// import eventBus from '../../custom/eventBus'
// const saved = ref(false)
// import { useBookmarkedStore } from "@/stores/bookmared"
import { toRefs } from "vue"
import { useBookmarkedStore } from "../stores/bookmarkedStore"


const props = defineProps({
  book: Object,
  isSearched: Boolean,
  resultIndex: String,
  fromView: String
})



const store = useBookmarkedStore()


// onMounted(() => {
  // console.log("savedBooks:", store.savedBooks)
// })



const setFallbackCover = (event) => {
  event.target.src = "/src/assets/placeholder-cover-img.png";
  event.target.removeEventListener('error', setFallbackCover);
}

const savedBook = async(id, index) => {

  if (id) { store.toggleSaved(id, false) } else { store.toggleSaved(index, true) }
  const bookData = toRefs(props.book)
  console.log("book data: ", bookData.author.value)
  
  const bookPayload = {
    save_book_data: {
      book: {
        title: bookData.title.value,
        download_link: bookData.download_link.value,
        cover: bookData.cover.value,
        author: bookData.author.value
      }
    }
  }

  // console.log(bookPayload)

  try {
    const jwtToken = $cookies.get("jwt_token");

    const url = new URL('http://172.29.147.174:3000/saved_books');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(bookPayload)

    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


  } catch (error) {
    console.error('Error:', error.message);
  }


}


</script>

<template>
  <div id="card">
    <div id="cover-container">
      <img @error.once="setFallbackCover" height="250" width="200" :src="'http://library.lol/covers/0/0213f27d25e5df58e43b889d94b41be4-d.jpg'" />
      <div v-if="fromView == 'home'">
        <button v-if="book.is_saved || (store.saved.some(obj => obj['saved_book'] == book.id)) || (store.savedSearchedBook.some(obj => obj['saved_book'] == resultIndex))"  id="bookmark-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(71, 207, 115, 1);transform: ;msFilter:;"><path d="M12 11.222 14.667 13l-.89-3.111L16 8l-2.667-.333L12 5l-1.333 2.667L8 8l2.223 1.889L9.333 13z"></path><path d="M19 21.723V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v17.723l7-4.571 7 4.571zM8 8l2.667-.333L12 5l1.333 2.667L16 8l-2.223 1.889.89 3.111L12 11.222 9.333 13l.89-3.111L8 8z"></path></svg>
        </button>
        <button v-else @click.once="savedBook(book.id, resultIndex)" id="bookmark-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(71, 207, 115, 1); transform:; msfilter:"
          >
            <path
              d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"
            ></path>
          </svg>
        </button>
      </div>
      <div v-else></div>
    </div>
    <div>
      <p>{{ book.title }}<a :href="book.download_link">(Download)</a></p>
      <p>{{ book.author }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#card {
  height: auto;
  width: 270px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;


  @media (max-width: 767px) {
    max-width:270px;
    min-width: 200px;

  }
      

  #cover-container {
    overflow: hidden;
    height: 250px;
    position: relative;

    #bookmark-btn {
      border: none;
      border-radius: 3px;
      background: #404040;
      display: inline-flex;
      padding-top: 5px;
      padding-bottom: 5px;
      z-index: 999;
      position: absolute;
      right: 10px;
      bottom: 20px;
    }

    img {
      object-fit: fill;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
  }

  & > div:nth-child(2) {
    padding: 8px;
    & > p:nth-child(2) {
      font-size: 12px;
      font-style: italic;
    }
    & > p:first-child {
      font-size: 13px;
      font-weight: 700;
    }
  }
}
</style>
