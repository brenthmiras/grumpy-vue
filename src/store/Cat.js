import CatApi from '../api/cat';

const initialState = {
  breedId: null,
  breedList: [],

  catList: [],
  page: 1,
  limit: 10,
  isLoading: false,
  hasMore: true,

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
  async getCats({ commit, dispatch }, payload) {

    const { page = 1, limit = 10, breedId } = payload;

    // When selecting empty breed, empty cats
    if (!breedId) {
      return dispatch('clearCats');
    }

    try {

      dispatch('setLoading', true);

      // Fire http request to cats server
      const res = await CatApi.getCats({ page, limit, breedId });
      
      const totalCats = res.headers['pagination-count'];

      const hasMore = (page * limit) < Number(totalCats);

      dispatch('setLoading', false);
      
      // Save fetched breeds to store
      commit('SET_CATS', {
        cats: res.data,
        page,
        limit,
        hasMore,
      });
    }
    catch (err) {
      // TODO: Show toast
      console.log(err);

      dispatch('setLoading', false);
    }
  },
  async moreCats({ commit, state, dispatch }) {

    const { page, limit, breedId } = state;

    try {

      dispatch('setLoading', true);

      const nextPage = page + 1;

      // Fire http request to cats server
      const res = await CatApi.getCats({ page: nextPage, limit, breedId });

      const totalCats = res.headers['pagination-count'];

      const hasMore = (nextPage * limit) < Number(totalCats);
      
      dispatch('setLoading', false);

      // Save fetched breeds to store
      commit('APPEND_CATS', {
        cats: res.data,
        page: nextPage,
        limit,
        hasMore,
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
  clearCats({commit}) {
    commit('SET_CATS', {
      cats: [],
      page: 1,
      limit: 10,
      hasMore: true,
    });
  },
  async getCatDetail({ commit, dispatch }, payload) {

    const { catId } = payload;

    try {

      dispatch('setLoading', true);

      // Fire http request to cats server
      const res = await CatApi.getCatDetail({ catId });

      dispatch('setLoading', false);
      
      // Save fetched breeds to store
      commit('SET_CURRENT_CAT', {
        cat: res.data,
      });
    }
    catch (err) {
      // TODO: Show toast
      console.log(err);

      dispatch('setLoading', false);
    }
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

    const { cats, page, limit, hasMore } = payload;

    state.catList = cats;
    state.page = page;
    state.limit = limit;
    state.hasMore = hasMore;
  },
  APPEND_CATS(state, payload) {

    const { cats, page, limit, hasMore } = payload;

    state.catList = state.catList.concat(cats);
    state.page = page;
    state.limit = limit;
    state.hasMore = hasMore;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_CURRENT_CAT(state, payload) {
    state.currentCat = payload.cat;
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
  currentCat(state) {

    if (!state.currentCat.id) return {};

    const data = state.currentCat.breeds[0];
    
    return {
      ...data,
      url: state.currentCat.url,
    };
  },
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
};
