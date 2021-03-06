import React from 'react'
import {shallow} from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import moment from 'moment'


const expense = {
  id: '1',
  description: 'gum',
  note: '',
  amount: 195,
  createdAt: 0
}

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm/>)

  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expense}/>)

  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })

  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('input').at(0).simulate('change', {
    target: {
      value: 'New description'
    }
  })

  expect(wrapper.state('description')).toBe('New description')
})

test('should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('textarea').simulate('change', {
    target: {
      value: 'New note'
    }
  })

  expect(wrapper.state('note')).toBe('New note')
})

test('should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('input').at(1).simulate('change', {
    target: {
      value: '23.50'
    }
  })

  expect(wrapper.state('amount')).toBe('23.50')
})

test('should not set amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('input').at(1).simulate('change', {
    target: {
      value: '12.122'
    }
  })

  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy}/>)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })

  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expense.description,
    amount: expense.amount,
    note: expense.note,
    createdAt: expense.createdAt
  })
})

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm/>)
  const now = moment()
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)

  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true})

  expect(wrapper.state('calendarFocused')).toBe(true)
})