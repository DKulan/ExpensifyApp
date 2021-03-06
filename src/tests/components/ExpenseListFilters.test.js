import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseListFilters} from '../../components/ExpenseListFilters'
import moment from 'moment'


const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
}

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />)
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })

  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  wrapper.find('input').simulate('change', {
    target: {
      value: 'new text'
    }
  })

  expect(setTextFilter).toHaveBeenLastCalledWith('new text')
})

test('should sort by date', () => {
  wrapper.find('select').prop('onChange')({
    target: {
      value: 'date'
    }
  })

  expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
  wrapper.find('select').prop('onChange')({
    target: {
      value: 'amount'
    }
  })

  expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years')
  const endDate = moment(0).add(8, 'years')
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
    startDate,
    endDate
  })

  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus changes', () => {
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate')

  expect(wrapper.state('calendarFocused')).toBe('endDate')
})
