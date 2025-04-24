<script setup>
import { ref } from 'vue'
const emit = defineEmits(['login-success'])

const user = ref('')
const pass = ref('')

const login = () => {
  if (user.value === 'admin' && pass.value === '1234') {
    emit('login-success')
  } else {
    alert('Credenciales inválidas')
  }
}
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">Iniciar Sesión</h2>
    <div class="input-group">
      <input 
        v-model="user" 
        placeholder="Usuario" 
        class="login-input"
      />
    </div>
    <div class="input-group">
      <input 
        v-model="pass" 
        type="password" 
        placeholder="Contraseña" 
        class="login-input"
      />
    </div>
    <button @click="login" class="login-button">Entrar</button>
  </div>
</template>

<style scoped>

.login-container {
  max-width: 300px;
  margin: auto; /* Centrado horizontal */
  padding: 2rem;
  background-color: rgb(0, 0, 0);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Nuevo código para centrado vertical */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px #42b883;
}

.login-title {
  color: #42b883;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.input-group {
  margin-bottom: 1rem;
}

.login-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.login-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3aa876;
}

.login-button:active {
  background-color: #329b6a;
}
</style>