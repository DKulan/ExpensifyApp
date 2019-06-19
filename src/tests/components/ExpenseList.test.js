import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseList} from '../../components/ExpenseList'
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

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>)

  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]}/>)

  expect(wrapper).toMatchSnapshot()
})