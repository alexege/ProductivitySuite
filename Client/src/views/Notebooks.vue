<template>
    <div>
        <div v-for="notebook in allNotebooks" :key="notebook._id">
            {{ notebook.title }}
        </div>
|   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Notebooks',
    data() {
        return {

        }
    },
    methods: {
        ...mapActions('notebook', ["fetchNotebooks"])
    },

    computed: mapGetters('notebook', ["allNotebooks"]),

    created() {
        this.fetchNotebooks();
    }
}
</script>