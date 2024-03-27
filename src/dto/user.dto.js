export default class UserDTO {
    constructor(user) {
    this.id = user.id || user._id;
    this.name = user.name;
    //this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    //this.role = user.role;
    //this.cart = user.cart;
   }}