import User from "./user.repository.js";
import UserDao from "../Dao/User.dao.js";

export  const userRepository = new User(new UserDao());