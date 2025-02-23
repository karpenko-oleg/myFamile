import React from 'react';
import { Person } from '../assets/data/objPeopleData';

interface CartPeopleProps {
  person: Person;
}

const CartPeople: React.FC<CartPeopleProps> = ({ person }) => {
  return (
    <div className="cart-people">
      <img src={`/src/assets/${person.photo}`} alt={`${person.firstName} ${person.lastName}`} />
      <h2>{person.firstName} {person.lastName}</h2>
      <p>{person.description}</p>
    </div>
  );
};

export default CartPeople;