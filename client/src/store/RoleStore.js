import {makeAutoObservable} from "mobx";

export default class RoleStore {
    constructor() {
        this._roles = []
        this._flagRedrawRole =0
        makeAutoObservable(this)
    }
    setRoles(payload) {
        this._roles = payload
    }
    setFlagRedrawRole(num){
        this._flagRedrawRole = num
    }
    get getFlagRedrawRole(){
        return this._flagRedrawRole
    }
    get getRoles() {
        return this._roles
    }

}