import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBackendURL } from '../../utils/backendAPI';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader';
import useFetch from '../../utils/useFetch';

const API = getBackendURL()

function Students() {
    const studentSearchRef = useRef()
    const {data,loading,error} = useFetch('/manager/students')

    if (error) {
        toast.error(error, {
            position:'top-center'
        })
    }

    if (loading) {
        return (
            <><Loader/></>
        )
    }

    return (
        <>
            <div className="conatiner">
                {/* page content starts */}
                <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Coupon</li>
                </ol>
                <div className="row mx-2">
                    <h2>students</h2>
                    <hr />
                </div>
                <div className="row mx-2">
                    <div className='d-flex mb-3'>
                        <input type="text" className="form-control" ref={studentSearchRef} placeholder="student id" aria-label="First name" />
                        <button className=' ms-1 btn btn-outline-dark'>search</button>
                        <button className='ms-1 btn btn-dark'>Add</button>
                    </div>
                    <div>
                        <p className='text-muted m-0'>total students:</p>
                    </div>
                </div>
                <div className="row mx-2">
                    <table className="table text-center table-responsive-sm">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Assigned Coupons</th>
                                <th scope="col">details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                let role
                                if (item.role == 2) {
                                    role = 'Coordinator'
                                } else if (item.role == 3) {
                                    role = 'Manager'
                                } else {
                                    role = 'User'
                                }
                                return (
                                    <tr key={index}>
                                    <th scope="row">{item.studentId}</th>
                                    <td>{item.name}</td>
                                    <td>{role}</td>
                                        <td>{item.assignedCoupons}</td>
                                        <td><Link to={`/manager/student/${item.studentId}`} className='btn btn-outline-dark'>View</Link></td>
                                </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                    {loading && <Loader/>}
                </div>
            </div>
        </>
    )
}

export default Students