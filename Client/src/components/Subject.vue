<template>
    <div style="outline: 1px solid blue;">
        <h3 v-if="subject && subject.title">{{ subject.title }}</h3>

        <div v-for="category in categories" :key="category._id">
            <Category :notes="category.notes" :category="category"/>
        </div>

        <!-- Add Category -->
        <div class="add-category-container">
            <input type="text" v-model="newCategory.title" placeholder="Add Category" @keyup.enter="onSubmit" />
            <button @click.prevent="onSubmit">
                <font-awesome-icon icon="check" />
            </button>
        </div>

    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import Category from '../components/Category.vue'
    export default {
        name: 'Subject',
        components: { Category },
        props: ['categories', 'subject'],
        data () {
            return {
                newCategory: {
                    title: null
                },

                // subjectId: this.subject._id
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('category', ["addCategory"]),
            onSubmit() {
                this.addCategory({
                    category: this.newCategory,
                    subjectId: this.subject._id
                });

                this.newCategory.title = '';
                console.log("Submitting category");
                setTimeout(() => this.fetchNotebooks(), 10);
            }
        }
    }
</script>
<style scoped>
    div {
        padding: .25em;
    }

    .add-category-container {
        display: flex;
    }

    .add-category-container input {
        width: 100%;
    }
</style>