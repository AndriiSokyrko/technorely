import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {getUsers} from "../http/userAPI";
import EditProfile from "./modals/EditProfile";
import UserItem from "./UserItem";
import {getRoles} from "../http/roleApi";

const UserList = observer(() => {
    const {user} = useContext(Context)
    const [userVisible, setUserVisible] = useState(false)
    const [userId, setUserId] = useState(user.getCurrentUser.id)

    const handleEdit = (userId) => {
        setUserId(userId)
        setUserVisible(true)
    }

    useEffect(() => {
        getUsers(user.page, user.limit).then(data => {
                user.setUsers(data.rows)
                user.setTotalCount(data.count)
            }
        )
        user.setFlagRedrawUser(0)
    }, [ user.page, user.flagRedrawUser])

return (
        <Row className="d-flex">
            {user.getUsers.map(userData =>
                 <UserItem key={userData.id} userData={userData} onEdit={handleEdit}/>
            )}
            <EditProfile show={userVisible} onHide={() => setUserVisible(false)} userId={userId}/>
        </Row>
    );
});

export default UserList;
