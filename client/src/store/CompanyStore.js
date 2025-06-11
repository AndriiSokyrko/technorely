import {makeAutoObservable} from "mobx";

export default class CompanyStore {
    constructor() {
        this._company = []
        this._page = 1
        this._totalCount = 0
        this._limit = 4
        this._companyId = 1
        this._flagRdraw = 0
        this._minCapital = 0
        this._maxCapital = 0

        makeAutoObservable(this)
    }

    setCompany(company) {
        this._company = company
    }


    setPage(page) {
        this._page = page
    }

    setFlagRedraw(num) {
        this._flagRdraw = num
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setMaxCapital(capital) {
        this._maxCapital = capital
    }

    setMinCapital(capital) {
        this._minCapital = capital
    }

    setCompanyId(id) {
        this._companyId = id
    }

    get minCapital() {
        return this._minCapital
    }

    get maxCapital() {
        return this._maxCapital
    }

    get getCompanyId() {
        return this._companyId
    }

    get flagRedraw() {
        return this._flagRdraw
    }

    get getCompany() {
        return this._company
    }

    get getCompanyById() {
        return this._company.find(comp => comp.id === this._companyId)
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
