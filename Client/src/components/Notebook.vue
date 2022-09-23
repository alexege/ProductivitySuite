<template>
    <div>
        <h2>{{ notebook.title }}</h2>
        <div v-for="subject in subjects" :key="subject">
            <Subject :categories="subject.categories" :subject="subject"/>
        </div>
    </div>
</template>
<script>
    import Subject from "../components/Subject.vue";
    export default {
        name: 'Notebook',
        components: {Subject},
        props: ['subjects', 'notebook'],
        data () {
            return {
                
            }
        }
    }
</script>
<style scoped>

    h2 {
        text-align: center;
        padding: .25em;
    }
</style>