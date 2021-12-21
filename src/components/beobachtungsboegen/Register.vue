<template>
    <div class="register">
        <h2>Registrieren</h2>
        <div class="grid">
            <label for="name">Name:</label>
            <input required type="text" name="name" id="name" v-model="name">
            <label for="password">Passwort: </label>
            <input required type="password" name="password1" id="password1" v-model="password1">
            <label for="password2">Passwort wiederholen: </label>
            <input required type="password" name="password2" id="password2" v-model="password2">
            <p class="error">
                <span v-if="errorMsg"> {{ errorMsg }} </span>
            </p>
            <button id="registerBtn" @click="register()" >Register</button>
        </div>
        <br>
        <router-link class="loginLink" to="/login">du hast schon einen Account? hier einloggen </router-link>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            name: "",
            password1: "",
            password2: "",
            errorMsg: "",
            minimumPasswordLength: 8,
            minimumNameLength: 3,
        }
    },
    methods: {
        async register() {
            this.errorMsg = ""
            console.log(this.name, this.password1, this.password2)
            if(!this.name){
                this.errorMsg = "Name darf nicht leer sein!"
                return 0
            } else if(!this.password1 || !this.password2){
                this.errorMsg = "Passwort darf nicht leer sein!"
                return 0
            } else if (this.password1 !== this.password2){
                this.errorMsg = "Passwörter stimmen nicht überein!"
                return 0
            } else if (this.password1.length < this.minimumPasswordLength) {
                this.errorMsg = "Passwort muss mindestens 8 Zeichen haben!"
                return 0
            } else if (this.name.length < this.minimumNameLength){
                return 0
            }
            const result = await fetch("https://beobachtungsboegen.herokuapp.com/register", {
                method: "POST",
                body: JSON.stringify({"name": this.name, "password": this.password1}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (result.status === 201 ) {
                this.$router.push("/beobachtungsboegen")
            }
            else if (result.status === 500) {
                this.errorMsg = "Internal Server Error, please try again later"
            } else if (result.status === 401) {
                this.errorMsg = "Ein Benutzer mit diesem Namen existiert bereits."
            }
        }
    }
}
</script>

<style>

</style>

<style scoped>
.register {
    max-width: minmax(300px, 50%);
    margin: auto;
    border: 2px solid black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 1px 7px 2px rgba(0, 0, 0, 0.603);
}

#registerBtn {
    width: 100%;
    grid-column: 1 / -1 ;
    margin-top: 20px;
}

.grid {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 5px;
}
.loginLink {
    font-size: .75rem;
}
.error {
    color: red;
    grid-column: 1/-1;
}
</style>