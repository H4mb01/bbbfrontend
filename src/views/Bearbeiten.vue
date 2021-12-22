<template>
    <div class="bearbeiten" :key="rerenderer" >
        <h3>{{kinderDaten.firstName}}</h3>
        <div class="grid main">
            <div class="settings">
                <input type="checkbox" name="beschreibungen" id="beschreibungen" v-model="beschreibungen">
                <label for="beschreibungen">
                    <span v-if="beschreibungen">Beschreibungen ausblenden</span>
                    <span v-else>Beschreibungen einblenden</span>
                </label>
                <br><br><br><button @click="save">speichern</button>
            </div>
            <Beobachtungsbogen :observations="kinderDaten.observations" :mode="mode" :showBeschreibungen="beschreibungen" v-on:change-obs="changeObs($event)" />
        </div>
    </div>
</template>

<script>
import Beobachtungsbogen from "../components/beobachtungsboegen/Beobachtungsbogen.vue"

import shared from "../auth.js"

export default {
    name: "Bearbeiten",
    components: {
        Beobachtungsbogen
    },
    data(){
        return {
            kinderDaten: {
                observations: {
                    1: 0
                }
            },
            mode: "edit",
            beschreibungen: false,
            rerenderer: 0,
            auth: false,
        }
    },
    methods: {
        async getChildData(){
            await fetch(`https://beobachtungsboegen.herokuapp.com/child/${this.$route.params.kindID}`, {
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
            this.rerenderer +=1
        },
        async save() {
            await this.authenticate()
            const result = await fetch(`https://beobachtungsboegen.herokuapp.com/observation/${this.$route.params.kindID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.$session.get('accessToken')}`
                },
                body: JSON.stringify({
                    observations: this.kinderDaten.observations
                })
            })
            if (result.status === 200){
                console.log("save successful")
            } else {
                console.log("save not successful")
            }
        },
        changeObs(event){
            let newObs = {
                observations: {
                    1: 0
                }
            }
            let array = Object.values(event)
            array.forEach(element => {
                element.forEach( e => {
                    newObs[e.id] = e.erfuellt
                })
            })
            console.log("array: ", array)
            console.log("newObs:", newObs)
            this.kinderDaten.observations = newObs
        }
    },
    async created() {
        this.authenticate = shared.authenticate
    },
    async mounted(){
        this.auth = await this.authenticate()
        await this.getChildData()
    },
    

}
</script>

<style>

</style>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 200px 1fr;
}
</style>