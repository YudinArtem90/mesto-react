import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import '../index.css';
import ImagePopup from './ImagePopup';

function PopupDeleteCard(){
  return (
    <>
        <button className="popup__button popup__button_delete-card" type="submit">Да</button>
    </>
);
}

function PopupElementEditAvatar(){
  return (
      <>
          <input id="link_avatar" className="popup__field" type="url" name="linkCard" placeholder="Ссылка на картинку" required />
          <span id="link_avatar-error" className="popup__field-error" />
          <button className="popup__button popup__save_button" type="submit">Сохранить</button>
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
          <button className="popup__button popup__save_button" type="submit">Сохранить</button>
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
          <button className="popup__button popup__save_button" type="submit">Создать</button>
      </>
  );
}

function App() {

  const [isEditProfilePopupOpen, openEditProfilePopupClick] = React.useState(false);
  const [isAddPlacePopupOpen, openAddPlacePopupClick] = React.useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopupClick] = React.useState(false);
  const [isDeleteCardPopupOpen, openDeleteCardPopupClick] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState('');

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
  
  return (
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

      <PopupWithForm
            children={<PopupElementEditAvatar/>}
            title='Обновить аватар'
            name ='popupEditAvatar'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
        />

        <PopupWithForm
            children={<PopupElementEditProfile/>}
            title='Редактировать профиль'
            name ='popupEditProfile'
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        />

        <PopupWithForm
            children={<PopupElementAddCard/>}
            title='Новое место'
            name ='popupAddCard'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
        />

        <PopupWithForm
            children={<PopupDeleteCard/>}
            title='Вы уверены?'
            name ='popupDeleteCard'
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
    </div>
  );
}

export default App;
