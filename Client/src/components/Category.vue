<template>
    <div style="outline: 1px solid lime;">
        <div class="category-container">
            <div class="category-body" v-if="!showCategory">
                {{ category.title }}
            </div>

            <div class="category-actions" v-if="!showCategory">
            <button v-if="category.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleCategoryPrivacy(category._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleCategoryPrivacy(category._id)"/>
            </button>

            <button @click="showCategory = category._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="onDelete()">
                <font-awesome-icon icon="trash" />
            </button>
        </div>

        <div class="update-category" v-show="showCategory == category._id">
          <input type="text" v-model="newCategory.title" />
          <button @click="updateCategory(category)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showCategory = null"/>
          </button>
        </div>

    </div>

        <div v-for="note in notes" :key="note._id">
            <Note :comments="note.comments" :note="note"/>
        </div>

        <!-- Add Note -->
        <div class="add-note-container">
            <input type="text" v-model="newNote.title" placeholder="Add Note" @keyup.enter="onSubmit" />
            <button @click.prevent="onSubmit">
                <font-awesome-icon icon="check" />
            </button>
        </div>

    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import Note from '../components/Note.vue'
    export default {
        name: 'Category',
        components: { Note },
        props: ['notes', 'category'],
        data () {
            return {
                newNote: {
                    title: null
                },
                newCategory: {
                    title: this.category.title
                },
                showCategory: null
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('note', ["addNote"]),
            ...mapActions('category', ["deleteCategory"]),
            onSubmit() {
                this.addNote({
                    note: this.newNote,
                    categoryId: this.category._id
                });

                this.newNote.title = '';

                setTimeout(() => this.fetchNotebooks(), 10);
            },

            onDelete() {
                this.deleteCategory(this.category._id);

                setTimeout(() => this.fetchNotebooks(), 10);
            },
            
            toggleCategoryPrivacy(id) {
                console.log("toggling category privacy");
                return this.$store
                .dispatch("category/toggleCategoryPrivacy", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                })
            },

            updateCategory(category) {
                console.log("Updating category: ", category);
                this.showCategory = null;

                let updateCategory = {
                    title: this.newCategory.title,
                    isPublic: category.isPublic,
                };
                //Toggle editMode if using a modal
                return this.$store
                    .dispatch("category/updateCategory", {
                    id: category._id,
                    category: updateCategory,
                })
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                });
            }
        }

    }
</script>
<style scoped>
   .add-note-container {
    display: flex;
   }

   .add-note-container input, textarea {
    width: 100%;
   }

   .category {
        display: flex;
        flex-direction: column;
    }

    .category-body {
        flex: 2;
    }

    .category-container {
       display: flex;
    }

    .update-category {
        display: flex;
        flex: 1;
    }

    .update-category input {
        flex: 1;
    }
</style>