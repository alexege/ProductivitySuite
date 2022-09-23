<template>
    <div>
        {{ subject.title }}
        <div v-for="category in categories" :key="category">
            <Category :notes="category.notes" :category="category"/>
        </div>
    </div>
</template>
<script>
    import Category from '../components/Category.vue'
    export default {
        name: 'Subject',
        components: { Category },
        props: ['categories', 'subject'],
        data () {
            return {
                
            }
        }
    }
</script>
<style scoped>
    div {
        padding: .25em;
    }
</style>