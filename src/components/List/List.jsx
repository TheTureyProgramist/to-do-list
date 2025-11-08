import styled from "styled-components"
import { todos } from '../../App';
const Item = styled.li`
border: black;
display: flex;
gap: 200px;
`;
const Button = styled.button`
padding: 15px 30px;
background-color: green;
color: white;
`;
const ListType = styled.ul`
padding: 20px;
`;
export const List = ({}) => {
    return <ListType>
        <Item>
            <input type="checkbox"></input>
                  {todos.map(todo => (
            <div key={todo.id}>
                <span>{todo.text}</span>
            </div>
        ))}
            <Button>Delete</Button>
        </Item>
    </ListType>
}