import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import getImages from '../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    loadMoreBtn: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    status: 'idle',
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue || prevProps.page !== this.props.page) {
      this.fetchLoad();
    }
  }

  fetchLoad = () => {
    const { inputValue, page } = this.props;

    getImages(inputValue, page)
      .then(response => {
        this.setState(prevState => ({
          images: page === 1 ? response.hits : [...prevState.images, ...response.hits],
          status: 'resolve',
          loadMore: page < Math.ceil(response.totalHits / 12),
        }));
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  render() {
    const { images, status, loadMore } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolve') {
      return (
        <>
          <ul className={s.gallery}>
            {images.map(({ id, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={largeImageURL}
                tags={tags}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          {loadMore && (
            <Button onClick={this.props.loadMoreBtn} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;