<script setup lang="ts">
import Categories from '@/components/Categories.vue'
import { Hexagon } from 'lucide-vue-next'
</script>

<template>
  <main>
    <div class="mx-[5%] py-5">
      <div class="flex gap-2 mb-5 items-center">
        <Hexagon size="50" />
        <h1 class="text-xl font-bold">Node List</h1>
      </div>
      <div class="flex items-center justify-center w-full">
        <Categories />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
