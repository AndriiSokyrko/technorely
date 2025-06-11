import {QueryClient} from "@tanstack/react-query";
import {makeAutoObservable} from "mobx";

export const queryClient = new QueryClient();

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUsers(users) {
        this._users=users
    }

    get isAuth() {
        return this._isAuth
    }
    get getUser() {
        return this._user
    }
    get getUsers() {
        return this._users
    }
}