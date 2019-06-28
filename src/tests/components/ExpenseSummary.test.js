import React from 'react'
import {shallow} from 'enzyme'
import {ExpensesSummary} from '../../components/ExpensesSummary'
import {getExpensesTotal} from '../../selectors/expenses-total'
import moment from 'moment'


const expenses = [{
  id: '1',
  description: 'gum',
  note: '',
  amount: 195,
  createdAt: 0
}, {
  id: '2',
  description: 'rent',
  note: '',
  amount: 109500,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'credit card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}]

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>)

  expect(wrapper).toMatchSnapshot()
})

test('should correctly render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={500238}/>)

  expect(wrapper).toMatchSnapshot()
})