<template>
    <div class="bearbeiten">
        <Beobachtungsbogen :observations="kinderDaten.observations" mode="edit" />
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
            kinderDaten: {}
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