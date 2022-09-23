<template>
    <div>
        {{ note.title }}
        <div v-for="comment in comments" :key="comment">
            <Category :comment="comment"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Note',
        components: {  },
        props: ['comments','note'],
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