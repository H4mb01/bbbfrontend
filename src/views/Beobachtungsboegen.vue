<template>
    <div class="beobachtungsboegen">
        <h1 v-if="authenitcated" > {{ username }}s Beobachtungsbögen</h1>
        <div v-if="authenticated" class="content">
            <Kinder :kinder="kinder" v-on:click-kind="showKind($event)" />
            <button @click="showBeobachtungsbogen = showBeobachtungsbogen ? false : true" >show</button>
            <button @click="showBeschreibungen = showBeschreibungen ? false : true" >Beschreibungen ein-/ausblenden</button>
            <button @click="logout()" >logout</button>
            <button @click="change = change ? false : true">change</button>
            <Beobachtungsbogen v-if="showBeobachtungsbogen" :kind="kind" :bildungsbereiche="bildungsbereiche" :showBeschreibungen="showBeschreibungen"
            :change="change" />
            <button @click="saveChanges()">save</button>
        </div>
    </div>
</template>

<script>
import Beobachtungsbogen from "../components/beobachtungsboegen/Beobachtungsbogen.vue"
import Kinder from "../components/beobachtungsboegen/Kinder.vue"

import jsondata from "../json/bildungsbereiche.json"
export default {
    name: "beobachtungsboegen",
    components: {
        Beobachtungsbogen,
        Kinder
    },
    data() {
        return {
            accessToken: "",
            showNeu: false,
            showBeobachtungsbogen: false,
            showBeschreibungen: false,
            bildungsbereiche: jsondata.Bildungsbereiche,
            change: false,
            username: "",
            kinder: ["Max", "Moritz", "Julia", "Eva"],
            kind: "",
            authenticated: false
        }
    },
    async mounted() {
        if(this.$session.get("accessToken")){
            this.accessToken = this.$session.get("accessToken")
        }
        const auth = await this.isAuthenticated()
        this.authenticated = auth
        if(auth === false){
            this.$router.push("/login")
        }
        this.username = this.$session.get("username")

    },
    methods: {
        setTokenToSessionStorage(token){
            this.$session.set("accessToken", token.accessToken)
        },
        async isAuthenticated(){
            let auth = false
            try {
                await fetch("https://beobachtungsboegen.herokuapp.com/auth", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.$session.get('accessToken')}`
                    }
                })
                .then(res => res.json())
                .then(data => auth = data.auth)
            } catch (e) {
                console.log(e)
            }
            return auth
        },
        async logout() {
            console.log("logging out", this.$session.get('username'))
            await fetch("https://beobachtungsboegen.herokuapp.com/logout", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.$session.get('username')
                })
            })
            this.$session.remove("username")
            this.$session.remove("accessToken")
            this.$session.remove("refreshToken")
            this.$router.push("beobachtungsboegen/login")
        },
        async saveChanges(){
            console.log("save!!")
        },
        showKind(event){
            this.showBeobachtungsbogen = true
            this.kind = event
        }
    },
}
</script>

<style>

</style>

<style scoped>

</style>