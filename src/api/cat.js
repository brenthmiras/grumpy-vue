import request from '../request';

const getBreeds = () => {
  
  return request.get('/breeds');
};

const getCats = ({page, limit, breedId}) => {

  const params = {
    page: page - 1,
    limit,
    breed_id: breedId,
    order: 'DESC',
  };

  return request.get('/images/search', {
    params,
  });
};

const getCatDetail = ({ catId }) => {

  return request.get(`/images/${catId}`);
}

export default {
  getBreeds,
  getCats,
  getCatDetail,
};
