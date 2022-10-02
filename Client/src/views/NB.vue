<template>
    <div>
        <h2>Notebook Template</h2>
        <Test />
        <AddNotebook />
    </div>
</template>
<script>
import Test from '../views/Test.vue';
import AddNotebook from '../components/AddNotebook.vue';

export default {
    name: 'NB',
    components: {
        Test, AddNotebook
    }

}
</script>