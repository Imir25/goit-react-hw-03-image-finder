import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: false,
      page: 1,
    };

    this.apiKey = '39801546-c4bb34864e6abc7825d1e4868'; 
  }

  componentDidMount() {
   
    this.loadMoreImages();
  }

  loadMoreImages = () => {
    const { page, images } = this.state;
    this.setState({ loading: true });

    
    axios
      .get(`https://pixabay.com/api/?key=${this.apiKey}&q=nature&per_page=5&page=${page}`)
      .then((response) => {
        const newImages = response.data.hits;

        
        this.setState((prevState) => ({
          images: [...prevState.images, ...newImages],
          loading: false,
          page: prevState.page + 1,
        }));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { images, loading } = this.state;

    return (
      <div className="App">
        <h1>Image Gallery App</h1>
        <ImageGallery images={images} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={this.loadMoreImages} />}
      </div>
    );
  }
}

export default App;