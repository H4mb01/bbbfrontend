<template>
    <div class="kinder">
        <div v-for="kind in kinder" :key="kind" @click="clickKind(kind)" class="kind"> {{ kind }} </div>
    </div>
</template>

<script>
export default {
    name: "Kinder",
    props: {
        kinder: Array
    },
    data(){
        return {
        }
    },
    methods: {
        clickKind(kind) {
            this.$emit("click-kind", kind)
        }
    }
}
</script>

<style>

</style>

<style scoped>
.kind {
    cursor: pointer;
}
.kind:hover {
    padding-left: 10px;
}
</style>