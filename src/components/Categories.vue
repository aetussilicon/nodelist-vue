<script>
import axios from 'axios'
import { ChevronDown } from 'lucide-vue-next'

export default {
  name: 'Categories-Card',
  components: { ChevronDown },
  data() {
    return {
      categories: [],
      loading: false,
      error: null,
      openCategories: {}
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true
        this.error = null

        const res = await axios.get('http://localhost:8082/groups')
        this.categories = res.data

        this.categories.forEach(cat => {
          this.openCategories[cat.taskGroupId] = true
        })

      } catch (error) {
        this.error = 'Error while fetching categories: ' + error.message
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    toggleOpen(id) {
      this.openCategories[id] = !this.openCategories[id]
    }
  }
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div v-for="categorie in categories" :key="categorie.taskGroupId"
    >
      <div class="bg-[#4CAF50] p-2 rounded-md flex flex-row justify-between items-center">
        <h1 class="text-md font-bold">{{ categorie.taskGroupName }}</h1>
        <button @click="toggleOpen(categorie.taskGroupId)" class="text-white">
          <ChevronDown
            class="text-white transition duration-300"
            :class="{
              ' ease-out' : openCategories[categorie.taskGroupId],
              'rotate-180 ease-in' : !openCategories[categorie.taskGroupId]
              }"
          />
        </button>
      </div>
      <div v-if="openCategories[categorie.taskGroupId]" class="bg-[#1F1F1F] mt-3 p-2 rounded-md">
        <h1>Tasks</h1>
      </div>
    </div>
  </div>
</template>
