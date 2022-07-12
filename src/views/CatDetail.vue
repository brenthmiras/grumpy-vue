<template>
  <div id="cat-detail" class="container">
    <h3 v-if="isLoading">Loading...</h3>
    <b-card title="" header-tag="header" footer-tag="footer" no-body v-else>
      <template #header>
        <b-button :to="`/cats`" variant="primary">
          Back
        </b-button>
      </template>

      <img :src="currentCat.url" alt="" class="card-img">

      <div class="card-body">
        <h4>{{currentCat.name}}</h4>
        <h5>Origin: {{currentCat.origin}}</h5>
        <h6>{{currentCat.temperament}}</h6>
        <p>{{currentCat.description}}</p>
      </div>
    </b-card>
  </div>
</template>

<script>
import { watch, toRefs } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useActions, useState, useGetters } = createNamespacedHelpers('Cat');

export default {
  props: {
    catId: String,
  },
  setup(props) {

    const catId = toRefs(props).catId;

    const { getCatDetail } = useActions(['getCatDetail']);
    const { isLoading } = useState(['isLoading', 'currentCat']);
    const { currentCat } = useGetters(['currentCat']);

    // Everytime catId changes, fetch cat details
    watch(catId, value => {
      getCatDetail({ catId: value });
    }, {
      immediate: true,
    });

    return {
      isLoading,
      currentCat,
    };
  },
}
</script>

<style scoped>
#cat-detail {
  padding: 20px 0;
}
</style>
