<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/"> Home </RouterLink> || <RouterLink to="/about"> Account </RouterLink> ||
    <RouterLink to="/customer"> Customer </RouterLink> || <RouterLink to="/transaction"> Transaction </RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
.router-link-active {
	color: Grey;
	font-weight: bold;
}
</style>