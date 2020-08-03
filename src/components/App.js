import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import '../index.css';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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

function App() {

  const [isEditProfilePopupOpen, openEditProfilePopupClick] = React.useState(false);
  const [isAddPlacePopupOpen, openAddPlacePopupClick] = React.useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopupClick] = React.useState(false);
  const [isDeleteCardPopupOpen, openDeleteCardPopupClick] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState('');
  const [currentUser, changeCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  function handleUpdateAvatar(data){
    api.editAvatar(data)
    .then((res) => {
      changeCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => console.log('Ошибка при редактировании аватара пользователя', error));
  }

  function handleUpdateUser(data){
    api.editProfileForm(data)
      .then((res) => {
        changeCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log('Ошибка при редактировании данных пользователя', error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.addLikeOrDislikeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => console.log('Ошибка при добавления лайка', error));
  }

    function handleCardDelete(card){
        api.deleteCard(card._id).then((newCard) => {
            const newCards = cards.filter((c) => c._id !== card._id);
            setCards(newCards);
          });
    }

    function handleAddPlaceSubmit(data){
      api.addCard(data)
        .then((newCard) => {
          setCards([...cards, newCard]);
          closeAllPopups();
        });
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            setCards={setCards}
          />
          <Footer/>
        </div>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
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
