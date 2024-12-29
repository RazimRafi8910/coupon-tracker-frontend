import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../utils/useFetch';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import CoordinatorTable from '../../components/CoordinatorTable';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Modal,Button } from 'react-bootstrap';
import { getBackendURL } from '../../utils/backendAPI';
import UserDetailsCard from '../../components/cards/UserDetailsCard';

const schema = yup.object().shape({
    bookNo: yup.number().required(),
    studentId: yup.number().required(),
});

const api = getBackendURL()

function CoordinatorDetail() {
    const { coordinatorId } = useParams();
    const [show, setShow] = useState(false);
    const { data, loading, error, setLoading } = useFetch(`/manager/coordinator/${coordinatorId}`);

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const assginCoupon = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${api}/manager/coordinator/${coordinatorId}/assign`, {
                method: "POST",
                headers: {
                    "Content-type": 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed submit");
            }
            if (result.success) {
                toast.success(result.message, {
                    position: 'top-center'
                });
            } else {
                toast.error(result.message, {
                    position: 'top-center'
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Failed to Submit", {
                position: "top-center",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    if (error) {
        toast.error(error.message || "Failed fetch data", {
            position: "top-center"
        })
    }

    return (
        <>
            <div className="container">
                <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active"><Link to={'/manager/coordinator'}>Coordinator</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">details</li>
                </ol>
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Coupon</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(assginCoupon)}>
                        <Modal.Body>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-4">Book No :</label>
                                    <input type="number" {...register('bookNo')} className="border-secondary form-control" id="bookid" />
                                </div>
                                {errors.bookNo && <p className='text-danger'>{errors.bookNo.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-4">Coordinator Id :</label>
                                    <input type="number" {...register("studentId")} className="form-control border-secondary" value={data.studentId} id="start" />
                                    {errors.studentId && <p className='text-danger'>{errors.studentId.message}</p>}
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type='button' onClick={handleClose}>Close</Button>
                            {loading ? <Loader /> : <Button variant="primary" type='submit'>Assign Coupon</Button>}
                        </Modal.Footer>
                    </form>
                </Modal>
                <div className="row mx-2">
                    <h2>Coordinator details</h2>
                    <hr />
                </div>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="text-danger">Failed to load data</p>
                ) : (
                    <>
                                <div className="row mx-3">
                                    <UserDetailsCard coordinator={true} data={data}/>
                                </div>

                        {/* Coupon Register */}
                        <div className="row mx-3 mt-2">
                            <div className="d-flex justify-content-between">
                                <h4>Coordinator Register</h4>
                                <button className="btn btn-outline-dark mb-1" onClick={handleShow}>Assign</button>
                            </div>
                            <hr />
                                </div>
                        <div className="row mx-2 mb-4">
                            {data.coordinatorRegister && data.coordinatorRegister.couponsAssigend.length > 0 ? (
                                <CoordinatorTable data={data.coordinatorRegister.couponsAssigend} />
                            ) : (
                                <p className="text-center w-100">No register found</p>
                            )}
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default CoordinatorDetail