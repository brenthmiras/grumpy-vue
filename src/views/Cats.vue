<template>
  <div id="cats" class="container">

    <h1>Cat Browser</h1>

    <BreedSelect />

    <CatList />
  </div>
</template>

<script>
import BreedSelect from '../components/BreedSelect.vue';
import CatList from '../components/CatList.vue';

export default {
  components: {
    BreedSelect,
    CatList,
  },
  setup() {},
}
</script>

<style scoped>
 #cats {
  padding: 20px 0;
 }
</style>
