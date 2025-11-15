import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
import { List } from './components/List/List';
const Input = styled.input`
  width: 95%;
  height: 100px;
  padding-left: 50px;
  border-radius: 8px;
  display: flex;
  margin-top:20px;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const TextBlock = styled.div`
  justify-content: space-evenly;
  display: flex;
`;
const AllTasks = styled.h2`
  display: block;
`;
const Completed = styled.h2`
  display: block;
`;
const Block = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;
class App extends Component {
  state = {
    todos: [
      { id: 'id-1', text: 'Вивчити основи React', completed: true },
      { id: 'id-2', text: 'Розібратися з React Router', completed: false },
      { id: 'id-3', text: 'Пережити Redux', completed: false }
    ],
    filter: '',
    inputValue: ''
  };
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  addTodo = () => {
    if (this.state.inputValue.trim() === '') return;
    const newTodo = {
      id: Date.now().toString(),
      text: this.state.inputValue,
      completed: false
    };
    this.setState(prev => ({
      todos: [...prev.todos, newTodo],
      inputValue: ''
    }));
  };
  deleteTodo = id => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.id !== id)
    }));
  };
  toggleTodo = id => {
    this.setState(prev => ({
      todos: prev.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };
  render() {
    return (
      <div className="App">
        <Block>
          <TextBlock>
            <AllTasks>Всього завданнь:</AllTasks>
            <Completed>Виконані завдання:</Completed>
          </TextBlock>
          <Form>
            <Input
              placeholder="Уведіть завдання яке вам треба"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
          </Form>
          <List
            onDelete={this.deleteTodo}
            onToggle={this.toggleTodo}
            onAdd={this.addTodo}
            todos={this.state.todos}
          />
        </Block>
      </div>
    );
  }
}
export default App;