import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses'
import {setTextFilter} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

store.dispatch(addExpense({
    description: 'Water bill',
    amount: 150
}))

store.dispatch(addExpense({
    description: 'Gas bill',
    amount: 50
}))

store.subscribe(() => {
    const state = store.getState()
    const filter = getVisibleExpenses(state.expenses, state.filters)

    console.log(filter)
})

store.dispatch(setTextFilter('gas'))


ReactDOM.render(<AppRouter/>, document.getElementById('app'))