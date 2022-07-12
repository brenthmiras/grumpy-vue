<template>
  <div class="row" style="padding: 10px 0px;">
    <div class="col-md-3 col-sm-6 col-12">
      <div class="form-group">

        <!-- The label -->
        <label class="form-label" for="breed">Breed</label>

        <!-- The BootstrapVue select component -->
        <b-form-select id="breed" v-model="selected" :options="breedOptions">
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null">Select breed</b-form-select-option>
          </template>
        </b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { useRoute } from 'vue-router';

const { useGetters, useActions } = createNamespacedHelpers('Cat');

export default {
  
  setup() {

    const route = useRoute();
    const selected = ref(route.query.breed);

    const { getBreeds, selectBreed } = useActions(['getBreeds', 'selectBreed']);
    const { breedOptions } = useGetters(['breedOptions']);

    // Execute once upon mounting...
    onMounted(() => {

      // Fetch breeds from server
      getBreeds();
    });

    watch(selected, value => {
      selectBreed({ breedId: value});
    }, {
      immediate: true
    });

    return {
      selected,
      breedOptions,
    };
  },
}
</script>
