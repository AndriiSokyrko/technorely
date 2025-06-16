import {QueryClient} from "@tanstack/react-query";
import {makeAutoObservable} from "mobx";

export const queryClient = new QueryClient();

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._currentUser = {}
        this._userId = 0
        this._users = []
        this._usersInfo = []
        this._currentUserInfo = {}
        this._flagRedrawUser =0
        this._totalCount = 0
        this._page = 1
        this._limit = 4
        makeAutoObservable(this)
    }
    setUserInfo(info){
        this._usersInfo = info
    }
    setFlagRedrawUser(num){
        this._flagRedrawUser = num
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setCurrentUser(user) {
        this._currentUser = user
    }
    setCurrentUserIfo(info) {
        this._currentUserInfo = info
    }
    setUserId(id) {
          this._userId =id
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
    get getCurrentUser() {
        return this._currentUser
    }
    get getCurrentUserInfo() {
        return this._currentUserInfo
    }
    get getUserId() {
       return this._userId
    }
    get getUserById() {
        return this._users.find(user=>user.id===this._userId)
    }
    get getUsers() {
        return this._users
    }
    get getUserInfo(){
        return this._usersInfo
    }
    get flagRedrawUser(){
        return this._flagRedrawUser
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