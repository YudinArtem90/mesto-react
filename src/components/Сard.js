import React from 'react';
import buttonDelete from '../images/element/delete.svg';

function Card({link, name, likes, onCardClick}){

    function handleClick() {
        onCardClick(link);
      }

    return (
        <article className="element">
            <img className="element__image" src={`${link}`} onClick={handleClick}/>
            <img src={buttonDelete} alt="Кнопка удаления карточки" className="element__button-delete" />
            <div className="element__container">
            <p className="element__text">{name}</p>
                <div className="element__container_likes">
                    <button type="button" className="element__button-like" />
                    <p className="element__count-like">{likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;