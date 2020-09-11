import React from 'react'
// import Navigator from './Navigator'
import TodoForm from './TodoForm'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import Todos from './Todos'
import logo from './todo_logo_1.png'
import LoginForm from './LoginForm'
import Signup from './Signup'


export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      loggedIn: false,
      todos: [
        { text: 'Make spicy ramen', complete: false },
        { text: 'Don\'t do laundry', complete: false },
        { text: 'Shop for a cool car', complete: false },
        { text: 'Make the bed', complete: true }
      ]
    }
  }

  // componentDidMount () {
  //   socket.on('chat message', msg => {
  //     console.log('Got a message:', msg)
  //     console.log(this.state.loggedIn, 'loggedIn state')
  //     this.setState({ messages: this.state.messages.concat(msg) })
  //   })

  //   // Get initial list of messages
  //   fetch('/messages')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('fetched data from server')
  //       this.setState({ messages: data })
  //     })
  // }

  loginFunc(nick, password) {
    this.setState({
      nick: nick,
      loggedIn: true,
    })
  }

  handleDone (todo) {
    const indexToComplete = this.state.todos.indexOf(todo)
    this.state.todos[indexToComplete].complete = true
    this.setState({
      todos: this.state.todos
    })
  }

  addTodo (text) {
    this.setState({
      todos: this.state.todos.concat({ text: text, complete: false })
    })
  }

  render () {
    return (
      // <div>
      //   <Navigator
      //     todos={this.state.todos}
      //     handleDone={this.handleDone.bind(this)}
      //     loggedIn={this.state.loggedIn}
      //     loginFunc={this.loginFunc.bind(this)}
      //     // onSubmit={this.addTodo.bind(this)}
      //   />
      //   <TodoForm onSubmit={this.addTodo.bind(this)} />
      // </div>

      <Router>
      <div>
        <div className="logo">
            <img src={logo} alt="logo"/>
            {/* <AddTodo addTodo={this.addTodo}/>  */}
        </div>
        <div id="menu-outer">
          <nav className="table">
            <ul id="horizontal-list">
              <li>
                <Link to='/'><button>All</button></Link>
              </li>
              <li>
                <Link to='/todo'><button>To Do</button></Link>
              </li>
              <li>
                <Link to='/done'><button>Done</button></Link>
              </li>
              <li>
                <Link to="/signup"><button style={{color:"whitesmoke"}}>Sign Up</button></Link>
              </li>
              <li>
                <Link to="/login"><button style={{color:"whitesmoke"}}>Log In</button></Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
          {this.state.loggedIn 
            ? <Redirect to="/" />
            : <LoginForm loginFunc={this.loginFunc.bind(this)}/>}
          </Route>

          <Route path="/signup">
          {this.state.loggedIn 
            ? <Redirect to="/" />  
            : <Signup loginFunc={this.loginFunc.bind(this)}/>}
          </Route>

          <Route path='/todo'>
          {this.state.loggedIn 
            ? [<TodoForm onSubmit={this.addTodo.bind(this)}/>, 
                <Todos todos={this.state.todos} filter={todo => !todo.complete} onDone={this.handleDone.bind(this)}/>]
            // ? <Todos todos={props.todos} filter={todo => !todo.complete} onDone={props.handleDone}/>
            : <Redirect to="/" />}
          </Route>

          <Route path='/done'>
          {this.state.loggedIn 
            ? <Todos todos={this.state.todos} filter={todo => todo.complete} />
            : <Redirect to="/" />}
          </Route>

          <Route path='/'>
          {this.state.loggedIn
            ? [<TodoForm onSubmit={this.addTodo.bind(this)}/>,
              <Todos todos={this.state.todos} filter={todo => todo} onDone={this.handleDone.bind(this)} />]
            : <Redirect to='/login'/>}
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}
