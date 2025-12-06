import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
const Item = styled.li`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.75) 5px 5px, rgba(0, 0, 0, 0.6) 10px 10px, rgba(0, 0, 0, 0.45) 15px 15px;
  border: 1px solid black;
  gap: 15px;
  width: 100%;
  border-radius: 5px;
  border: solid black 5px;
  padding-left: 8px;
`;
const Button = styled.button`
  padding: 0px 15px;
  background: red;
  &:hover { background: darkviolet; }
  color: white;
  border: 5px solid red;
  font-size: 35px;
  margin-left: auto;
  cursor: pointer;
`;
const ListType = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 98%;
`;
export const List = ({ todos, onDelete, onToggle, loading }) => {
  return (
    <ListType>
      {loading
        ? <Skeleton height={60} width="100%" />
        : null
      }
      {todos.map(todo => (
        <Item key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
          </span>
          <Button onClick={() => onDelete(todo.id)}>-</Button>
        </Item>
      ))}
    </ListType>
  );
};