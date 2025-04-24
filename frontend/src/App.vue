<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'


const isLogged = ref(false)
const loginSuccess = () => {
  isLogged.value = true
}
</script>

<template>
  <Navbar v-if="isLogged" />
  <Login v-else @login-success="loginSuccess" />
  <router-view v-if="isLogged" />
</template>
