import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll, deleteUser, editUsers, fetchUsers } from '../store/userslice/userslice';
import { Link, useNavigate } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';


const Userdetail = () => {

    const [userList, setUserList] = useState([])
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state?.user)

    useEffect(() => {
        setUserList(users)
    }, [users])


    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    const handleEdit = (id) => {
        let url = `/edituser/${id}`
        navigate(`/edituser/${id}`)
    }
    const onDelete = (e) => {
        dispatch(clearAll(userList))
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };





    const onSearch = (e) => {
        setSearchText(e?.target?.value);
    }

    const filterData = userList?.filter((data) => data?.name?.toLowerCase().includes(searchText.toLowerCase()))
    const mainData = searchText?.length > 0 ? filterData : userList;


    return (
        <>
            {loading ? <text> Loading</text> : <div className="container">
                <div className="content">
                    <div className="admin-table">
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center align-content-center ">
                                <div className="admin-subtitle text-center fw-bold mt-4">
                                    <h2 className='bg-secondary text-white p-3'>LIST OF USER DETAILS</h2>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center align-content-center">
                                <Link type='button' to="/newuser" className="btn btn-primary m-4 fw-bold ">
                                    ADD NEW
                                </Link>
                                <div className='col-md-4'>
                                    <input
                                        className="form-control  mt-4"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={(e) => { onSearch(e) }}
                                        style={{ width: "200px" }}
                                    />
                                </div>
                            </div>

                            <div className="card-body ">
                                <table className="table  table-bordered">
                                    <thead className='fw-bold text-center '>
                                        <tr>
                                            <td className="bg-info text-dark">ID</td>
                                            <td className="bg-info text-dark">NAME</td>
                                            <td className="bg-info text-dark">EMAIL</td>
                                            <td className="bg-info text-dark">PHONE</td>
                                            <td className="bg-info text-dark">ACTION</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {mainData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item, index) => {

                                            return <tr key={index} className="text-center fw-bold">
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.phone}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-success  fw-bold text-white'
                                                        type='submit' onClick={() => handleEdit(item?.id)}>
                                                        EDIT
                                                    </button>
                                                    <button onClick={() => dispatch(deleteUser(item?.id))}
                                                        className='btn btn-danger fw-bold text-white mx-2 '>DELETE</button>

                                                </td>
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <TablePagination color="primary"
                            component="div"
                            count={userList?.length || 0}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </div>
                    </div>
                </div>

                <hr />

                <div className='d-flex justify-content-center align-align-items-center '>
                    <button
                        className='btn btn-danger fw-bold '
                        onClick={(e) => onDelete(e)}> DELETE ALL </button>
                </div>
            </div>
            }

        </>
    )
}




export default Userdetail