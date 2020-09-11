import React from 'react'
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
import TodoForm from './TodoForm'


export default function (props) {
  return (
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
          {props.loggedIn 
            ? <Redirect to="/" />
            : <LoginForm loginFunc={props.loginFunc}/>}
          </Route>

          <Route path="/signup">
          {props.loggedIn 
            ? <Redirect to="/" />  
            : <Signup loginFunc={props.loginFunc}/>}
          </Route>

          <Route path='/todo'>
          {props.loggedIn 
            // ? [<TodoForm onSubmit={props.addTodo}/>, 
            //     <Todos todos={props.todos} filter={todo => !todo.complete} onDone={props.handleDone}/>]
            ? <Todos todos={props.todos} filter={todo => !todo.complete} onDone={props.handleDone}/>
            : <Redirect to="/" />}
          </Route>

          <Route path='/done'>
          {props.loggedIn 
            ? <Todos todos={props.todos} filter={todo => todo.complete} />
            : <Redirect to="/" />}
          </Route>

          <Route path='/'>
          {props.loggedIn
            ? <Todos todos={props.todos} 
            filter={todo => todo} onDone={props.handleDone} />
            : <Redirect to='/login'/>}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
