<template>
  <div id="app">
    <top-nav class="top"></top-nav>
    <router-view></router-view>
    <bottom-footer class="bottom"></bottom-footer>
  </div>
</template>

<script>
  export default {
    components:{
    }
  }
</script>

<style>
  body {
    background: #e9e9e9 !important;
    min-height: 2000px;
  }
</style>
