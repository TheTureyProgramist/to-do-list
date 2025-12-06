import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { List } from './components/List/List';
const AppWrapper = styled.div``;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
const LeftCounts = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Input = styled.input`
width: 100%;
height: 60px;
padding-left: 12px;
padding-right: 64px;
border-radius: 8px;
&::placeholder { font-size: 13px; opacity: 0.8; }
box-shadow: rgba(0, 0, 0, 0.75) 5px 5px, rgba(0, 0, 0, 0.6) 10px 10px, rgba(0, 0, 0, 0.45) 15px 15px;
border: 5px solid black;
display: block;
box-sizing: border-box;
font-size: 16px;
`;
const AddButton = styled.button`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  height: 47px;
  color: green;
  padding: 0px 13px;
  background: yellow;
  border-right: 2px solid yellow;
 border-left: 3px solid yellow;
 border-top: 8px solid yellow;
 border-bottom: 8px solid yellow;
  border-radius: 6px;
  font-size: 30px;
  cursor: pointer;
  &:hover { background: skyblue; color: white; }
`;

const TimerText = styled.span`
  margin-left: 12px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AllTasks = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const Completed = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const Block = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

class Timer extends Component {
  state = {
    seconds: 0
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <TimerText>
        Час проведений у сайті: {this.state.seconds} с
      </TimerText>
    );
  }
}

class App extends Component {
  state = {
    todos: [
      { id: 'id-1', text: 'Вивчити основи React', completed: true },
      { id: 'id-2', text: 'Розібратися з React Router', completed: false },
      { id: 'id-3', text: 'Пережити Redux', completed: false},
      { id: 'id-4', text: 'Відсвяткувати по повній новий 2026рік', completed: false },
      { id: 'id-5', text: 'Здолати 9клас', completed: false },
      { id: 'id-6', text: 'Зробити щось нове', completed: false }  ],
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      try {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
      } catch (e) {
        console.error('Failed to save todos to localStorage:', e);
      }
    }
  }

  componentDidCatch(error, info) {
    console.error('Error caught in App (Error Boundary):', error, info);
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
      return { todos: newTodos, inputValue: '' };
    });
  };

  deleteTodo = id => {
    this.setState(prev => {
      const newTodos = prev.todos.filter(todo => todo.id !== id);
      return { todos: newTodos };
    });
  };

  toggleTodo = id => {
    this.setState(prev => {
      const newTodos = prev.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return { todos: newTodos };
    });
  };

  deleteAll = () => {
    this.setState({ todos: [] });
  };
  render() {
    const total = this.state.todos.length;
    const completedCount = this.state.todos.filter(t => t.completed).length;
    return (
      <AppWrapper className="App">
        <Block>
          <HeaderRow>
            <LeftCounts>
              <AllTasks>Всього задач: {total}</AllTasks>
              <Completed>Виконані задачі: {completedCount}</Completed>
            </LeftCounts>
            <Timer />
          </HeaderRow>
          <Form onSubmit={(e) => { e.preventDefault(); this.addTodo(); }}>
            {this.state.loading
              ? <Skeleton height={50} width="100%" />
              : (
                <InputWrapper>
                  <Input
                    placeholder="▣   Уведіть завдання яке вам треба"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                  />
                  <AddButton onClick={this.addTodo} aria-label="Add">+</AddButton>
                </InputWrapper>
              )
            }
          </Form>
          <List
            onDelete={this.deleteTodo}
            onToggle={this.toggleTodo}
            onClearAll={this.deleteAll}
            todos={this.state.todos}
            loading={this.state.loading}
          />
        </Block>
      </AppWrapper>
    );
  }
}
export default App;