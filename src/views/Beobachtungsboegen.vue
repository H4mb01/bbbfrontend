<template>
    <div class="beobachtungsboegen">
        <h1 v-if="authenticated" > {{ username }}s Beobachtungsbögen</h1>
        <div v-if="authenticated" class="content">
            <h2 class="begruessung">Hallo {{username}}, das hier sind deine Kinder:
                <button class="neu" @click="createNewChild" >+ Neu</button>
            </h2>
            <KindOverview v-for="kind in kinderDaten" :key="`${username}s-kind-${kind._id}`" :data="kind" />


            <!--
            <Kinder :kinder="kinder" v-on:click-kind="showKind($event)" />
            <button @click="showBeobachtungsbogen = showBeobachtungsbogen ? false : true" >show</button>
            <button @click="showBeschreibungen = showBeschreibungen ? false : true" >Beschreibungen ein-/ausblenden</button>
            <button @click="logout()" >logout</button>
            <button @click="change = change ? false : true">change</button>
            <Beobachtungsbogen v-if="showBeobachtungsbogen" :kind="kind" :bildungsbereiche="bildungsbereiche" :showBeschreibungen="showBeschreibungen"
            :change="change" />
            <button @click="saveChanges()">save</button>

            -->
        </div>
    </div>
</template>

<script>
import KindOverview from "../components/beobachtungsboegen/KindOverview.vue"

import jsondata from "../json/bildungsbereiche.json"

import shared from "../auth.js"

export default {
    name: "beobachtungsboegen",
    components: {
        KindOverview
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
            kinder: ["Max", "Maria", "Finley", "Hacer"],
            authenticated: false,
            kinderDaten: {}
        }
    },
    created(){
        this.authenticate = shared.authenticate
    },
    async mounted() {
        this.authenticated = await this.authenticate()
        this.username = this.$session.get("username")
        await this.getAllChilds()

    },
    methods: {
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
            this.$router.push("/")
        },
        async saveChanges(){
            console.log("save!!")
        },
        async getAllChilds(){
            await fetch("https://beobachtungsboegen.herokuapp.com/children", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.$session.get('accessToken')}`
                }
                
            })
            .then(res => res.json())
            .then(data => {
                this.kinderDaten = data
            })
            console.log("kinderDaten:",this.kinderDaten)
        },
        async createNewChild() {
            this.$router.push("/neu")
        }
    },
}
</script>

<style>

</style>

<style scoped>

</style>