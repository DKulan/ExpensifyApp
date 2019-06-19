import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseListItem} from '../../components/ExpenseListItem'


const expense = {
  id: '1',
  description: 'gum',
  note: '',
  amount: 195,
  createdAt: 0
}

test('should render ExpenseListItem with expense', () => {
  const wrapper = shallow(<ExpenseListItem key={expense.id} {...expense}/>)

  expect(wrapper).toMatchSnapshot()
})