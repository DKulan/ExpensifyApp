import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'


const expense = {
  id: '1',
  description: 'gum',
  note: '',
  amount: 195,
  createdAt: 0
}

let editExpense, startRemoveExpense, history, wrapper

beforeEach(() => {
  editExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expense}
    />)
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense)

  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense)
})

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click')

  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expense.id
  })
})