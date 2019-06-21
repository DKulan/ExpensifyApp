import React from 'react'
import {connect} from 'react-redux'

import {DateRangePicker} from 'react-dates'
import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../actions/filters'


export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }

  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({
      calendarFocused
    }))
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate()
    } else {
      this.props.sortByAmount()
    }
  }

  render() {
    const {filters} = this.props

    return (
      (
        <div>
          <input
            type="text"
            value={filters.text}
            onChange={this.onTextChange}
          />
          <select
            value={filters.sortBy}
            onChange={this.onSortChange}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)