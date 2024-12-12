import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from "react-redux";
import {userLogin} from '../slice/userSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
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
    }
  })

  const onsubmit = async (data) => {
    setIsLoading(true)
    try {
      console.log(data)
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json()
      if (result.auth == false) {
        setError(result.message);
        return
        }
      dispatch(userLogin(result.responseUser))
        localStorage.setItem('token', result.token)
        if (result.responseUser.role.includes('manager')) {
            navigate('/manager')
        } else {
            navigate('/coordinator')
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

                    <h3 className="mb-5">Manager Login</h3>
                    {error ? <p className='text-danger'>{error}</p> : <p className='text-muted'></p>}

                    <form onSubmit={handleSubmit(onsubmit)}>
                      <div className="form-outline mb-4">
                        <label className="form-label">Username</label>
                        <input type="text" id="typeEmailX-2" {...register('username')} className="form-control form-control-lg" />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" id="typePasswordX-2" {...register('password')} className="form-control form-control-lg" />
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