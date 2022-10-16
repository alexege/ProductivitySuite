<template>
    <div style="outline: 1px solid red;">
        {{ comment }}
        <pre>{{ comment.title }}</pre>
    </div>
</template>
<script>
    export default {
        name: 'Comment',
        props: ['comment'],
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