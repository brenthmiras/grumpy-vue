import CatApi from '../api/cat';

const initialState = {
  breedId: null,
  breedList: [],

  catList: [],
  page: 1,
  limit: 10,
  isLoading: false,

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
  },
  selectBreed({ commit }, payload) {

    const { breedId } = payload;

    commit('SET_BREED_ID', {
      breedId,
    });
  },
  async getCats({ commit }, payload) {

    const { page = 1, limit = 10, breedId } = payload;

    // When selecting empty breed, empty cats
    if (!breedId) {
      return commit('SET_CATS', {
        cats: [],
      });
    }

    try {

      // Fire http request to cats server
      const res = await CatApi.getCats({ page, limit, breedId });

      // Save fetched breeds to store
      commit('SET_CATS', {
        cats: res.data,
      });
    }
    catch (err) {
      // TODO: Show toast
      console.log(err);
    }
  },
  async moreCats({ commit, state, dispatch }) {

    const { page, limit, breedId } = state;

    try {

      dispatch('setLoading', true);

      // Fire http request to cats server
      const res = await CatApi.getCats({ page: page + 1, limit, breedId });

      dispatch('setLoading', false);

      // Save fetched breeds to store
      commit('APPEND_CATS', {
        cats: res.data,
      });
    }
    catch (err) {
      // TODO: Show toast
      console.log(err);
      dispatch('setLoading', false);
    }
  },
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload);
  },
};

const mutations = {
  SET_BREEDS(state, payload) {
    // mutate state
    state.breedList = payload.breeds;
  },
  SET_BREED_ID(state, payload) {
    state.breedId = payload.breedId;
  },
  SET_CATS(state, payload) {
    state.catList = payload.cats;
  },
  APPEND_CATS(state, payload) {
    state.catList = state.catList.concat(payload.cats);
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
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
  },
  catList(state) {
    return state.catList;
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
};
