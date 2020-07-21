import React from 'react';
import logo from '../images/logo/mesto-logo.svg';

function App() {
  return (
    <div className="App body">
      <div className="page">
      <header className="header header-margin">
        <a href="#" className="header__href">
          <img src={logo} alt="Логотип страницы мест в России" className="header__logo" />
        </a>
      </header>
      <main className="main">
        <section className="profile">
          <div className="profile__container-avatar">
            <div className="profile__avatar-opacity" />
            <img alt="Аватарка пользователя" className="profile__avatar" />
          </div>
          <div className="profile-info">
            <div className="profile-info__container">
              <h1 className="profile-info__name" />
              <button className="profile-info__edit-button" type="button" />
            </div>
            <p className="profile-info__information-person" />
          </div>
          <button className="profile__add-button" type="button" />
        </section>
        <section className="elements" />
        <div className="popup" id="popupEditProfile">
          <form className="popup__container popup__container_edit-profile" method="post" noValidate>
            <img src="../images/pop-up/close_icon.svg" alt="Кнопка закрытия модального окна" className="popup__icon-close popup__icon-close_form" />
            <h2 className="popup__title">Редактировать профиль</h2>
            <input id="name_person" className="popup__field popup__field_name_person" type="text" name="namePerson" minLength={2} maxLength={40} pattern="^[A-Za-zА-Яа-яЁё\s\-]+$" required />
            <span id="name_person-error" className="popup__field-error" />
            <input id="inform_person" className="popup__field popup__field_inform_person" type="text" name="informPerson" minLength={2} maxLength={200} required />
            <span id="inform_person-error" className="popup__field-error" />
            <button id="buttonSavePopupEditProfile" className="popup__button popup__save_button" type="submit">Сохранить</button>
          </form>
        </div>
        <div className="popup" id="popupAddCard">
          <form className="popup__container popup__container_add-card" method="post" noValidate>
            <img src="../images/pop-up/close_icon.svg" alt="Кнопка закрытия модального окна" className="popup__icon-close popup__icon-close_form" />
            <h2 className="popup__title">Новое место</h2>
            <input id="name_card" className="popup__field popup__field_name_card" type="text" minLength={1} maxLength={30} name="nameCard" placeholder="Название" required />
            <span id="name_card-error" className="popup__field-error" />
            <input id="link_card" className="popup__field popup__field_link_card" type="url" name="linkCard" placeholder="Ссылка на картинку" required />
            <span id="link_card-error" className="popup__field-error" />
            <button id="buttonSavePopupAddCard" className="popup__button popup__save_button" type="submit">Создать</button>
          </form>
        </div>
        <div className="popup" id="popupViewPhoto">
          <div className="popup__main-container">
            <div className="popup__footer-container">
              <img className="popup__view-photo-container" />
              <img src="../images/pop-up/close_icon.svg" alt="Кнопка закрытия модального окна" className="popup__icon-close icon-close-form_view-photo" />
            </div>
            <p className="popup__view-photo-info" />
          </div>
        </div>
        <div className="popup" id="popupDeleteCard">
          <div className="popup__main-container">
            <img src="../images/pop-up/close_icon.svg" alt="Кнопка закрытия модального окна" className="popup__icon-close popup__icon-close_delete-card" />
            <div className="popup__footer-container popup__footer-container_card-deletion-confirmation">
              <h2 className="popup__title">Вы уверены?</h2>
              <button className="popup__button popup__button_delete-card" type="submit">Да</button>
            </div>
          </div>
        </div>
        <div className="popup" id="popupEditAvatar">
          <form className="popup__container popup__container_edit-avatar-form" method="post" noValidate>
            <img src="../images/pop-up/close_icon.svg" alt="Кнопка закрытия модального окна" className="popup__icon-close popup__icon-close_form" />
            <h2 className="popup__title">Обновить аватар</h2>
            <input id="link_avatar" className="popup__field" type="url" name="linkCard" placeholder="Ссылка на картинку" required />
            <span id="link_avatar-error" className="popup__field-error" />
            <button id="buttonSavePopupEditAvatar" className="popup__button popup__save_button" type="submit">Сохранить</button>
          </form>
        </div>
      </main>
      <footer className="footer margin-footer">
        <p className="footer__copyright">© 2020 Mesto Russia</p>
      </footer>
    </div>

    </div>
  );
}

export default App;
