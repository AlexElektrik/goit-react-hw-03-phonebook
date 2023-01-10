import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.styled';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    if (localStorageContacts) {
      return JSON.parse(localStorageContacts);
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
    console.log(contacts);
  };

  const deleteContact = contactID => {
    setContacts(prevState =>
      prevState.filter(contact => contactID !== contact.id)
    );
  };

  const handelChange = event => {
    setFilter(event.target.value);
  };

  const contactFilter = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <h3>Find contact by name</h3>
      <ContactFilter filter={filter} onChange={handelChange} />
      <ContactList contacts={contactFilter} onDelete={deleteContact} />
      <GlobalStyle />
    </Container>
  );
};

App.propTypes = {
  state: PropTypes.shape({
    filter: PropTypes.string,
    contacts: PropTypes.array.isRequired,
  }),
};
