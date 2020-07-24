<template>
    <div id="app">
        <Navbar></Navbar>
        <router-view></router-view>


    </div>
</template>

<script>
    // import Home from './views/Home'
    import Navbar from "./components/shared/Navbar";

    export default {
        components: {
            Navbar,

        },
        created() {
            this.$store.dispatch("initApp");
        }
    }
</script>
