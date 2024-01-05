import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { newUsers } from '../store/userslice/userslice';
import { useDispatch } from 'react-redux';

const Newuser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const HandleSubmit = (e) => {
        const user = { name, email, phone}
            dispatch(newUsers(user))
        navigate('/');
    };

    return (
        <>
            <div className="container ">
                <div className="row ">
                    <div className="card">
                        <div className="card-title ">
                            <h1 className="text-center ">NEW USER ADD DATA</h1>
                        </div>
                        <div className="card-body">
                            <div className="offset-lg-3 col-lg-6">
                                <form onSubmit={HandleSubmit}>
                                    <div className="row">
                                        <div className="container ">
                                            <div className="col-lg-12">
                                                <div className="form-group ">
                                                    <label className="mb-1">NAME</label>
                                                    <input
                                                        value={name}
                                                        onChange={e => setName(e.target.value)}
                                                        type="text"
                                                        className="form-control" required />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group ">
                                                    <label className="mb-1">EMAIL</label>
                                                    <input
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        type="text"
                                                        className="form-control" required />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group ">
                                                    <label className="mb-1">PHONE</label>
                                                    <input
                                                        value={phone}
                                                        onChange={e => setPhone(e.target.value)}
                                                        type="text"
                                                        className="form-control" required />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-2">
                                                <div className="form-group">
                                                    <button type="submit"
                                                        className="btn  me-2" >Submit</button>
                                                    <Link
                                                        to="/"
                                                        className="btn  ">Go Back</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newuser
