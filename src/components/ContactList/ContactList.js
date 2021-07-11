import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import actions from '../../redux/phonebook-actions';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <TransitionGroup component="ul" className={styles.list}>
    {contacts.map(({ id, name, number }) => (
      <CSSTransition key={id} timeout={250} classNames={styles}>
        <li className={styles.item}>
          <p className={styles.name}>{name}:</p>
          <p>{number}</p>
          <button
            type="button"
            className={styles.button}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.defaultProps = {
  name: '',
  number: '',
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
      isContactExists: PropTypes.bool,
    }),
  ).isRequired,
};

const getFilteredContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = state => {
  const { contacts, filter } = state.phonebook;
  const filteredContacts = getFilteredContacts(contacts, filter);

  return {
    contacts: filteredContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(actions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
