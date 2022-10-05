<template>
    <div>
        <form @submit.prevent="onSubmit" class="add-subject">
            <input type="text" v-model="newSubject.title" placeholder="Add Subject">
            <!-- <input type="submit" value="submit"> -->
            <button><font-awesome-icon icon="check" @click="onSubmit" /></button>
        </form>

    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'AddSubject',
    props: ['notebook'],
    data() {
        return {
            newSubject: {
                title: null
            }
        }
    },
    methods:{
        ...mapActions('subject', ["addSubject"]),
        ...mapActions('notebook', ["fetchNotebooks"]),
        onSubmit(e) {
            e.preventDefault();
            this.addSubject({
                notebookId: this.notebook._id,
                title: this.newSubject.title
            });
            this.newSubject.title = '';
            setTimeout(() => this.fetchNotebooks(), 100);
        }
    }
}
</script>
<style scoped>
    .add-subject {
        display: flex;
    }

    .add-subject input {
        flex: 2;
    }
</style>