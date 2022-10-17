<template>
    <div @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div v-if="category && category.title" class="title">
            <span class="indent-icon"></span>{{ category.title }}
        
        <div class="category-actions" v-show="isHovering">
            <button v-if="category.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleCategoryPrivacy(category._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleCategoryPrivacy(category._id)"/>
            </button>

            <button @click="showCategory = category._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="deleteCategory(category._id)">
                <font-awesome-icon icon="trash" />
            </button>
        </div>
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
        
        <div v-for="category in categories" :key="category._id">
            <SidenavCategory :notes="category.notes" :category="category"/>
        </div>

    </div>
</template>
<script>
    import SidenavCategory from '../Sidenav/SidenavCategory.vue'
    export default {
        name: 'SidenavCategory',
        components: { SidenavCategory },
        props: ['categories', 'category'],
        data () {
            return {
                // newCategory: {
                //     title: null
                // },
                newCategory: {
                    title: this.category.title
                },
                showCategory: null,
                isHovering: false
            }
        },

        methods: {
            addCategory(categoryId) {
                return this.$store
                    .dispatch("category/addCategory", {
                    category: this.newCategory,
                    categoryId,
                })
                    .then(() => {(this.newCategory.title = "")})
                    .catch((err) => {
                    console.log("Error adding category: ", err);
                });
            },

            deleteCategory(id) {
            return this.$store
                .dispatch("category/deleteCategory", id)
                .then(() => {
                // this.getAllCategorys();
            })
                .catch((err) => {
                console.log(err);
            });
            },

            toggleCategoryPrivacy(id) {
            return this.$store
                .dispatch("category/toggleCategoryPrivacy", id)
                .then(() => {
            })
                .catch((err) => {
                console.log(err);
            });
            },

            updateCategory(category) {
            this.showCategory = null;
            let updateCategory = {
                title: this.newCategory.title,
                description: category.description,
                isPublic: category.isPublic,
            };
            //Toggle editMode if using a modal
            return this.$store
                .dispatch("category/updateCategory", {
                id: category._id,
                category: updateCategory,
            })
                .then(() => {
                //Do nothing
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
        padding-left: 40px;
    }
    .category-actions {
        display: flex;
        justify-content: end;
        position: absolute;
        top: 0;
        right: 0;
    }

    .update-category input{
        display: flex;
        flex: 2;
    }

    .update-category {
        display: flex;
        flex: 1;
    }

    .add-comment-container {
        display: flex;
    }

    .add-comment-container input {
        width: 100%;
    }

    .indent-icon {
        /* outline: 1px solid red; */
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