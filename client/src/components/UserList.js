import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {getUsers} from "../http/userAPI";
import EditProfile from "./modals/EditProfile";
import UserItem from "./UserItem";

const CompanyList = observer(() => {
    const {user} = useContext(Context)
    const [userVisible, setUserVisible] = useState(false)
    const [userId, setUserId] = useState(false)

    const handleEdit = (id) => {
        setUserId(id)
        setUserVisible(true)
    }

    useEffect(() => {
        getUsers(user.page, user.limit).then(data => {
                user.setUsers(data.rows)
                user.setTotalCount(data.count)

            }
        )
        user.setFlagRedraw(0)
    }, [ user.page, user.getFlagRedraw])
    return (
        <Row className="d-flex">
            {user.getUsers.map(user =>
                 <UserItem key={user.id} users={user} onEdit={handleEdit}/>
            )}
            <EditProfile show={userVisible} onHide={() => setUserVisible(false)} userId={userId}/>
        </Row>
    );
});

export default CompanyList;
