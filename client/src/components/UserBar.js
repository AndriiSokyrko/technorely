import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const UserBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <ListGroup>
            {user.getUsers.map(item =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={user.id === item.id}
                    onClick={() => console.log(item)}
                    key={user.id}
                >
                    {user.email}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default UserBar;
