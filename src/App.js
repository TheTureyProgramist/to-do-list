import './App.css';
import { initialTodos } from './data/todo.json'
import { Component } from 'react';
import styled from 'styled-components';
import { List } from './components/List/List';
// Створити новий проєкт на основі реакт або використати готову збірку react-homework-template
// Створити файл todo.json з наступними даними
// [
//   { "id": "id-1", "text": "Вивчити основи React", "completed": true },
//   { "id": "id-2", "text": "Розібратися з React Router", "completed": false },
//   { "id": "id-3", "text": "Пережити Redux", "completed": false }
// ]
// // Створити компоненти 
// TodoList - для відображення списку завдань, 
// TodoEditor - форма для додавання нового завдання, 
// Filter - інпут для фільтрування завдань 
// Info -  елементи для відображення Загальної кількості завдань та Кількості виконаних
// Стейт в App повинен виглядати так:
// state={
//     todos: initialTodos,
//     filter: '',
//   }


// Стейт в TodoEditor:
// state={
//         textValue: '',
//     }



// Стилі додати використовуючи бібліотеку styled-component. Обмежень в стилізаціїї немає.

const Form = styled.form`

`;
const Input = styled.input`

`;
class App extends Component {
  
  state = {
    todos: [
  { "id": "id-1", "text": "Вивчити основи React", "completed": true },
  { "id": "id-2", "text": "Розібратися з React Router", "completed": false },
  { "id": "id-3", "text": "Пережити Redux", "completed": false }
],
    filter: '',
  }
  formChange = evt => {
     this.setState({filter: evt.target.value}); 
   
};
    render() {
    return (
    <div className="App">
      <></>
      <Form>
      <Input></Input>
      </Form>
        <List todos={this.state.todos} />
    </div>
  );
  }
}
