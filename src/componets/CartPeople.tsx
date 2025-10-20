import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowUpRightCircle } from "react-icons/bs";


interface CartPeopleProps {
  person: {
    id: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    dateAge: string;
    age: number;
    description: string;
    avatarUrl: string;
    galleryUrl: string[];
    connectionGroup: string[];
    x: number;
    y: number;
  };
}


const CartPeople: React.FC<CartPeopleProps> = ({ person }) => {

  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/${person.lastName}_${person.firstName}/${person.id}`);
  };

  return (
    <div className="cartPeople">
      <div className="cartPeople__head">
        <div className="cartPeople__head-container">
          <h3 className='cartPeople__head-name'>{person.lastName}<br />{person.firstName}<br />{person.patronymic}</h3>
          <h5 className='cartPeople__head-age'><strong>Дата рождения:</strong> <br />{person.dateAge}</h5>
        </div>
        <div className="cartPeople__head-images">
          <img className='' src={person.avatarUrl} alt={`${person.firstName} ${person.lastName}`} />
        </div>
      </div>
      <p className='cartPeople__description'>{person.description}</p>
      <button className='cartPeople__button button'onClick={handleLearnMore}>Подробнее<BsArrowUpRightCircle className='cartPeople__button-img' color='white' fontSize="40"/></button>
    </div>
  );
};

export default CartPeople;