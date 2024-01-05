import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUsers, fetchUsers } from '../store/userslice/userslice';
import { Link, useNavigate } from "react-router-dom";


const Userdetail = () => {

    const [userList,setUserList]=useState([])
    console.log('userList', userList)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state?.user)

    useEffect(()=>{
        setUserList(users)
    },[users])


    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    const handleEdit = (id) => {
        let url = `/edituser/${id}`
        navigate(`/edituser/${id}`)
    }

    return (
        <>
            {loading ? <text> Loading</text> : <div className="container">
                <div className="content">
                    <div className="admin-table">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="admin-subtitle text-center fw-bold mt-4">
                                    <h2>LIST OF USER DETAILS</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Link type='button' to="/newuser" className="m-4">
                                    ADD NEW
                                </Link>
                            </div>

                            <div className="card-body ">
                                <table className="table table-bordered ">
                                    <thead className=" fw-bold  text-center ">
                                        <tr className="bg-primary text-white">
                                            <td>ID</td>
                                            <td>NAME</td>
                                            <td>EMAIL</td>
                                            <td>PHONE</td>
                                            <td>ACTION</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {userList && userList.map((item, index) => {

                                            return <tr key={index} className="text-center fw-bold">
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.phone}</td>
                                                <td>
                                                    <button onClick={() => dispatch(deleteUser(item?.id))}>DELETE</button>
                                                    <button type='submit' onClick={() => handleEdit(item?.id)}>
                                                        EDIT
                                                    </button>
                                                </td>
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </>
    )
}




export default Userdetail

