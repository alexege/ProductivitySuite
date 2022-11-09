<template>
    <div @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div v-if="subject && subject.title" class="title">
            <span class="indent-icon"></span>{{ subject.title }}
        
        <div class="subject-actions" v-show="isHovering">
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
        
        <div v-for="category in categories" :key="category._id">
            <SidenavCategory :notes="category.notes" :category="category"/>
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
    import { mapActions } from 'vuex';
    import SidenavCategory from '../Sidenav/SidenavCategory.vue'
    export default {
        name: 'SidenavSubject',
        components: { SidenavCategory },
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

            addCategory(subjectId) {
                return this.$store
                    .dispatch("category/addCategory", {
                    category: this.newCategory,
                    subjectId,
                })
                    .then(() => {
                        this.newCategory.title = "";
                        setTimeout(() => this.fetchNotebooks(), 10);
                    })
                    .catch((err) => {
                    console.log("Error adding category: ", err);
                });
            },

            deleteSubject(id) {
            return this.$store
                .dispatch("subject/deleteSubject", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
            })
                .catch((err) => {
                console.log(err);
            });
            },

            toggleSubjectPrivacy(id) {
            return this.$store
                .dispatch("subject/toggleSubjectPrivacy", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
            })
                .catch((err) => {
                console.log(err);
            });
            },

            updateSubject(subject) {
            this.showSubject = null;
            let updateSubject = {
                title: this.newSubject.title,
                description: subject.description,
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
            },
        }
    }
</script>
<style scoped>
    button {
        font-size: 0.8em;
    }
    .title {
        position: relative;
        margin-left: 20px;
    }
    .subject-actions {
        display: flex;
        justify-content: end;
        position: absolute;
        top: 0;
        right: 0;
    }

    .update-subject input{
        display: flex;
        flex: 2;
    }

    .update-subject {
        display: flex;
        flex: 1;
    }

    .add-category-container {
        display: flex;
    }

    .add-category-container input {
        width: 100%;
    }

    .indent-icon {
        margin: 0;
        margin-bottom: 1em;
        padding-left: 1.5em;
        position: relative;
    }

    .indent-icon::after {
      content: '';
      height: .3em;
      width: .3em;
      background: black;
      display: block;
      position: absolute;
      transform: rotate(45deg);
      top: .5em;
      left: .5em;
    }
</style>