import React from 'react'
import {connect} from 'react-redux'
import selectExpenses from '../selectors/expenses'
import {getExpensesTotal} from '../selectors/expenses-total'
import numeral from 'numeral'


export class ExpensesSummary extends React.Component {
  render() {
    const {expenseCount, expenseTotal} = this.props

    return (
      <h2>Viewing {expenseCount} expense{(expenseCount === 0 || expenseCount > 1) && 's'} totalling {numeral(expenseTotal/100).format('$0,0.00')}</h2>
    )
  }
}

const mapStateToProps = (state) => ({
  expenseCount: selectExpenses(state.expenses, state.filters).length,
  expenseTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters))
})

export default connect(mapStateToProps)(ExpensesSummary)