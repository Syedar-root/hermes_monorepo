<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import { Hermes } from 'hermes_fe'
  const hermes = new Hermes({ markId: 'hermes-id' })
  hermes.init()
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img
        data-hermes-id="panel"
        src="/vite.svg"
        class="logo"
        alt="Vite logo"
      />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1 data-hermes-id="title" data-hermes-trigger="click">Hello Vue</h1>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
