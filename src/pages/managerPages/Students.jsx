import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBackendURL } from '../../utils/backendAPI';
import { toast } from 'react-toastify'
import Loader from '../../components/Loader';
import useFetch from '../../utils/useFetch';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const API = getBackendURL()

const schema = yup.object().shape({
    name: yup.string().required(),
    role: yup.number().required().default(1),
    studentClass: yup.string().required(),
    batch: yup.string().required(),
    email: yup.string().email().required(),
    dob: yup.date("invalid date").required(),
    regNo: yup.string().required(),
    username: yup.string().required(),
    phone: yup.number().required("number required"),
})

function Students() {
    const studentSearchRef = useRef()
    const [show, setShow] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const { data, loading, error } = useFetch('/manager/students')

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            role:1
        }
    })

    const addStudent = async (data) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${API}/manager/student/add`, {
                method: "POST",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json()
            
            if (!result.success) {
                toast.error(result.message || "Failed Add Student", {
                    position: 'top-center'
                })
            }

            toast.success(result.message, {
                position: 'top-center',
            })
            setShow(false)  
            
        } catch (error) {
            toast.error(error.message || "Failed Add Student", {
                position:'top-center'
            })
            
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearch = async () => {
        const studentId = studentSearchRef.current.value
        try {
            const response = await fetch(`${API}/manager/student/search?name=${studentId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                console.log(result.data)
            } else {
                toast.error(result.message || "An error occurred", {
                    position: 'top-center'
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to perform search', {
                position: 'top-center'
            })
        }
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }

    if (error) {
        toast.error(error, {
            position: 'top-center'
        })
    }

    if (loading) {
        return (
            <><Loader /></>
        )
    }

    return (
        <>
            <div className="container">
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Student</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(addStudent)}>
                        <Modal.Body>
                            <div className="row mb-3">
                                {errors.root && <p>{ errors.root.message }</p>}
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Name:</label>
                                    <input type="text" {...register('name')} className="border-secondary form-control" id="studentName" />
                                    {/* <input type="number" {...register('role')} className="border-secondary d-none form-control" id="role" /> */}
                                </div>
                                    {errors.name && <p className='text-danger'>{ errors.name.message }</p>}
                                    {errors.role && <p className='text-danger'>{ errors.role.message }</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Class:</label>
                                    <select className="form-select border-secondary" {...register("studentClass")} aria-label="Default select example"> 
                                        <option value="BCA">BCA</option>
                                        <option value="BBA">BBA</option>
                                        <option value="BCOM">BCOM</option>
                                    </select>
                                </div>
                                {errors.studentClass && <p className='text-danger'>{ errors.studentClass?.message }</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Batch:</label>
                                    <select className="form-select border-secondary" {...register("batch")} aria-label="Default select example">
                                        <option value="24-27">24-27</option>
                                        <option value="23-26">23-26</option>
                                        <option value="22-25">22-25</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">DOB:</label>
                                    <input type="date" {...register("dob")} className="form-control border-secondary" id="start" />
                                </div>
                                {errors.dob && <p className='text-danger'>{ errors.dob?.message }</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">reg No:</label>
                                    <input type="text" {...register("regNo")} className="form-control border-secondary" id="end" />
                                </div>
                                {errors.regNo && <p className='text-danger'>{ errors.regNo?.message }</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">username:</label>
                                    <input type="text" {...register("username")} className="form-control border-secondary" id="start" />
                                </div>
                                {errors.username && <p className='text-danger'>{ errors.username?.message }</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Email:</label>
                                    <input type="text" {...register("email")} className="form-control border-secondary" id="end" />
                                </div>
                                {errors.email && <p className='text-danger'>{ errors.email?.message }</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">phone:</label>
                                    <input type="number" {...register("phone")} className="form-control border-secondary" id="end" />
                                </div>
                                {errors.phone && <p className='text-danger'>{ errors.phone?.message }</p>}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type='button' onClick={handleClose}>Close</Button>
                            {isLoading ? <Loader /> : <Button variant="primary" type='submit'>Add Student</Button>}
                        </Modal.Footer>
                    </form>
                </Modal>
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
                        <input type="text" className="form-control" ref={studentSearchRef} placeholder="student name" aria-label="First name" />
                        <button className=' ms-1 btn btn-outline-dark' onClick={handleSearch}>search</button>
                        <button className='ms-1 btn btn-dark' onClick={handleShow}>Add</button>
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
                    {loading && <Loader />}
                </div>
            </div>
        </>
    )
}

export default Students