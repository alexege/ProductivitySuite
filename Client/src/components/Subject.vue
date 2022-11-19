<template>
    <div class="subject" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div class="subject-container">
            <div class="subject-body" v-if="!showSubject">
                {{ subject.title }}
            </div>
        
            <div class="subject-actions" v-if="!showSubject" v-show="isHovering">
            <button v-if="subject.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleSubjectPrivacy(subject._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleSubjectPrivacy(subject._id)"/>
            </button>

            <button @click="showSubject = subject._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="deleteSubject(subject._id)">
                <font-awesome-icon icon="trash" />
            </button>
        </div>

        <div class="update-subject" v-show="showSubject == subject._id">
          <input type="text" v-model="newSubject.title" />
          <button @click="updateSubject(subject)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showSubject = null"/>
          </button>
        </div>

    </div>

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
                newSubject: {
                    title: this.subject.title
                },
                showSubject: null,
                isHovering: false
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('category', ["addCategory"]),
            ...mapActions('subject', ["deleteSubject"]),
            onSubmit() {
                this.addCategory({
                    category: this.newCategory,
                    subjectId: this.subject._id
                });

                this.newCategory.title = '';
                setTimeout(() => this.fetchNotebooks(), 10);
            },

            onDelete() {
                this.deleteSubject(this.subject._id);

                setTimeout(() => this.fetchNotebooks(), 10);
            },

            toggleSubjectPrivacy(id) {
                console.log("toggling subject privacy");
                return this.$store
                .dispatch("subject/toggleSubjectPrivacy", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                })
            },

            updateSubject(subject) {
                console.log("Updating subject: ", subject);
                this.showSubject = null;

                let updateSubject = {
                    title: this.newSubject.title,
                    isPublic: subject.isPublic,
                };
                //Toggle editMode if using a modal
                return this.$store
                    .dispatch("subject/updateSubject", {
                    id: subject._id,
                    subject: updateSubject,
                })
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                });
            }
        }
    }
</script>
<style scoped>
    /* div {
        padding: .25em;
    }

    .add-category-container {
        display: flex;
    }

    .add-category-container input {
        width: 100%;
    } */

    .add-category-container {
    display: flex;
   }

   .add-category-container input, textarea {
    width: 100%;
   }

   .subject {
        display: flex;
        flex-direction: column;
        box-shadow: 2px 2px 5px black;
        margin: 10px;
    }

    .subject-body {
        flex: 2;
        min-height: 40px;
    }

    .subject-container {
       display: flex;
    }

    .update-subject {
        display: flex;
        flex: 1;
    }

    .update-subject input {
        flex: 1;
    }
</style>