<template>
    <div class="neu">
        <h1>neues Kind erstellen</h1>
        <div class="wrapper">
            <div class="grid">
                <label for="firstName">Vorname: </label>
                <input type="text" name="firstName" id="firstName" class="firstName" v-model="firstName">
                <label for="lastName">Nachname: </label>
                <input type="text" name="lastName" id="lastname" class="lastName" v-model="lastName">
                <label for="birthDate">Geburtsdatum:</label>
                <input type="date" name="birthDate" id="birthDate" v-model="birthDate">
                <div class="error">
                    <span>
                        {{ errorMsg }}
                    </span>
                </div>
                <button class="send" @click="send()" >erstellen</button>
            </div>
        </div>
    </div>
</template>

<script>
import shared from "../auth.js"

export default {
    name: "Neu",
    data() {
        return {
            firstName: "",
            lastName: "",
            birthDate: "",
            errorMsg: ""
        }
    },
    created() {
        this.authenticate = shared.authenticate
        this.logout = shared.logout
    },
    mounted() {
        this.authenticate()
    },
    methods: {
        async send() {
            if (!this.firstName){
                this.errorMsg = "Vorname darf nicht leer sein!"
            } else if (!this.lastName){
                this.errorMsg = "Nachname darf nicht leer sein!"
            } else if (!this.birthDate){
                this.errorMsg = "Gerburtsdatum darf nicht leer sein!"
            } // check ob Geburtsdatum in der Vergangenheit liegt!
            else {
                await this.authenticate()
                const result = await fetch("https://beobachtungsboegen.herokuapp.com/create-child", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.$session.get('accessToken')}`
                    },
                    body: JSON.stringify({
                        "firstName": this.firstName,
                        "lastName": this.lastName,
                        "birthDate": this.birthDate
                    })
                })
                if (result.status === 201){
                    this.$router.push("/beobachtungsboegen")
                } else {
                    this.errorMsg = "Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut."
                }
            }
        }
    }
}
</script>

<style>

</style>

<style scoped>
.wrapper {
    display: flex;
}
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5rem;
    max-width: 300px;
    margin: auto;
    border: 2px solid black;
    border-radius: 25px;
    padding: 30px;
    box-shadow: 3px 3px 10px 2px black;
}
.send {
    grid-column: 1 / -1;
    width: 80%;
    margin: auto;
    cursor: pointer;
}
.error {
    color: red;
    grid-column: 1/ -1;
}
</style>