<template>
    <div class="bbLogin">
        <Login v-on:token="token($event)" />
    </div>
</template>

<script>
import Login from "../components/beobachtungsboegen/Login.vue"

export default {
    name: "BBLogin",
    components: {
        Login
    },
    methods: {
        token(event){
            this.$emit("token", event)
        }
    }
}
</script>

<style>

</style>

<style scoped>
    .bbLogin {
        height: calc(100vh - var(--nav-height));
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>