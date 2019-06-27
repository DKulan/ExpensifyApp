const getExpensesTotal = (expenses) => {
  if (expenses.length === 0) {
    return 0
  } else {
    return expenses.map((expense) => expense.amount).reduce((total, amount) => {
      return total + amount
    })
  }
}

export {getExpensesTotal}