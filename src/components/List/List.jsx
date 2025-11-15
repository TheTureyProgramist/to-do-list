import styled from "styled-components";
const Item = styled.li`
display: flex;
align-items: center;
box-shadow: rgba(0, 0, 0, 0.75) 5px 5px, rgba(0, 0, 0, 0.6) 10px 10px, rgba(0, 0, 0, 0.45) 15px 15px;
border: 1px solid black;
gap: 15px;
width: 100%;
border-radius: 5px;
border: solid black 5px;
`;
const Button = styled.button`
padding: 15px 50px;
background: green;
&:hover { background: darkviolet; }
color: white;
margin-left: auto;
cursor: pointer;
`;
const ListType = styled.ul`
display: flex;
flex-direction: column;
gap: 25px;
`;
const ButtonPlus = styled.button`
padding-top: 5px;
padding-bottom: 5px;
background: yellow;
box-shadow: rgba(0, 0, 0, 0.75) 5px 5px, rgba(0, 0, 0, 0.6) 10px 10px, rgba(0, 0, 0, 0.45) 15px 15px;
border: 5px solid black;
width: 100%;
border-radius: 5px;
display: block;
&:hover { background: skyblue; color: white; }
color: red;
cursor: pointer;
font-size: 35px;
`;
export const List = ({ todos, onDelete, onToggle, onAdd }) => {
return (
<ListType>
<ButtonPlus onClick={onAdd}>+</ButtonPlus>
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
<Button onClick={() => onDelete(todo.id)}>Delete</Button>
</Item>
))}
</ListType>
);
};