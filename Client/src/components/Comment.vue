<template>
    <div>
        {{ commment }}
    </div>
</template>
<script>
    export default {
        name: 'Comment',
        components: {  },
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