import React from 'react';
import ManagerCard from '../components/cards/ManagerCard';

function ManagerHomePage() {
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
                    <ManagerCard title={110} link={true} linkTo={'/manager/coupons'} label={'Total Coupon Books'} />
                    <ManagerCard title={140} link={true} linkTo={'/manager/students'} label={'Total Students'} />
                    <ManagerCard title={15000} label={'Amount Collected'} />
                </div>
            </div>
        </>
    )
}

export default ManagerHomePage