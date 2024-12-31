import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';
import useFetch from '../../utils/useFetch';
import { toast } from 'react-toastify';
import apiFetch from '../../utils/apiFetch';

function Coupons() {
    const [coupons, setCoupons] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [usersFound, setUserFound] = useState(null);
    const [userFindError, setUserFindError] = useState(null);
    const searchRef = useRef();
    const userFindRef = useRef();
    const { data, loading,setLoading, error } = useFetch(`/coordinator/coupons`);

    useEffect(() => {
        if (data) {
            setCoupons(data);
            setUserFindError('')
            setUserFound(null)
        }
    }, [data]);


    const handleSearch = async () => {
        setLoading(true);
        const searchNo = searchRef.current.value;
        if (!searchNo) {
            setCoupons(data);
            setLoading(false);
            return
        }
        const update = data.couponsAssigend.filter((item) => (item.bookId == searchNo));
        setCoupons({ ...data, couponsAssigend: update });
        setLoading(false);
    }

    const handleFindUser = async () => {
        const name = userFindRef.current.value;
        try {
            const { result } = await apiFetch(`/coordinator/user?name=${name}`, 'GET');
            if (!result) {
                setUserFindError("user not found");
            }
            console.log(result)
            setUserFound(result.data)
        } catch (error) {
            console.log(error);
            toast.error("Failed Fetch, HTTP Error!");
        }
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (error) {
        return (
            <div className="container">
                <div className="row mx-3">
                    <p className='text-danger'>{error}</p>
                    <Link to={'/coordinator'}>Go back</Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return ( 
            <Loader/>
        )
    }

    return (
        <>
            <div className="container">
            <Modal centered show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Coupon</Modal.Title>
                    </Modal.Header>
                    <form >
                        <Modal.Body>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-4">Book No :</label>
                                    <input type="number" className="border-secondary form-control" id="bookid" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-4">Student Name :</label>
                                    <input type="text" ref={userFindRef} className="form-control border-secondary" id="start" />
                                    {userFindError && <p className='text-danger' >{ userFindError }</p>}
                                    <Button variant='dark' onClick={handleFindUser} className='ms-1'>Find</Button>
                                </div>
                                {usersFound && 
                                    <div className="col-sm-12 d-flex">
                                    <label className="col-form-label col-4"> select student </label>
                                        <select className="form-select border-secondary" aria-label="Default select example">
                                            {usersFound.map((item, index) => (                                                
                                                <option key={index} value={item.studentId}>ID : { item.studentId }, Name : {item.name.toUpperCase()} {" "} </option>
                                            ))}
                                    </select>
                                </div>
                                 }
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type='button' onClick={handleCloseModal}>Close</Button>
                            {loading ? <Loader /> : <Button variant="primary" type='submit'>Assign Coupon</Button>}
                        </Modal.Footer>
                    </form>
                </Modal>
                {/* page content starts */}
                <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/coordinator'}>Coordinator</Link></li>
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
                    </div>
                    <div>
                        <p className='text-muted m-0'>Total books:{ coupons?.couponsAssigend?.length || 0 }</p>
                    </div>

                </div>
                <div className='row mx-2'>
                    <table className="table table-responsive-sm">
                        <thead className='text-center'>
                            <tr>
                                {/* <th scope="col">SI</th> */}
                                <th scope="col">Book No</th>
                                <th scope="col">start</th>
                                <th scope="col">end</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {coupons && !loading &&
                                (coupons.couponsAssigend || [] ).map((item, index) => {
                                    const statusMap = {
                                        0:'not assigned',
                                        1:'assigned',
                                        2:'Pending',
                                        3:'completed',
                                        4:'recived',
                                    }
                                    return (
                                        <tr key={index}>
                                        <td>{item.bookId}</td>
                                        <td>{item.leaveStart}</td>
                                        <td>{item.leaveEnd}</td>
                                        <td>{ item.status == 1 ? <button  onClick={handleShowModal} className='btn btn-outline-dark py-1'>Assgin</button> : statusMap[item.status] }</td>                                        
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {coupons && coupons.length === 0 && !loading && <p className='text-center'>Conpons not found</p>}
                    {loading && <Loader />}
                </div>
            </div>
        </>
    )
}

export default Coupons