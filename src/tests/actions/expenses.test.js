import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  removeExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense
} from '../../actions/expenses'
import {database} from '../../firebase/firebase'
import moment from 'moment'

const uid = 'testuidabc123'
const createMockStore = configureMockStore([thunk])
const defaultAuthState = {
  auth: {
    uid
  }
}

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

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] = {description, note, amount, createdAt}
  })

  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'})

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[2].id

  store.dispatch(startRemoveExpense({id}))
    .then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      })
      return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy()
      done()
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    note: 'hello world'
  })

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'hello world'
    }
  })
})

test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  const updates = {amount: 21045}

  store.dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      })

      return database.ref(`users/${uid}/expenses/${id}`).once('value')
        .then((snapshot) => {
          expect(snapshot.val().amount).toBe(updates.amount)
          done()
        })
    })
})

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  }
  const action = addExpense(expenseData)

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData
    }
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      })

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState)

  store.dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          description: '',
          note: '',
          amount: 0,
          createdAt: 0
        }
      })

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    })
    done()
  })
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState)

  store.dispatch(startSetExpenses())
    .then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      })
      done()
    })
})