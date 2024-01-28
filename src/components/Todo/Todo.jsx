import React, { useState } from "react";
import styles from "./Todo.css";
import { Notification } from "./Notification";
import { PiPencilLineThin } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
export const Todo = () => {
    //новая добавленная задача
  const [newTodo, setNewTodo] = useState("");
  //все добавленные задачи
  const [allTodos, setAllTodos] = useState([]);
   //объект для изменения цвета и текста уведомления
  const [notification, setNotification] = useState({});
    //показ уведомдения
  const [notificationVisible, setNotificationVisible] = useState(false);
//функция добавления задачи
  const addTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim().length) {
      setAllTodos([...allTodos, newTodo]);
      setNotificationVisible(true);
      setNotification((prevNotification) => ({
        ...prevNotification,
        color: "background-green",
        text: "Задача добавлена",
      }));
      setNewTodo("");
    } else {
      alert("Поле не может быть пустым");
    }
  };
  //функция удаления задачи
  const deleteTodo = (index) => {
    const newTodos = [...allTodos].filter((_, ind) => ind !== index);
    setAllTodos(newTodos);
    setNotificationVisible(true);
    setNotification((prevNotification) => ({
      ...prevNotification,
      color: "background-red",
      text: "Задача удалена",
    }));
  };
   //функция изменения задачи
  const editTodo = (index) => {
    const textEditTodo = prompt("Хотите изменить задачу?", "");
    if (textEditTodo) {
      const newTodos = allTodos.map((item, i) =>
        i === index ? textEditTodo : item
      );

      setAllTodos(newTodos);
      setNotificationVisible(true);
      setNotification((prevNotification) => ({
        ...prevNotification,
        color: "background-blue",
        text: "Задача изменена",
      }));
    } else {
      alert("Вы отказались от ввода");
    }
  };

  return (
    <div className="todo-app">
      <h2 className="todo-header">To-do list React</h2>

      <form action="#">
        <div>
          <label htmlFor="input-form">Enter a task</label>
          <input
            type="text"
            id="input-form"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
        </div>
        <button className="todo-button" onClick={addTodo}>
          Add task
        </button>
      </form>
      <ul className="todo-list">
        {!allTodos.length ? (
          <p>No data</p>
        ) : (
          allTodos.map((item, index) => (
            <li className="todo-item" key={index} id={index}>
              {item}
              <div className="todo-buttons">
                <button className="todo-edit" onClick={() => editTodo(index)}>
                  <PiPencilLineThin className="react-icons-edit" />
                </button>
                <button
                  className="todo-remove"
                  onClick={() => deleteTodo(index)}
                >
                  <RxCross2 className="react-icons-edit" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      {notificationVisible && (
        <Notification
          text={notification.text}
          background={notification.color}
          onHideNotification={() => setNotificationVisible(false)}
        />
      )}
    </div>
  );
};
