import { nameInput, aboutMeInput } from '../utils/constants.js';

export default class UserInfo {
    constructor({ userName, userProfession }) {
        this._userName = userName;
        this._userProfession = userProfession;
    }
    // метод, который возвращает объект с данными пользователя.
    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._userName.textContent;
        this._userInfo.profession =  this._userProfession.textContent;
        return this._userInfo;
    }
    // метод, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo() {
        this._userName.textContent = nameInput.value;
        this._userProfession.textContent = aboutMeInput.value;
    }
}