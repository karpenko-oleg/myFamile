import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Accordion from '../componets/Accordion';
import PersonPageSwiper from '../componets/PersonPageSwiper';
import { usePeopleData } from '../hooks/usePeopleData';
import Loader from '../componets/Loader';

const PersonPage: React.FC = () => {
  const { people, loading, error } = usePeopleData();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

   // Состояние для модального окна
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedImage, setSelectedImage] = useState('');
 
   // Функции для открытия/закрытия модального окна
   const openModal = (imageUrl: string) => {
    console.log(imageUrl)
     setSelectedImage(imageUrl);
     setIsModalOpen(true);
   };
 
   const closeModal = () => {
     setIsModalOpen(false);
     setSelectedImage('');
   };

  if (loading) {
    return <Loader/>;
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

  const galleryArray = person.galleryUrl;

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
          <div className="personPage__mainInfo-container">
            <h6><span>Email:</span>{person.email}</h6>
            <h6><span>Телефон:</span>{person.phone}</h6>
            <h6><span>Год рождения:</span>{person.dateAge}</h6>
            <h6><span>Статус:</span>{person.maritalStatus}</h6>
            {person.address && (
            <Accordion
              title="Адрес:"
              content={person.address}
            />
            )}
            {person.placeBirth && (
              <Accordion
                title="Место рождения:"
                content={person.placeBirth}
              />
            )}
            {person.typeActivity && (
              <Accordion
                title="Профессия:"
                content={person.typeActivity}
              />
            )}
            {person.maritalStatus && (
              <Accordion
                title="Семейное положение:"
                content={person.maritalStatus}
              />
            )}
             {person.education && (
              <Accordion
                title="Образование:"
                content={person.education}
              />
            )}
            {person.kid && (
              <Accordion
                title="Дети:"
                content={person.kid}
              />
            )}
            {person.interests && (
              <Accordion
                title="Интересы:"
                content={person.interests}
              />
            )}
          </div>
        </div>
      </div>

      <p className="personPage__description">
        {person.description}
      </p>
      
      <div className="personPage__swiper">
        <PersonPageSwiper photoAlbum={galleryArray}/>
      </div>

      <div className="personPage__gallery">
        {galleryArray.map((urlSrc, index) => (
          <img 
            className="personPage__gallery-item" 
            key={index} 
            src={urlSrc} 
            alt="photo" 
            onClick={() => openModal(urlSrc)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {isModalOpen && (
        <div 
          className="personPage__modal" 
          onClick={closeModal}
        >
          <div 
            className="personPage__modal-boxModal"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Full screen" 
            />
            <button
              className="personPage__modal-button"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonPage;