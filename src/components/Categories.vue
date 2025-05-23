<script>
import axios from 'axios'
import { ChevronDown, Flag, Pencil } from 'lucide-vue-next'
import { PriorityLevels } from '../conts/PriorityLevels'

export default {
  name: 'Categories-Card',
  components: { ChevronDown, Flag, Pencil },
  data() {
    return {
      categories: [],
      loading: false,
      error: null,
      openCategories: {},
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

        const res = await axios.get('http://localhost:8081/groups')
        this.categories = res.data

        this.categories.forEach((cat) => {
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
    },
    getPrioriotyColor(priorityTitle) {
      const priority = PriorityLevels.find((priority) => priority.label === priorityTitle)
      return priority?.color
    },
  },
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <div v-for="categorie in categories" :key="categorie.taskGroupId">
      <div class="bg-[#4CAF50] p-2 rounded-md flex flex-row justify-between items-center">
        <h1 class="text-md font-bold">{{ categorie.taskGroupName }}</h1>
        <button @click="toggleOpen(categorie.taskGroupId)" class="text-white">
          <ChevronDown
            class="text-white transition duration-300"
            :class="{
              'ease-out': openCategories[categorie.taskGroupId],
              'rotate-180 ease-in': !openCategories[categorie.taskGroupId],
            }"
          />
        </button>
      </div>
      <div
        v-if="openCategories[categorie.taskGroupId]"
        class="bg-[#1F1F1F] mt-3 p-2 rounded-md flex flex-col gap-3"
      >
        <div v-for="task in categorie.tasks" :key="task.taskId">
          <div class="bg-[#121212] p-3 flex flex-col gap-3 rounded-md">
            <div class="flex items-center justify-between">
              <div class="flex gap-2 text-xl font-bold capitalize">
                <input type="checkbox" />
                <label>{{ task.title }}</label>
              </div>

              <div class="flex items-center gap-4">
                <Flag
                  :style="{
                    color: getPrioriotyColor(task.priority),
                    fill: getPrioriotyColor(task.priority),
                  }"
                />
                <Pencil />
              </div>
            </div>
            <div class="p-3 bg-[#1F1F1F] rounded-md">
              <textarea
                readonly
                rows="3"
                :value="task.description"
                class="w-full outline-none bg-transparent resize-none"
              />
            </div>
            <div class="h-1 w-full bg-[#1F1F1F] rounded-full my-2" />
            <div class="text-sm flex justify-between">
              <p><strong>Criado em:</strong> {{ task.createdAt }}</p>
              <p><strong>Atualizado em:</strong> {{ task.updatedAt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
