<script>
import axios from 'axios'


export default {
  name: 'Categories-Card',
  data() {
    return {
      categories: [],
      loading: false,
      error: null
    }
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true;
        this.error = null;

        const res = await axios.get('http://localhost:8082/groups');
        this.categories = res.data;
      } catch (error) {
        this.error = 'Error while fetching categories: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div v-for="categorie in categories" :key="categorie.taskGroupdId"
      class="bg-[#4CAF50] p-2 rounded-md"
    >
      <h1 class="text-md font-bold">{{categorie.taskGroupName}}</h1>
    </div>
  </div>
</template>
