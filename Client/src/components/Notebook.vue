<template>
    <div style="outline: 1px solid purple;">
        <h2 v-if="notebook && notebook.title">{{ notebook.title }}</h2>
        
        <div v-for="subject in subjects" :key="subject._id">
            <Subject :categories="subject.categories" :subject="subject"/>
        </div>

        <!-- Add Subject -->
        <div class="add-comment-container">
            <input type="text" v-model="newSubject.title" placeholder="Add Subject" @keyup.enter="addSubject(notebook._id)" />
            <button @click="addSubject(notebook._id)">
                <font-awesome-icon icon="check" />
            </button>
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
                newSubject: {
                    title: null
                }
            }
        },

        methods: {
            addSubject(notebookId) {
                return this.$store
                    .dispatch("subject/addSubject", {
                    subject: this.newSubject,
                    notebookId,
                })
                    .then(() => {(this.newSubject.title = "")})
                    .catch((err) => {
                    console.log("Error adding subject: ", err);
                });
            }
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