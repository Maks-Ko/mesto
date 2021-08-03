export default class UserInfo {
    constructor({ userName, userProfession, userAvatar }) {
        this._userName = userName;
        this._userProfession = userProfession;
        this._userAvatar = userAvatar;
        this._name = '';
        this._profession = '';
        this._avatar = '';
    }
    
    // метод который принимает и обновляет данные
    setUserInfo(data) {
        this._name = data.name;
        this._profession = data.about;
        this._avatar = data.avatar;
        this._userName.textContent = this._name;
        this._userProfession.textContent = this._profession;
        this._userAvatar.src = this._avatar;
    }


    
    // метод который возвращает даннве
    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._userName.textContent;
        this._userInfo.profession =  this._userProfession.textContent;
        return this._userInfo;
    }

    // // метод который обнавляет данные на странице
    // updateUserInfo() {
    //     this._userName.textContent = this._name;
    //     this._userProfession.textContent = this._profession;
    //     this._userAvatar.src = this._avatar;
    // }

    // // метод который обнавляет аватар
    // updateUserAvatar() {
    //     this._userAvatar.src = this._avatar;
    // }
}