<template>
    <div>
        <form @submit.prevent="onSubmit" class="add-notebook">
            <input type="text" v-model="newNotebook.title" placeholder="Add Notebook">
            <!-- <input type="submit" value="submit"> -->
            <button><font-awesome-icon icon="check" @click="onSubmit" /></button>
        </form>

    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'AddNotebook',
    data() {
        return {
            newNotebook: {
                title: null
            }
        }
    },
    methods:{
        ...mapActions('notebook', ["addNotebook"]),
        onSubmit(e) {
            e.preventDefault();

            let user = this.$store.state.auth.user;

            this.addNotebook({
                title: this.newNotebook.title,
                user
            });
            this.newNotebook.title = '';
        }
    }
}
</script>
<style scoped>
    .add-notebook {
        display: flex;
    }

    .add-notebook input {
        flex: 2;
    }
</style>