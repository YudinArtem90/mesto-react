import React from 'react';
import closeIcon from '../images/pop-up/close_icon.svg';

function PopupWithForm({title, name, children, isOpen, onClose, textButton, onSubmit}){
        return(
        <div className={`popup ${isOpen && 'popup_opened'}`} id={name}>
          <form className="popup__container" method="post" onSubmit={onSubmit} noValidate>
            <img src={closeIcon} alt="Кнопка закрытия модального окна" className="popup__icon-close popup__icon-close_form" onClick={onClose}/>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__button" type="submit">{textButton}</button>
          </form>
        </div>
        );
}

export default PopupWithForm;