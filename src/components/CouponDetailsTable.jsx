import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { getBackendURL } from "../utils/backendAPI";

const api = getBackendURL();

function CouponDetailsTable({ data }) {
  const [amount, setAmount] = useState(0);
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [dueAmount, setDueAmount] = useState(0);

  useEffect(() => {
    const due = data?.collectedAmount - data?.recivedAmount;
    setDueAmount(due);
  },[data]);

  const updateChange = () => {
    setAmount(inputRef.current.value);
  };
  const handleUpdate = async () => {
      setLoading(true);
      if (amount > dueAmount) {
          toast.error('Amount is Greater than due amount', {
              position:'top-center'
          });
          setLoading(false)
          return
      } 
    const data = {
      amount,
    };
    try {
      const response = await fetch(
        `${api}/manager/coordinator/${data.coordinatorId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Submit, HTTP Error!");
      }
      const result = await response.json();
      if (result.success) {
        toast.success(result.message, {
          position: "top-center",
        });
      } else {
        toast.error(result.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to Submit", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="col-lg-6 mt-1 rounded-3">
        <Table className="rounded-3 rounded" responsive>
          <thead className="text-center"> 
            <tr>
              <th></th>
              <th colSpan={1}></th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>Coupons Assigned</td>
              <td className="text-center">{data && data.couponsAssigend?.length}</td>
            </tr>
            <tr>
              <td>Coupons Completed</td>
              <td className="text-center">0</td>
            </tr>
            <tr>
              <td>Coupons Returned</td>
              <td className="text-center">0</td>
            </tr>
            <tr>
              <td>Due Amount</td>
              <td className="text-center text-nowrap">Rs {dueAmount}</td>
            </tr>
            <tr>
              <td>Collected Amount</td>
              <td className="text-center text-nowrap">Rs {data?.collectedAmount}</td>
            </tr>
            <tr>
              <td>Recived Amount</td>
              <td className="text-center text-nowrap">
                Rs {data?.recivedAmount} <br />{" "}
              </td>
              {/* <td className="text-center">
                <button className="btn btn-secondary py-1">Update</button>
              </td> */}
            </tr>
          </tbody>
          
        </Table>
        <div className="row ">
            <p className="mb-0 mx-2">Update Reviced amount</p>
            <div className="d-flex">
              <input
                placeholder="amount"
                type="number"
                onChange={updateChange}
                ref={inputRef}
                className="form-control"
              />
              {loading ? (
                <button className="btn btn-secondary py-1">Updating...</button>
              ) : (
                <button className="btn btn-dark py-1" onClick={handleUpdate}>
                  Update
                </button>
              )}
            </div>
          </div>
      </div>
    </>
  );
}

export default CouponDetailsTable;
