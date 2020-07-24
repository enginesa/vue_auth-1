<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <router-link tag="b-navbar-brand" :to="{name:'Home'}" exact>AUTH</router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav v-if="!$store.getters.loginControl">
                <b-navbar-nav>
                    <router-link tag="b-nav-item" :to="{name:'Login'}" active-class="active">Giriş Yap</router-link>
                    <router-link tag="b-nav-item" :to="{name:'Register'}" active-class="active">Kayıt Ol</router-link>
                </b-navbar-nav>
            </b-collapse>


            <b-navbar-nav class="ml-auto">
                <b-nav-item @click="logOut" v-if="$store.getters.loginControl">Çıkış Yap</b-nav-item>
            </b-navbar-nav>

        </b-navbar>



    </div>
</template>

<script>
    export default {
        methods:{
            logOut(){
                this.$store.dispatch("logOut");
                this.$router.push({name:"Login"})
            }
        }
    }
</script>