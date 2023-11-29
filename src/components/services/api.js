import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  key: '39801546-c4bb34864e6abc7825d1e4868',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchImages = async (searchQuery, page) => {
  const images = await axios.get(`?q=${searchQuery}&page=${page}&${searchParams}`);
  
  return images.data;
};