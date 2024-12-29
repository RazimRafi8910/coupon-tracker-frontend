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
                <div className='row mt-1 mx-2'>
                    <h2>Dashboard</h2>
                    <hr />
                </div>
                <div className='row'>
                    <ManagerCard title={data.couponBooks} link={true} linkTo={'/manager/coupons'} label={'Total Coupon Books'} />
                    <ManagerCard title={data.students} link={true} linkTo={'/manager/students'} label={'Total Students'} />
                    <ManagerCard title={14} link={true} linkTo={'/manager/coordinator'} label={'Total Coordinator'} />
                    <ManagerCard title={15000} link={true} linkTo={'/manager/register'} label={'Collected Amount'} />
                </div>
            </div>
        </>
    )
}

export default ManagerHomePage