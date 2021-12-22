<template>
    <div class="bearbeiten">
        <input type="checkbox" name="beschreibungen" id="beschreibungen" v-model="beschreibungen">
        <label for="beschreibungen">
            <span v-if="beschreibungen">Beschreibungen ausblenden</span>
            <span v-else>Beschreibungen einblenden</span>
        </label>
        <Beobachtungsbogen :observations="kinderDaten.observations" :mode="mode" :showBeschreibungen="beschreibungen" />
    </div>
</template>

<script>
import Beobachtungsbogen from "../components/beobachtungsboegen/Beobachtungsbogen.vue"
export default {
    name: "Bearbeiten",
    components: {
        Beobachtungsbogen
    },
    data(){
        return {
            kinderDaten: {},
            mode: "edit",
            beschreibungen: false
        }
    },
    methods: {
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
                this.kinderDaten = data.find(e=> { return e._id === this.$route.params.kindID })
            })
            console.log("kinderDaten:",this.kinderDaten)
        }
    },
    async mounted(){
        await this.getAllChilds()
    }
}
</script>

<style>

</style>

<style scoped>

</style>