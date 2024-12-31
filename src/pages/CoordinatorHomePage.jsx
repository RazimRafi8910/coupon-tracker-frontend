import React from 'react'
import ManagerCard from '../components/cards/ManagerCard'

function CoordinatorHomePage() {
  return (
    <>
      <div className="container">
        <div className="row mt-3 text-center">
          <h2>Coordinator Page</h2>
        </div>
        <hr className='mb-2' />
        <div className="row mt-4 d-flex justify-content-center">
          <ManagerCard linkTo={'/coordinator/coupons'} link={true} title={15} label={'Avalabile Coupons'} />
          <ManagerCard linkTo={'/coordinator'} link={true} title={10} label={'Assigned Coupons'} />
        </div>
        <hr />
      </div>
    </>
  )
}

export default CoordinatorHomePage