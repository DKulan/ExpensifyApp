import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import {combineReducers, createStore} from "redux"


export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        })
    )

    return store
}