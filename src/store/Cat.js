import CatApi from '../api/cat';

const initialState = {
  breedList: [],
  catList: {},
  currentCat: {},
};

const state = () => (initialState);

const actions = {
  async getBreeds({ commit }) {
    try {

      // Fire http request to cats server
      const res = await CatApi.getBreeds();

      // Save fetched breeds to store
      commit('SET_BREEDS', {
        breeds: res.data,
      });
    }
    catch (err) {
      // TODO: Show toast
      console.log(err);
    }
  }
};

const mutations = {
  SET_BREEDS(state, payload) {
    // mutate state
    state.breedList = payload.breeds;
  },
};

const getters = {
  /* 
    Format breeds to be compatible with BootstrapVue's select component
  */
  breedOptions(state) {
    return state.breedList.map(breed => {
      return {
        value: breed.id,
        text: breed.name,
      };
    });
  }
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
};
