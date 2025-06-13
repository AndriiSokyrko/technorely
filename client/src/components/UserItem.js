import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {USER_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {FaEdit, FaTrash} from "react-icons/fa";
import {deleteCompany} from "../http/companyAPI";
import {Context} from "../index";
import IncomeChart from "./IncomeChart";
import {deleteUser} from "../http/userAPI";

const UserItem = observer(({users, onEdit}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const handleDelete = (id) => {
        deleteUser(id).then(e => {
            alert('Пользователь удален')
            user.setFlagRedraw(2)
        }).catch(e=>alert('Ошибка удаления'))

    }
    const handleEdit = (id) => {
        onEdit(id)
    }

    return (
        <>
            <Col md={3} className={"w-30 mt-3 d-flex align-items-stretch justify-items-between border-black"}
                onClick={() => navigate(USER_ROUTE + '/' + users.id)}>
            <Card style={{width: "300px", height: "350px", cursor: 'pointer'}} border={"black"}
                  className="p-2 d-flex justify-content-between">
                <Image width="100%" height="50%" src={process.env.REACT_APP_API_URL + users.user_info.img}/>
                <div className="text-black-100 mt-1 d-flex flex-column   overflow-x-hidden">
                    <div style={{fontSize: 20, fontWeight: "bold"}}>{users.name}...</div>
                    <div className="d-flex flex-row"><p>Email: {users.email}$</p></div>
                    <div className="d-flex flex-row"><p>Role: {users.role}$</p></div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <FaEdit
                        className="text-primary"
                        style={{cursor: 'pointer', marginRight: '10px'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(users.id);
                        }}
                    />
                    <FaTrash
                        className="text-danger"
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(users.id);
                        }}
                    />
                </div>
            </Card>

        </Col>

        </>

    );
});

export default UserItem;
