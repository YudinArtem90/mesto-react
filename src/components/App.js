import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import '../index.css';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
// import AllPopupWithForm from './AllPopupWithForm';
import EditProfilePopup from './EditProfilePopup';

function PopupElementEditAvatar(){
  return (
      <>
          <input id="link_avatar" className="popup__field" type="url" name="linkCard" placeholder="Ссылка на картинку" required />
          <span id="link_avatar-error" className="popup__field-error" />
      </>
  );
}

function PopupElementEditProfile(){
  return (
      <>
          <input id="name_person" className="popup__field popup__field_name_person" type="text" name="namePerson" minLength={2} maxLength={40} pattern="^[A-Za-zА-Яа-яЁё\s\-]+$" required />
          <span id="name_person-error" className="popup__field-error" />
          <input id="inform_person" className="popup__field popup__field_inform_person" type="text" name="informPerson" minLength={2} maxLength={200} required />
          <span id="inform_person-error" className="popup__field-error" />
      </>
  );
}

function PopupElementAddCard(){
  return (
      <>
          <input id="name_card" className="popup__field popup__field_name_card" type="text" minLength={1} maxLength={30} name="nameCard" placeholder="Название" required />
          <span id="name_card-error" className="popup__field-error" />
          <input id="link_card" className="popup__field popup__field_link_card" type="url" name="linkCard" placeholder="Ссылка на картинку" required />
          <span id="link_card-error" className="popup__field-error" />
      </>
  );
}

function App() {

  const [isEditProfilePopupOpen, openEditProfilePopupClick] = React.useState(false);
  const [isAddPlacePopupOpen, openAddPlacePopupClick] = React.useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopupClick] = React.useState(false);
  const [isDeleteCardPopupOpen, openDeleteCardPopupClick] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState('');
  const [currentUser, changeCurrentUser] = React.useState({});

  function getCurrentUser(){
    api.getUserInfo()
            .then((res) => {
                changeCurrentUser(res);
            })
            .catch((error) => console.log('Ошибка при первичной загрузке данных пользователя', error));
  }

  function handleEditProfileClick(){
    openEditProfilePopupClick(true);
  }

  function handleEditAvatarClick(){
    openEditAvatarPopupClick(true);
  }

  function handleAddPlaceClick(){
    openAddPlacePopupClick(true);
  }

  function closeAllPopups(){
    openEditProfilePopupClick(false);
    openEditAvatarPopupClick(false);
    openAddPlacePopupClick(false);
    handleCardClick('');
  }

  React.useEffect(() => {
    getCurrentUser();
  }, []);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header/>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={(linkCard) => handleCardClick(linkCard)}
          />
          <Footer/>
        </div>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
        />

        <PopupWithForm
            children={<PopupElementEditAvatar/>}
            title='Обновить аватар'
            name ='popupEditAvatar'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            textButton='Сохранить'
        />

        {/* <PopupWithForm
            children={<PopupElementEditProfile/>}
            title='Редактировать профиль'
            name ='popupEditProfile'
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            textButton='Сохранить'
        /> */}

        <PopupWithForm
            children={<PopupElementAddCard/>}
            title='Новое место'
            name ='popupAddCard'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            textButton='Создать'
        />

        <PopupWithForm
            children={''}
            title='Вы уверены?'
            name ='popupDeleteCard'
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            textButton='Да'
        />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
