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


test('should return 0 if there is no expense', () => {
  expect(getExpensesTotal([])).toBe(0)
})

test('should correctly add up a single expense', () => {
  expect(getExpensesTotal([{
    id: '1',
    description: 'gum',
    note: '',
    amount: 195,
    createdAt: 0
  }])).toBe(195)
})

test('should correctly add up multiple expenses', () => {
  expect(getExpensesTotal(expenses)).toBe(114195)
})