import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';

function CoordinatorTable({ data }) {
  return (
    <>
           <Table className='text-center' variant='secondary' responsive bordered hover>
      <thead>
        <tr>
          <th>Coupon No</th>
          <th>Amount</th>
          <th>leaf Start</th>
          <th>leaf End</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>

        {data?.map((item, index) => {
          let status
          if (item.status == 0) {
            status = 'not assigned'
          } else if(item.status == 1){ 
            status = 'assigned '
          } else if (item.status == 2) { 
              status = 'Pending'
        } else if (item.status == 3) {
            status = 'completed'
          } else if (item.status == 4) { 
            status = 'recived'
          }
          return (
            <tr key={index}>
              <td>{item.bookId}</td>
              <td>Rs 2500</td>
              <td>{item.leaveStart}</td>
              <td>{item.leaveEnd}</td>
              <td>{status}</td>
            </tr>
          )
        })}
      </tbody>
      </Table>
      </>
  )
}

export default CoordinatorTable