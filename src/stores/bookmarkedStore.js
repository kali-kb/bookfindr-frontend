import { defineStore } from "pinia";
import {ref} from "vue"

export const useBookmarkedStore = defineStore('bookmarked', () => {
  const saved = ref([])
  const savedSearchedBook = ref([])
  // const name = ref('Eduardo')

  const isSaved = (bookId, isSearched) => {
    if(isSearched) {
      return savedSearchedBook.value.some(book => book["saved_book"] === bookId)
    } else {
      return saved.value.some(book => book["saved_book"] === bookId)
    }
  }




  function toggleSaved(bookId, isSearched) {
    if(isSaved(bookId, isSearched)){
      console.log("saved")
      const data = isSearched ? savedSearchedBook.value.filter(book => book["saved_book"] != bookId) : saved.value.filter(book => book["saved_book"] != bookId)
      if (isSearched) { savedSearchedBook.value = data; return } else { saved.value = data; return}
    } else {
      console.log("unsaved")
      if(isSearched) {
        savedSearchedBook.value.push({saved_book: bookId})
      } else {
        saved.value.push({saved_book: bookId})
      }
    }
  }



  return { saved, savedSearchedBook, isSaved, toggleSaved }

})