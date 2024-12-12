import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import SimpleCard from '../components/cards/SimpleCard'
import Button from 'react-bootstrap/Button';

function UserHomePage() {
  return (
    <>
      <div className='container'>
        <div className="row mt-4 text-center">
          <h1>Your Coupon</h1>
        </div>
        <hr className='mb-0' />
        <div className="row text-center">
          <div className='col-12 d-flex justify-content-center'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Coupon</Form.Label>
              <Form.Control type="number" className='w-100 px-4' placeholder="Number of leaves murich" />
              </Form.Group>
              <Button variant="primary" className='px-3' type="submit">Add</Button>
          </Form>
          </div>
        </div>
        <hr className='mb-4' />
        <div className="row">
          <div className='text-center'>
            <h2 className='text-success'>Rs 1500</h2>
            <h4>Collected amount</h4>
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-center">
          <SimpleCard title={6} label={'Coupon Book Count'} />
          <SimpleCard title={10} label={'Leaves Taken'} />
          <SimpleCard title={290} label={'Leaves Left'} />
          <SimpleCard title={1000} label={'Given Amount'} />
          <SimpleCard title={500} label={'Due Amount'} />
        </div>
      </div>
    </>
  )
}

export default UserHomePage