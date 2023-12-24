<script setup>
import Book from './Book.vue'

const props = defineProps({
  data: Array,
  isSearchedBook: Boolean,
  fromView: String
})

</script>

<template>
  <section>
    <div v-if="data.length > 0" class="booklist">
      <Book v-for="(book, index) in data" :fromView="fromView" :resultIndex="index" :isSearched="isSearchedBook" :book="book" :key="index" />
    </div>
  	<div v-else>
  		<p>No Saved Books Yet</p>
  	</div>
  </section>
</template>

<style lang="scss" scoped>
	
.booklist {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

p {
	text-align:center;
	transform: translateY(150%);
}

section {
  margin: 15px;
}
</style>
