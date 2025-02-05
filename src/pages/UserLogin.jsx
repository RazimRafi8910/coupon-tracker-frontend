import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from "react-redux";
import { userLogin } from '../slice/userSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import * as yup from 'yup'
import { FormCheck } from 'react-bootstrap';
import { getBackendURL } from '../utils/backendAPI';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  role: yup.number().required()
})

function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      role: 1
    }
  })

  // gets the backend url for production and local
  const api = getBackendURL()

  const onsubmit = async (data) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json()

      if (!result.auth || !result.success) {
        setError(result.message);
        return
      }

      if (result.success) {
        let loginUser = result.responseUser
        console.log(loginUser)
        localStorage.setItem('token', result.token)
        localStorage.setItem('id',loginUser.id)
        localStorage.setItem('username', loginUser.username)
        localStorage.setItem('role',loginUser.role)
        dispatch(userLogin(loginUser))
        if (data.role == 3) {
          navigate('/manager')
        } else if (data.role == 2) {
          navigate('/coordinator')
        } else {
          navigate('/')
        }
        return
      }

    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='' style={{ minHeight: '100vh', zIndex: '1' }}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className='login'>
        <section className="vh-100" style={{ backgroundColor: '#d1d0d0' }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                  <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Sign in</h3>
                    {error ? <p className='text-danger'>{error}</p> : <p className='text-muted'></p>}

                    <form onSubmit={handleSubmit(onsubmit)}>
                      <div className="form-outline mb-4">
                        <label className="form-label">Username</label>
                        <input type="text" id="typeEmailX-2" {...register('username')} className="form-control border-dark form-control-lg" />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" id="typePasswordX-2" {...register('password')} className="form-control border-dark form-control-lg" />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="m-0 mb-1 form-label d-block">Login as : </label>
                        <hr className='m-0' />
                        <FormCheck.Input inline={'true'} type='radio' value={1} id='role1' name='role' {...register('role')} className='border border-dark ms-3 me-1' />
                        <FormCheck.Label inline={'true'} className=''>User</FormCheck.Label>
                        <FormCheck.Input inline={'true'} type='radio' value={2} id='role2' name='role' {...register('role')} className='border border-dark ms-3 me-1' />
                        <FormCheck.Label inline={'true'} className=''>Coordinator</FormCheck.Label>
                        <FormCheck.Input inline={'true'} type='radio' value={3} id='role3' name='role' {...register('role')} className='border border-dark ms-3 me-1' />
                        <FormCheck.Label inline={'true'} className=''>Manager</FormCheck.Label>
                      </div>

                      <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Login