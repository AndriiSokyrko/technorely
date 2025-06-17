import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {observer} from "mobx-react-lite";
import {FaEdit, FaTrash} from "react-icons/fa";
import {Context} from "../index";
import {deleteUser} from "../http/userAPI";
import toast from "react-hot-toast";

const UserItem = observer(({userData, onEdit}) => {
    const {user} = useContext(Context)
    const handleDelete = (id) => {
        if(id===user.getCurrentUser.id){
            toast.error("Нельзя удалить текущего пользователя")
            return
        }
        deleteUser(id).then(e => {
            user.setFlagRedrawUser(2)
            toast.success("Успешно удалено!")
        }).catch(e => {
            toast.error("Ошибка удаления!")
        })

    }
    const handleEdit = (userData) => {
        onEdit(userData)
    }
    return (
        <>
            <Col md={3} className={"w-30 mt-3 d-flex align-items-stretch justify-items-between border-black"}>
            <Card style={{width: "300px", height: "350px", cursor: 'pointer'}} border={"black"}
                  className="p-2 d-flex justify-content-between">
                <Image width="100%" height="50%" src={process.env.REACT_APP_API_URL + userData.user_info.img}/>
                <div className="text-black-100 mt-1 d-flex flex-column   overflow-x-hidden">
                    <div style={{fontSize: 20, fontWeight: "bold"}}>{userData.name}...</div>
                    <div className="d-flex flex-row"><p>Email: {userData.email}$</p></div>
                    <div className="d-flex flex-row"><p>Role: {userData.role}$</p></div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <FaEdit
                        className="text-primary"
                        style={{cursor: 'pointer', marginRight: '10px'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(userData);
                        }}
                    />
                    <FaTrash
                        className="text-danger"
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(userData.id);
                        }}
                    />
                </div>
            </Card>

        </Col>

        </>

    );
});

export default UserItem;
