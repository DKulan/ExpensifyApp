import expensesReducer from '../../reducers/expenses'
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

test('should set default state', () => {
  const state = expensesReducer(undefined, {
    type: '@@INIT'
  })

  expect(state).toEqual([])
})

test('should remove expense by id', () => {
  const state = expensesReducer(expenses, {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  })

  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id is not found', () => {
  const state = expensesReducer(expenses, {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  })

  expect(state).toEqual(expenses)
})

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'gym membership',
    note: '',
    amount: 1000,
    createdAt: 0
  }

  const state = expensesReducer(expenses, {
    type: 'ADD_EXPENSE',
    expense
  })

  expect(state[3]).toEqual(expense)
})

test('should edit an expense', () => {
  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description: 'edited description'
    }
  })

  expect(state[0].description).toBe('edited description')
})

test('should not edit expense if expense not found', () => {
  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      description: 'edited description'
    }
  })

  expect(state).toEqual(expenses)
})
