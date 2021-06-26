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
    // метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ userNameInput, userProfessionInput }) {
        this._userName.textContent = userNameInput;
        this._userProfession.textContent = userProfessionInput;
    }
}