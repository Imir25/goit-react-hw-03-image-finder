export default async function getImages(inputValue, page = 1) {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '39801546-c4bb34864e6abc7825d1e4868';

    return await fetch(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => res.json());
}