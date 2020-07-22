import React from 'react';
import api from '../utils/api';
import Card from './Сard';
import pen from '../images/button/pen.svg';

export default function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick}){

    const [user, getUserData] = React.useState({
        userName : '', 
        userDescription: '', 
        userAvatar: ''
    });

    const [cards, getCards] = React.useState([]);

    function showCards(){
        api.getCards() 
            .then((res) => {
                getCards(res);
            })
            .catch((error) => console.log('Ошибка при первичной загрузке карточек', error));
    }

    function showUserInfo(){
        api.getUserInfo()
            .then((res) => {
                const {avatar, name, about, _id} = res;
                getUserData({
                    userName : name, 
                    userDescription: about, 
                    userAvatar: avatar
                });
            })
            .catch((error) => console.log('Ошибка при первичной загрузке данных пользователя', error));
    }

    React.useEffect(() => {
        showCards();
        showUserInfo();
    },[]);

    const {userName, userAvatar, userDescription} = user;

    return(
        <main className="main">
            <section className="profile">
            <div className="profile__container-avatar">
                <div className="profile__avatar-opacity" src={`${pen}`} onClick={onEditAvatar}/>
                <img alt="Аватарка пользователя" className="profile__avatar" src={`${userAvatar}`}/>
            </div>
            <div className="profile-info">
                <div className="profile-info__container">
                    <h1 className="profile-info__name">{userName}</h1>
                    <button className="profile-info__edit-button" type="button" onClick={onEditProfile}/>
                </div>
                <p className="profile-info__information-person">{userDescription}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}/>
            </section>
            <section className="elements">
                {
                    cards && 
                    cards.map(({_id, ...props}) => <Card key={_id} {...props} onCardClick={(linkCard) => handleCardClick(linkCard)}/>)
                }
            </section>
      </main>
    );
}