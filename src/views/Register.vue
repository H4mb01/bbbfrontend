<template>
    <div class="bbRegister">
        <Register />
    </div>
</template>

<script>
import Register from "../components/beobachtungsboegen/Register.vue"
export default {
    name: "BBRegister",
    components: {
        Register
    }
}
</script>

<style>

</style>

<style scoped>
.bbRegister {
        height: calc(100vh - 50px);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
}
</style>