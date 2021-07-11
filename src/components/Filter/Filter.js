import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../redux/phonebook-actions';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <h2 className={styles.title}>Contacts</h2>
      <label className={styles.label}>
        Find contacts by name
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: state.phonebook.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.changeFilter(e.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
