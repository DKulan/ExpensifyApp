import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../../actions/filters'
import moment from 'moment'


test('should generate set text filter data action object', () => {
  const action = setTextFilter('test')

  expect(action).toEqual({
    type: 'SET_TEXT',
    text: 'test'
  })
})

test('should generate set text filter default data action object', () => {
  const action = setTextFilter()

  expect(action).toEqual({
    type: 'SET_TEXT',
    text: ''
  })
})

test('should generate sort by amount data action object', () => {
  const action = sortByAmount()

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
})

test('should generate sort by date data action object', () => {
  const action = sortByDate()

  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  })
})

test('should generate set start data action object', () => {
  const action = setStartDate(moment(0))

  expect(action).toEqual({
    type: 'SET_START_DATE',
    date: moment(0)
  })
})

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0))

  expect(action).toEqual({
    type: 'SET_END_DATE',
    date: moment(0)
  })
})