import React from 'react';
import ManagerCard from '../components/cards/ManagerCard';
import Loader from '../components/Loader';
import useFetch from '../utils/useFetch';
import { toast } from 'react-toastify';

function ManagerHomePage() {
    const { data, loading, error } = useFetch('/manager/dashboard')

    if (error) {
        toast.error(error, {
            position: 'top-center'
        })
    }

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className='container'>
                <ol className="breadcrumb mx-3 mb-0">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
                <div className='row mt-1 mx-2'>
                    <h2>Dashboard</h2>
                    <hr />
                </div>
                <div className='row'>
                    <ManagerCard title={data.couponBooks} link={true} linkTo={'/manager/coupons'} label={'Total Coupon Books'} />
                    <ManagerCard title={data.students} link={true} linkTo={'/manager/students'} label={'Total Students'} />
                    <ManagerCard title={14} link={true} linkTo={'/manager/coordinator'} label={'Total Coordinator'} />
                    <ManagerCard title={15000} label={'Amount Collected'} />
                </div>
            </div>
        </>
    )
}

export default ManagerHomePage