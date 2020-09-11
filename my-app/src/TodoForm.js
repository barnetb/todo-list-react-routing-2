import React from 'react'

class TodoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { formValue: '' }
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.onSubmit(this.state.formValue)
  }

  handleChange (event) {
    this.setState({ formValue: event.target.value })
  }

  render () {
    return (
      <div className="todo-form">
        <div className="">
          <form onSubmit={this.handleSubmit.bind(this)} autocomplete="off">
            {/* <div className="input-group mb-3"> */}
              <input className=" " id="todo-input" 
                type='text' placeholder='Enter new todo...'
                aria-label="Recipient's username" aria-describedby="button-addon2" 
                value={this.state.formValue} 
                onChange={this.handleChange.bind(this)} 
              />
              <button id="btn-subm" type='submit'>Add</button>
            {/* </div> */}
          </form>
        </div>
      </div>
    )
  }
}

export default TodoForm
