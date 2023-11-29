import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { ToastContainer } from 'react-toastify';
import Loader from './Loader/Loader';
import { toast } from 'react-toastify';
import { animateScroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';



const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    per_page: 12,
    loadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

  getImages = async (query, page) => {
    this.setState({ status: Status.PENDING });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(query, page);
      if (!hits.length) {
        this.setState({ loadMore: false });
        toast.info('Nothing was found for your request. Try something else');
      } else {
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
          status: Status.RESOLVED,
        }));
      }
    } catch (error) {
      this.setState({ error: error.message, status: Status.REJECTED });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  hangleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  onloadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    this.scrollToBottomButton();
  };

  scrollToBottomButton = () => {
    animateScroll.scrollToBottom({
      duration: 2000,
      delay: 10,
      smooth: 'linear',
    });
  };

  render() {
    const { images, loadMore, status } = this.state;

    return (
      <>
        <Searchbar onSubmitImage={this.hangleFormSubmit} />
        {status === Status.IDLE && null}

        {status === Status.PENDING && <Loader />}

        {status === Status.REJECTED && (
          <p>Something happened. Please refresh the page and try again.</p>
        )}

        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={images} />
            {loadMore && <Button onloadMore={this.onloadMore} />}
          </>
        )}
       <ToastContainer autoClose={3000} />
      </>
    );
  }
};

export { App };