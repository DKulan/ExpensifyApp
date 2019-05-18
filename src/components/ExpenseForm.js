import React from 'react'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'


class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({
            description
        }))
    }

    onAmountChange = (e) => {
        const amount = e.target.value

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({
                amount
            }))
        }
    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({
                createdAt
            }))
        }
    }

    onFocusChange = ({focused}) => {
        this.setState(() => ({
            calendarFocused: focused
        }))
    }

    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({
            note
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()

        const {description, amount, createdAt, note} = this.state

        if (!description || !amount) {
            this.setState(() => ({
                error: 'Please provide description and amount.'
            }))
        } else {
            this.setState(() => ({
                error: ''
            }))
            this.props.onSubmit({
                description,
                amount: parseFloat(amount) * 100,
                createdAt: createdAt.valueOf(),
                note
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.error &&
                    <p>{this.state.error}</p>
                }
               <form onSubmit={this.onSubmit}>
                   <input
                       type="text"
                       placeholder="Description"
                       autoFocus
                       value={this.state.description}
                       onChange={this.onDescriptionChange}
                   />
                   <input
                       type="text"
                       placeholder="Amount"
                       value={this.state.amount}
                       onChange={this.onAmountChange}
                   />
                   <SingleDatePicker
                       date={this.state.createdAt}
                       onDateChange={this.onDateChange}
                       focused={this.state.calendarFocused}
                       onFocusChange={this.onFocusChange}
                       numberOfMonths={1}
                       isOutsideRange={() => false}
                   />
                   <textarea
                       placeholder="Add a note for your expense"
                       value={this.state.note}
                       onChange={this.onNoteChange}
                   >
                   </textarea>
                   <button>Add Expense</button>
               </form>

            </div>
        )
    }
}

export default ExpenseForm