import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CreateContactForm,
  Label,
  NameLable,
  SubmitButton,
} from './ContactForm.styled';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const saveNewContact = event => {
    event.preventDefault();
    if (
      !contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      onSubmit(name, number);
      resetState();
    } else {
      alert(`${event.target.name.value} is already in contacts`);
    }
  };

  const resetState = () => {
    setName('');
    setNumber('');
  };

  const handelChangeName = event => {
    setName(event.currentTarget.value);
  };
  const handelChangeNumber = event => {
    setNumber(event.currentTarget.value);
  };
  return (
    <>
      <CreateContactForm autoComplete="off" onSubmit={saveNewContact}>
        <Label htmlFor="name">
          <NameLable> Name</NameLable>
          <input
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handelChangeName}
          />
        </Label>
        <Label htmlFor="number">
          <NameLable>Number</NameLable>
          <input
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handelChangeNumber}
          />
        </Label>
        <SubmitButton> Add contact</SubmitButton>
      </CreateContactForm>
    </>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
