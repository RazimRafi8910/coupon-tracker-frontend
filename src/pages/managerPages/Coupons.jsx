import React, { useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Loader from '../../components/Loader'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom';
import { getBackendURL } from '../../utils/backendAPI';

const schema = yup.object().shape({
    bookId: yup.number().required(),
    leaveStart: yup.number().required(),
    leaveEnd: yup.number().required()
})

// gets the backend url for production and local
  const api = getBackendURL()

function Coupons() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const searchRef = useRef()
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function getInitailData() {
            setLoading(true)
            try {
                const response = await fetch(`${api}/manager/coupon`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include',
                })
                const result = await response.json();
                if (result.success) {
                    setCoupons(result.data)
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch Coupons', {
                    position: 'top-center'
                })
            } finally {
                setLoading(false)
            }
        }
        getInitailData()
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const addCoupon = async (data) => {
        setLoading(true)
        try {
            const response = await fetch(`${api}/manager/coupon/add`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const result = await response.json()
            if (result.success) {
                setShow(false)
                setCoupons((prev)=> [...prev,result.newCoupon])
                toast.success(result.message, {
                    position: 'top-right'
                })
            } else {
                toast.error(result.message, {
                    position: 'top-right'
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed Search', {
                position: 'top-center'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        setLoading(true)
        const searchNo = searchRef.current.value
        try {
            const response = await fetch(`${api}/manager/coupon/${searchNo}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setCoupons(result.data)
            } else {
                toast.error(result.message, {
                    position: 'top-right'
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed Search', {
                position: 'top-center'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleClose = async () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="container">
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Coupons</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(addCoupon)}>
                        <Modal.Body>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Book No :</label>
                                    <input type="number" {...register('bookId')} className="border-secondary form-control" id="bookid" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Leaves start:</label>
                                    <input type="number" {...register("leaveStart")} className="form-control border-secondary" id="start" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-3">Leaves end:</label>
                                    <input type="number" {...register("leaveEnd")} className="form-control border-secondary" id="end" />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type='button' onClick={handleClose}>Close</Button>
                            {loading ? <Loader /> : <Button variant="primary" type='submit'>Add Coupon</Button>}
                        </Modal.Footer>
                    </form>
                </Modal>

                {/* page content starts */}
                <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Coupon</li>
                </ol>
                <div className="mx-2 row">
                    <h2>Coupons</h2>
                    <hr />
                </div>
                <div className='row mx-2'>
                    <div className='d-flex mb-3'>
                        <input type="text" className="form-control" ref={searchRef} placeholder="Book no" aria-label="First name" />
                        <button className=' ms-1 btn btn-outline-dark' onClick={handleSearch}>search</button>
                        <button className='ms-1 btn btn-dark' onClick={handleShow}>Add</button>
                    </div>
                    <div>
                        <p className='text-muted m-0'>total books:</p>
                    </div>

                </div>
                <div className='row mx-2'>
                    <table className="table table-responsive-sm">
                        <thead>
                            <tr>
                                {/* <th scope="col">SI</th> */}
                                <th scope="col">Book No</th>
                                <th scope="col">start</th>
                                <th scope="col">end</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons && !loading &&
                                coupons.map((item, index) => (
                                    <tr key={index}>
                                        {/* <th scope="row">{ index + 1 }</th> */}
                                        <td>{item.bookId}</td>
                                        <td>{item.leaveStart}</td>
                                        <td>{item.leaveEnd}</td>
                                        <td>{item.status == 0 ? "not assigned" : "assigned"}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {coupons.length === 0 && !loading && <p className='text-center'>Conpons not found</p>}
                    {loading && <Loader />}
                </div>
            </div>
        </>
    )
}

export default Coupons