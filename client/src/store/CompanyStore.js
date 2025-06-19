import {makeAutoObservable} from "mobx";

export default class CompanyStore {
    constructor() {
        this._company = []
        this._companyInfo = {}
        this._totalCount = 0
        this._page = 1
        this._limit = 2
        this._companyId = 1
        this._flagRdrawCompany = 0
        this._minCapital = 0
        this._maxCapital = 100000000
        this._nameSort ='name'
        this._typeSort='asc'
        this._startDate= null
        this._endtDate= null
        makeAutoObservable(this)
    }
    setStartDate(startDate){
        this._startDate=startDate
    }
    setCompanyIfo(companyInfo){
        this._companyInfo= companyInfo
    }
    setEndDate(endDate){
        this._endDate=endDate
    }
    setNameSort(nameSort){
        this._nameSort = nameSort
    }
    setTypeSort(typeSort){
        this._typeSort = typeSort
    }

    setCompany(company) {
        this._company = company
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

    setFlagRedrawCompany(num) {
        this._flagRdrawCompany = num
    }

    setMaxCapital(capital) {
        this._maxCapital = capital
    }

    setMinCapital(capital) {
        this._minCapital = capital
    }
    setFilterByCapital(){
        if(this._typeSort==='asc') {
            this._company.sort((a, b) => {
                if (a.name === this._nameSort) return a.name - b.name
                if (a.service === this._nameSort) return a.service - b.service
                if (a.capital === this._nameSort) return a.capital - b.capital
            })
        } else {
            this._company.sort((a, b) => {
                if (a.name === this._nameSort) return b.name - a.name
                if (a.service === this._nameSort) return b.service - a.service
                if (a.capital === this._nameSort) return b.capital - a.capital
            })
        }
    }
    setCompanyId(id) {
        this._companyId = id
    }
    get  getCompanyIfo(){
        return this._companyInfo
    }
    get getStartDate(){
        return this._startDate
    }
    get getEndDate(){
        return this._endDate
    }
    get getNameSort(){
        return this._nameSort
    }
    get getTypeSort(){
        return this._typeSort
    }
    get minCapital() {
        return this._minCapital
    }

    get maxCapital() {
        return this._maxCapital
    }

    get getCompanyId() {
        return this._company.find(it=>it.id= this._companyId)
    }

    get flagRedrawCompany() {
        return this._flagRdrawCompany
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
