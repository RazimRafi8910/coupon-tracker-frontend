import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from '../../components/Loader'
import useFetch from '../../utils/useFetch'
import { useRef } from "react";
import { getBackendURL } from "../../utils/backendAPI";
import RegisterTable from "../../components/RegisterTable";

const api = getBackendURL();

function CouponRegister() {
    const { data, setData, loading, error } = useFetch('/manager/register');
    const searchRef = useRef();

    const handleSearch = async () => {
        const bookNo = searchRef.current.value;
        try {
            const response = await fetch(`${api}/manager/register?bookNo=${bookNo}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Falied Search, HTTP error!");
            }
            const result = await response.json();
            if (!result.success) {
                toast.error(result.message);
            }
            setData(result.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Falied Search', {
                position: "top-center",
            });
        }
    }

    if (error) {
        toast.error('falied Fetch data', {
            position: "top-center"
        });
    }
    return (
        <>
            <div className="container">
                <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Register</li>
                </ol>
                <div className="row mx-2">
                    <h2>Coupon Register</h2>
                    <hr />
                </div>
                <div className="row mx-1 mb-1">
                    <div className="d-flex col-lg-6">
                        <input type="text" ref={searchRef} className="form-control" placeholder="Book number" />
                        <button className="btn btn-outline-dark" onClick={handleSearch}>Search</button>
                    </div>
                </div>

                {loading ?
                    <Loader /> :
                    error ?
                        (<p className="mx-2 text-danger">error occured</p>)
                        :
                        <div className="row mx-1">
                            { data ? <RegisterTable data={data} /> : <p>no data found</p>}
                        </div>
                }
            </div>
        </>
    )
}

export default CouponRegister