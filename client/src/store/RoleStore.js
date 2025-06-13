import {makeAutoObservable} from "mobx";

export default class RoleStore {
    constructor() {
        this._role = []
        this._flagRedraw =0
        makeAutoObservable(this)
    }
    setRole(payload) {
        this._role = payload
    }
    setFlagRedraw(num){
        this._flagRedraw = num
    }
    get getFlagRedraw(){
        return this._flagRedraw
    }
    get getRole() {
        return this._role
    }

}