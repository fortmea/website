function PrivValidation() {
    const SessionCookie = Cookies.get("session");
    if (SessionCookie) {
        
    } else {
        let url;
        url = new URL(location.href.replace('admin.html', 'index.html'));
        $(location).attr('href', url);
    }
}
function ListUsers(){

}
function RemoveUser(){

}
function EditUser(){

}
function EditSelf(){

}
class user{
    constructor(name, email, picture, privileges, confirmation){
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.privileges = privileges;
        this.confirmation = confirmation;
    }
}