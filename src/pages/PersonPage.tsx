import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Accordion from '../componets/Accordion';
import PersonPageSwiper from '../componets/PersonPageSwiper';
import { usePeopleData } from '../hooks/usePeopleData';

const PersonPage: React.FC = () => {
  const { people, loading, error } = usePeopleData();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  const person = people.find((p) => p.id === id);
  
  if (!person) {
    return (
      <div className="not-found">
        <h2>Человек не найден</h2>
        <button onClick={() => navigate(-1)}>Вернуться назад</button>
      </div>
    );
  };
  console.log(person.galleryUrl)
  const galleryArray = person.galleryUrl;
  // const arr = galleryArray.split(', ');

  return (
    <div className='personPage'>
      <div className="personPage__mainInfo">
        
        <div className="personPage__mainInfo-photo">
          <img src={person.avatarUrl}/>
        </div>

        <div className="personPage__mainInfo-text">
          <h2 className='personPage__mainInfo-name'>
            {person.lastName} {person.firstName}
          </h2>
          
          {person.age && (
            <Accordion
              title="Место рождения:"
              content={person.dateAge}
            />
          )}
        </div>
      </div>
      
      <div className="personPage__swiper">
        <PersonPageSwiper photoAlbum={galleryArray}/>
      </div>
    </div>
  );
};

export default PersonPage;