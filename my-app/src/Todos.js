import React from 'react'

export default function (props) {
  return (
    <div className="todos collection" id="todos">
      <ul className="list-group list-group-horizontal-sm" id="todo-list">
        <div>
          {props.todos.filter(props.filter).map((todo, i) => <Todo todo={todo} key={i} onDone={props.onDone} />)}
        </div>
      </ul>
    </div>
  )
}

function Todo (props) {
  return (
    <li className="list-group-item list-group-item-dark" style={{color: "whitesmoke", background: "rgba(25, 25, 25, 0.2)"}}>
      <span><strong>{props.todo.text}</strong></span>
      <span>&emsp;<button id="btn-todo" style={{background: "red"}}>✖</button></span>
      {!props.todo.complete ? 
      <span>&emsp;<button id="btn-todo" style={{background: "green"}} onClick={() => props.onDone(props.todo)}>✔</button></span> 
      : null}
    </li>
  )
}
