import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { editUsers, fetchSingleUsers,  } from '../store/userslice/userslice';
import { useDispatch, useSelector } from 'react-redux';

const Edituser = () => {

    const { id } = useParams()
    const { singleUser } = useSelector((state) => state?.user)
    console.log('singleUser', singleUser)
    console.log('id', id)
    const { handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm()


    const query = useLocation();
    const userOldData = query?.state?.data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [id,setId]=useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();


    useEffect(() => {
        if (singleUser) {
            console.log('singleUser', singleUser)
            setValue("name",singleUser?.name)
            setValue("email",singleUser?.email)
            setValue("phone",singleUser?.phone)
        }
    }, [singleUser])
    useEffect(() => {
        dispatch(fetchSingleUsers(id))
    }, [id]);



    const handleUpdate = (value) => {
        value = {
           ...value,
            id: singleUser?.id
        }
        // dispatch(editUsers(value))
        navigate('/');

    }
    return (
        <>
            <div className="container ">
                <div className="row ">
                    <div className="card">
                        <div className="card-title ">
                            <h1 className="text-center ">USER EDIT DATA</h1>
                        </div>
                        <div className="card-body">
                            <div className="offset-lg-3 col-lg-6">
                                <form onSubmit={handleSubmit(handleUpdate)}>
                                    <div className="row">
                                        <div className="container ">
                                            <div className="col-lg-12">
                                                <div className="form-group ">
                                                    <label className="mb-1">NAME</label>
                                                    <input {...register("name", { required: true })} />
                                                    {errors.name && <span>This field is required</span>}
                                                   
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group ">
                                                    <label className="mb-1">EMAIL</label>
                                                    <input {...register("email", { required: true })} />
                                                    {errors.email && <span>This field is required</span>}
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group ">
                                                    <label className="mb-1">PHONE</label>
                                                    <input {...register("phone", { required: true })} />
                                                    {errors.phone && <span>This field is required</span>}
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-2">
                                                <div className="form-group">
                                                    <input type="submit"
                                                        className="btn" value="submit" />
                                                    <Link
                                                        to="/"
                                                        className="btn">Go Back</Link>
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

export default Edituser
