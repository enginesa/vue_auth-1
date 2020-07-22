<template>
  <div id="app">

    <router-view></router-view>


  </div>
</template>

<script>
  // import Home from './views/Home'
  export default {
    components:{
      // Home
    },
    created() {
      console.log(this.$store.state);
    }
  }
</script>
