<template>
    <div class="neu">
        <button @click="logout()">logout</button>
    </div>
</template>

<script>
import shared from "../auth.js"

export default {
    name: "Neu",
    created() {
        this.authenticate = shared.authenticate
        this.logout = shared.logout
    },
    mounted() {
        this.authenticate()
    },
    
}
</script>

<style>

</style>

<style scoped>

</style>