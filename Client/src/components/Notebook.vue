<template>
    <div style="outline: 1px solid purple;">
        <h2 v-if="notebook && notebook.title">{{ notebook.title }}</h2>

        <div v-for="subject in notebook.subjects" :key="subject._id">
            <Subject :categories="subject.categories" :subject="subject"/>
        </div>

        <!-- Add Subject -->
        <form @submit.prevent="onSubmit" class="add-notebook-container">
            <input type="text" v-model="newSubject.title" placeholder="Add Subject" @keyup.enter="addSubject" />
            <button>
                <font-awesome-icon icon="check" />
            </button>
        </form>

        <!-- <div class="add-comment-container">
            <input type="text" v-model="newSubject.title" placeholder="Add Subject" @keyup.enter="addSubject(notebook._id)" />
            <button @click="addSubject(notebook._id)">
                <font-awesome-icon icon="check" />
            </button>
        </div> -->

    </div>
</template>
<script>
import { mapActions } from 'vuex';
    import Subject from "../components/Subject.vue";
    export default {
        name: 'Notebook',
        components: {Subject},
        props: ['notebook'],
        data () {
            return {
                newSubject: {
                    title: null
                }
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('subject', ["addSubject"]),
            onSubmit() {
                this.addSubject({
                    notebookId: this.notebook._id,
                    title: this.newSubject.title
                });
                
                this.newSubject.title = '';

                setTimeout(() => this.fetchNotebooks(), 10);
            }
        },

        created() {
            this.fetchNotebooks();
        }
    }
</script>
<style scoped>

    h2 {
        text-align: center;
        padding: .25em;
    }

    .add-comment-container {
        display: flex;
    }

    .add-comment-container input {
        width: 100%;
    }
</style>