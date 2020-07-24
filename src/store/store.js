import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import router from '../router/index'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {

        apiKey: "AIzaSyA0-Twhb-AzxZRSqKpnDas32VjFfGpXS0A",

        loginToken: "",
    },
    getters: {

        loginControl(state) {
            return state.loginToken !== "";
        }
    },
    mutations: {
        setToken(state, token) {
            state.loginToken = token;
            localStorage.setItem("token", token);
        },
        removeToken(state) {
            state.loginToken = "";
            localStorage.removeItem("token");
        }
    },
    actions: {

        initApp({commit,dispatch}) {
            var storageToken = localStorage.getItem("token");
            var tokenExpireTime = localStorage.getItem("tokenExpireTime");

            var nowTime = new Date().getTime();


            if(storageToken){
                //token süresi bitmişsse
                if (nowTime >= tokenExpireTime) {

                    dispatch("logOut");
                    router.push({name:"Login"});

                } else {
                    var tokenTime = tokenExpireTime - nowTime;
                    dispatch("loginTimeOut",tokenTime);
                    commit("setToken", storageToken);
                    router.push({name: "Home"})

                }
            }else{
                router.push({name:"Login"});
            }


        },

        login({state, commit, dispatch}, payload) {
            return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + state.apiKey, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }).then(function (response) {
                commit("setToken", response.data.idToken);
                dispatch("loginTimeOut", 60 * 1000);
                return response.status;
            }).catch(function (error) {
                return error.response.data.error.message;
            });
        },
        register({state, commit, dispatch}, payload) {
            return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + state.apiKey, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }).then(function (response) {
                commit("setToken", response.data.idToken);
                dispatch("loginTimeOut", response.data.expiresIn * 1000);


                return response.status;
            }).catch(function (error) {
                return error.response.data.error.message;
            });
        },

        logOut({commit}){
            commit("removeToken");
            localStorage.removeItem("tokenExpireTime");
        },

        loginTimeOut({commit}, outSecond) {
            //direk mili saniyeye göre işlemi alıp işlem yaptırırsak hiç bir tarayıcıda sıkıntı olmaz
            var tokenExpireTime = new Date().getTime() + outSecond;
            localStorage.setItem("tokenExpireTime", tokenExpireTime);


            setTimeout(() => {
                commit("removeToken");
                router.push({name: "Login"});
            }, outSecond)
        }
    }
})

export default store;