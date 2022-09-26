<template>
    <div style="outline: 1px solid blue;">
        <h3 v-if="subject && subject.title">{{ subject.title }}</h3>
        
        <div v-for="category in categories" :key="category._id">
            <Category :notes="category.notes" :category="category"/>
        </div>

        <!-- Add Category -->
        <div class="add-category-container">
            <input type="text" v-model="newCategory.title" placeholder="Add Category" @keyup.enter="addCategory(subject._id)" />
            <button @click="addCategory(subject._id)">
                <font-awesome-icon icon="check" />
            </button>
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
                newCategory: {
                    title: null
                }
            }
        },

        methods: {
            addCategory(subjectId) {
                return this.$store
                    .dispatch("category/addCategory", {
                    category: this.newCategory,
                    subjectId,
                })
                    .then(() => {(this.newCategory.title = "")})
                    .catch((err) => {
                    console.log("Error adding category: ", err);
                });
            },
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