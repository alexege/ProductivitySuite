<template>
    <div>
        <h2>Add Notebook</h2>
        <form @submit.prevent="onSubmit" class="add-notebook">
            <input type="text" v-model="newNotebook.title" @keyup.enter="onSubmit" placeholder="Add Notebook">
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
        onSubmit() {
            this.addNotebook({
                title: this.newNotebook.title
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