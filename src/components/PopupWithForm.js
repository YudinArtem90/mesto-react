import React from 'react';
import closeIcon from '../images/pop-up/close_icon.svg';

function PopupWithForm({title, name, children, isOpen, onClose}){
        return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={name}>
          <form className="popup__container" method="post" noValidate>
            <img src={closeIcon} alt="Кнопка закрытия модального окна" className="popup__icon-close popup__icon-close_form" onClick={onClose}/>
            <h2 className="popup__title">{title}</h2>
            {children}
          </form>
        </div>
        );
    
}

export default PopupWithForm;