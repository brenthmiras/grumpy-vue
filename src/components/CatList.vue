<template>
  <div class="row">

    <div class="col-12" style="margin-bottom: 20px;" v-if="!catList.length">
      No cats available
    </div>

    <b-row>
      <b-col md="3" sm="6" v-for="cat in catList" :key="cat.id">
        <b-card title="" :img-src="cat.url" img-alt="Image" img-top tag="article" style="max-width: 20rem;"
          class="mb-2">
          <b-button :to="`/cats/${cat.id}`" variant="primary" class="w-100">
            View details
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="hasMore">
      <b-col md="3" sm="6">
        <b-button variant="success" @click="handleLoadMore()" :disabled="isLoading || !catList.length">
          {{ isLoading ? 'Loading cats...' : 'Load more' }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { watch } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState, useActions } = createNamespacedHelpers('Cat');

export default {
  setup() {

    const { breedId, catList, isLoading, hasMore } = useState(['breedId', 'catList', 'isLoading', 'hasMore']);
    const { getCats, moreCats, clearCats } = useActions(['getCats', 'moreCats', 'clearCats']);

    const handleLoadMore = () => {
      moreCats();
    };

    // Whenever breedId changes, clear current cats
    watch(breedId, () => {
      clearCats();
    });

    // Whenever breedId changes, get cats
    watch(breedId, value => {
      getCats({ breedId: value });
    }, {
      immediate: true,
    });

    return {
      catList,
      handleLoadMore,
      isLoading,
      hasMore,
    };
  },
}
</script>
