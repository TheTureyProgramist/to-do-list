import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { List } from './components/List/List';
// import { Err } from './components/Err.jsx/Err.jsx';
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
    inputValue: '',
    hasError: false,
    loading: true
  };
  componentDidMount() {
    try {
      const saved = localStorage.getItem('todos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.setState({ todos: parsed });
        }
      }
    } catch (e) {
      console.error('Failed to load todos from localStorage:', e);
    } finally {
      this.setState({ loading: false });
    }
  }
  componentDidCatch(error, info) {
    console.error('Error caught in App (Error Boundary):', error, info);
    this.setState({ hasError: true });
  }
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
    this.setState(prev => {
      const newTodos = [...prev.todos, newTodo];
      try { localStorage.setItem('todos', JSON.stringify(newTodos)); } catch (e) { console.error(e); }
      return { todos: newTodos, inputValue: '' };
    });
  };
  deleteTodo = id => {
    this.setState(prev => {
      const newTodos = prev.todos.filter(todo => todo.id !== id);
      try { localStorage.setItem('todos', JSON.stringify(newTodos)); } catch (e) { console.error(e); }
      return { todos: newTodos };
    });
  };
  toggleTodo = id => {
    this.setState(prev => {
      const newTodos = prev.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      try { localStorage.setItem('todos', JSON.stringify(newTodos)); } catch (e) { console.error(e); }
      return { todos: newTodos };
    });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="App">
          <Block>
            <TextBlock>
              <AllTasks>Всього завданнь:</AllTasks>
              <Completed>Виконані завдання:</Completed>
            </TextBlock>
            <div style={{ color: 'red', marginTop: 20 }}>
              Сталася помилка. Інтерфейс деактивовано.
            </div>
          </Block>
        </div>
      );
    }
    return (
      <div className="App">
        <Block>
          <TextBlock>
            <AllTasks>Всього завданнь:</AllTasks>
            <Completed>Виконані завдання:</Completed>
          </TextBlock>
          <Form>
            {this.state.loading
              ? <Skeleton height={100} width="95%" />
              : (
                <Input
                  placeholder="Уведіть завдання яке вам треба"
                  value={this.state.inputValue}
                  onChange={this.handleInputChange}
                />
              )
            }
          </Form>
          <List
            onDelete={this.deleteTodo}
            onToggle={this.toggleTodo}
            onAdd={this.addTodo}
            todos={this.state.todos}
            loading={this.state.loading}
          />
        </Block>
      </div>
    );
  }
}
export default App;