<template>
    <div>
        <b-container class="bv-example-row">

            <b-col lg="5" offset-lg="4">
                <h3 class="text-center">Kayıt Ol</h3>

                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group
                            id="input-group-1"
                            label="E-posta:"
                            label-for="input-1">
                        <b-form-input
                                id="input-1"
                                v-model="form.email"
                                type="text"
                                required
                                placeholder="E-posta Girin"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Şifre:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                v-model="form.password"
                                required
                                placeholder="Şifre Girin"
                                type="password"
                        ></b-form-input>
                    </b-form-group>


                    <b-button type="submit" variant="primary">Kayıt Ol</b-button>
                    <b-button type="reset" variant="danger">Sıfırla</b-button>
                    <br>
                    <br>
                    <p class="text-danger" v-if="hata">{{hata}}</p>
                </b-form>

            </b-col>
        </b-container>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                hata: "",
                form: {
                    email: '',
                    password: '',
                },
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch("register", this.form)
                    .then((par) => {
                        if (par === 200) {
                            this.hata = "Kayıt olundu...";
                            this.$router.push({name: "Home"});
                        } else this.hata = par;
                    })


            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.password = ''
            }
        }
    }
</script>