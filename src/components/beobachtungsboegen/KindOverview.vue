<template>
    <div class="kindOverview">
        <div class="head" >
            <h3>{{data.firstName}}</h3>
            <button @click="edit()" >bearbeiten</button>
        </div>
        <Beobachtungsbogen :kind="data.firstName" :kindID="data._id" :observations="data.observations" mode="overview" :change="change" />
    </div>
</template>

<script>
import Beobachtungsbogen from "./Beobachtungsbogen.vue"

export default {
    name: "KindOverview",
    props: {
        data: Object,

    },
    components: {
        Beobachtungsbogen
    },
    data() {
        return {
            change: false
        }
    },
    methods: {
        edit() {
            this.$router.push(`/beobachtungsboegen/${this.data._id}`)
        }
    }
}
</script>

<style>

</style>

<style scoped>
.kindOverview {
    border-bottom: 1px solid black;
    display: grid;
    grid-template-columns: 100px 1fr;
}
</style>