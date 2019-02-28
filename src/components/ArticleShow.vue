<template>
  <Card style="margin-top: 100px">
    <p v-if="article" v-html="article"></p>
  </Card>
</template>

<script>
    export default {
      name: "article-show",
      props:[article],
      data(){
        return {
        }
      }
    }
</script>

<style scoped>

</style>
