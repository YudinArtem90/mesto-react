import React from 'react';
import api from '../utils/api';
import Card from './Сard';
import pen from '../images/button/pen.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick}){

    const currentUser = React.useContext(CurrentUserContext);

    const [cards, setCards] = React.useState([]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.addLikeOrDislikeCard(card._id, !isLiked).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        });
    }

    function handleCardDelete(card){
        api.deleteCard(card._id).then((newCard) => {
            console.log('newCard', newCard);
            //const newCards = cards.filter((c) => c._id === card._id ? newCard : c);
            //setCards(newCards);
          });
    }

    function showCards(){
        api.getCards() 
            .then((res) => {
                setCards(res);
            })
            .catch((error) => console.log('Ошибка при первичной загрузке карточек', error));
    }

    React.useEffect(() => {
        showCards();
    },[]);

    const {name, avatar, about} = currentUser;

    return(
        <main className="main">
            <section className="profile">
            <div className="profile__container-avatar">
                <div className="profile__avatar-opacity" src={`${pen}`} onClick={onEditAvatar}/>
                <img alt="Аватарка пользователя" className="profile__avatar" src={`${avatar}`}/>
            </div>
            <div className="profile-info">
                <div className="profile-info__container">
                    <h1 className="profile-info__name">{name}</h1>
                    <button className="profile-info__edit-button" type="button" onClick={onEditProfile}/>
                </div>
                <p className="profile-info__information-person">{about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}/>
            </section>
            <section className="elements">
                {
                    cards && 
                    cards.map((card) => 
                        <Card 
                            key={card._id} 
                            {...card}
                            onCardClick={(linkCard) => handleCardClick(linkCard)}
                            onCardLike={(card) => handleCardLike(card)}
                            onCardDelete={(card) => handleCardDelete(card)}
                        />)
                }
            </section>
      </main>
    );
}