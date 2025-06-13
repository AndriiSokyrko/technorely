import {QueryClient} from "@tanstack/react-query";
import {makeAutoObservable} from "mobx";

export const queryClient = new QueryClient();

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = []
        this._usersInfo = []
        this._flagRedraw =0
        this._totalCount = 0
        this._page = 1
        this._limit = 4
        makeAutoObservable(this)
    }
    setUserInfo(info){
        this._usersInfo = info
    }
    setFlagRedraw(num){
        this._flagRedraw = num
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
    setPage(page) {
        this._page = page
    }
    setLimit(limit) {
        this._limit = limit
    }


    setTotalCount(count) {
        this._totalCount = count
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
    get getUserInfo(){
        return this._usersInfo
    }
    get getflagRedraw(){
        return this._flagRedraw
    }
    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}