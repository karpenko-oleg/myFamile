import React from 'react';
import { useParams } from 'react-router-dom';
import { peopleData } from '../assets/data/objPeopleData';
import CartPeople from '../componets/CartPeople';

const PersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const person = peopleData.find((p) => p.id === parseInt(id));

  if (!person) {
    return <div>Человек не найден</div>;
  }

  return (
    <div>
      <h1>{person.firstName} {person.lastName}</h1>
      <CartPeople person={person} />
    </div>
  );
};

export default PersonPage;