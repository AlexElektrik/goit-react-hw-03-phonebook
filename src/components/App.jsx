import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.styled';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
    console.log(this.state.contacts);
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactID !== contact.id),
    }));
  };

  handelChange = event => {
    this.setState({ filter: event.target.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const contactFilter = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} contacts={contacts} />
        <h2>Contacts</h2>
        <h3>Find contact by name</h3>
        <ContactFilter filter={filter} onChange={this.handelChange} />
        <ContactList contacts={contactFilter} onDelete={this.deleteContact} />
        <GlobalStyle />
      </Container>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    filter: PropTypes.string,
    contacts: PropTypes.array.isRequired,
  }),
};
