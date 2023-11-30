import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onloadMore, hasMoreImages }) => {
  return (
    hasMoreImages && (
      <button type="button" className={css.button__load} onClick={onloadMore}>
        Load more
      </button>
    )
  );
};

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
  hasMoreImages: PropTypes.bool.isRequired,
};

export default Button;