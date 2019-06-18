import filtersReducer from '../../reducers/filters.js'
import moment from 'moment'


test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {
    type: '@@INIT'
  })

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {
    type: 'SORT_BY_AMOUNT'
  })

  expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  }

  const action = {
    type: 'SORT_BY_DATE'
  }

  const state = filtersReducer(currentState, action)
  expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT',
    text: 'hello'
  })

  expect(state.text).toBe('hello')
})

test('should set startDate filter', () => {
  const date = moment().startOf('month')
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    date
  })
  expect(state.startDate).toBe(date)
})

test('should set endDate filter', () => {
  const date = moment().endOf('month')
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    date
  })
  expect(state.endDate).toBe(date)
})