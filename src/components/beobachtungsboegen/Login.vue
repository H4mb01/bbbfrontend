<template>
    <div class="login">
        <h2>Login</h2>
        <div class="grid">
            <label for="name">Name:</label>
            <input required type="text" name="name" id="name" v-model="name">
            <label for="password">Passwort: </label>
            <input required type="password" name="password" id="password" v-model="password">
            <button id="loginBtn" @click="login()" >Login</button>
        </div>
        <br>
        <router-link class="registerLink" to="/register">du hast noch keinen Account? hier registrieren</router-link>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            name: "",
            password: ""
        }
    },
    methods: {
        async login() {
            let accessToken = ""
            let refreshToken = ""
            try{
                await fetch("https://beobachtungsboegen.herokuapp.com/users/login", {
                    method: "POST",
                    body: JSON.stringify({
                        name: this.name,
                        password: this.password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(data => {
                    accessToken = data.accessToken
                    refreshToken = data.refreshToken
                })
                this.$session.set("accessToken", accessToken)
                this.$session.set("username", this.name)
                this.$session.set("refreshToken", refreshToken)
                this.$emit("token", {accessToken: accessToken, refreshToken: refreshToken})
                this.$router.push("/beobachtungsboegen")
            }
            catch (e) {
                console.log("error:", e)
            }

        }
    }
}
</script>

<style>

</style>

<style scoped>
.login {
    max-width: minmax(300px, 50%);
    margin: auto;
    border: 2px solid black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 1px 7px 2px rgba(0, 0, 0, 0.603);
}

#loginBtn {
    width: 100%;
    grid-column: 1 / -1 ;
    margin-top: 20px;
}

.grid {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 5px;
}

.registerLink {
    font-size: .75rem;
}
</style>