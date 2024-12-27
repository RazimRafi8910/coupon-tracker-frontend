import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../utils/useFetch'
import { Link } from 'react-router-dom'
import UserCouponTable from '../../components/UserCouponTable'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getBackendURL } from '../../utils/backendAPI'

const schema = yup.object().shape({
    bookNo: yup.number().required(),
    studentId: yup.number().required(),
    type: yup.number().required(),
    issuedBy: yup.string().required(),
})

const API = getBackendURL()

function StudentDetails() {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { studentid } = useParams();
    const { data, loading, error } = useFetch(`/manager/student/${studentid}`);
    const managerId = localStorage.getItem('id');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const assginCoupon = async (data) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${API}/manager/coupon/assign`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await response.json();
            if (result.success) {
                toast.success(result.message, {
                    position: 'top-center'
                })
                setShow(false)
                window.location.reload()
            } else {
                toast.error(result.message, {
                    position: 'top-center'
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to assign coupon', {
                position: 'top-center'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = async () => {
        setShow(false)
    }


    const handleShow = () => setShow(true);

    if (loading) {
        return (
            <><Loader /></>
        )
    }

    if (error) {
        toast.error(error, {
            position: 'top-center'
        }
        )
    }

    return (
        <>
            <div className="container">
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Coupon</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(assginCoupon)}>
                        <Modal.Body>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Book No :</label>
                                    <input type="number" {...register('bookNo')} className="border-secondary form-control" id="bookid" />
                                    {/* <button className='btn btn-outline-dark ms-1' type='button' onClick={handleSearch}>Search</button> */}
                                </div>
                                {errors.bookNo && <p className='text-danger'>{errors.bookNo.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Student Id :</label>
                                    <input type="number" {...register("studentId")} className="form-control border-secondary" value={data.studentId} id="start" />
                                </div>
                            </div>
                            <div className="row mb-3 d-none">
                                <div className="col-sm-12 d-flex">
                                    <input type="text" {...register("issuedBy")} className="form-control border-secondary d-hidden"
                                        value={managerId} id="end" />
                                    <input type='number' {...register("type")} className='form-control border-secondary d-hidden' value={1} />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type='button' onClick={handleClose}>Close</Button>
                            {isLoading ? <Loader /> : <Button variant="primary" type='submit'>Assign Coupon</Button>}
                        </Modal.Footer>
                    </form>
                </Modal>
                <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active"><Link to={'/manager/students'}>Students</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Student details</li>
                </ol>
                <div className="row mx-2">
                    <h2>Student details</h2>
                    <hr />
                </div>
                <div className="row mx-3">
                    <p>Reg No : <strong>51/bca/2024</strong> </p>
                    <div className='col'>
                        <p>Name : <strong>{data.name}</strong> </p>
                        <p>Student Id : <strong> {data.studentId} </strong> </p>
                    </div>
                    <div className="col ms-3">
                        <p>Class : <strong>{data.class}</strong> </p>
                        <p>Batch : <strong>{data.batch}</strong> </p>
                    </div>
                    <p>Phone : <strong>{data.phone}</strong> </p>
                    <p>Email : <strong> {data.email} </strong> </p>
                    <p>Coupons Assgined: <strong>{data.assignedCoupons}</strong> </p>
                </div>
                <div className="row mx-3 mt-2">
                    <div className='d-flex justify-content-between'>
                        <h4>Coupon Register</h4>
                        <button className='btn btn-outline-dark mb-1' onClick={handleShow}>Assign</button>
                    </div>

                    <hr />
                </div>
                <div className="row mx-2">
                    {!data.register ? <p className='text-center w-100'>No register found</p> : <UserCouponTable data={data.register} />}
                </div>
            </div>
        </>
    )
}

export default StudentDetails