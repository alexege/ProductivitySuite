<template>
    <div>
        <pre>{{ category.title }}</pre>
        <div v-for="note in notes" :key="note">
            <Note :note="note"/>
        </div>
    </div>
</template>
<script>
    import Note from '../components/Note.vue'
    export default {
        name: 'Category',
        components: { Note },
        props: ['notes', 'category'],
        data () {
            return {
                
            }
        }
    }
</script>
<style scoped>
   
</style>