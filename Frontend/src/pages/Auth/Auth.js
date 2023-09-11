import React, { useState } from 'react'
import './Auth.css'
import logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
  const dispatch = useDispatch()
  const {loading} = useSelector((state) => state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(false)
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPass: '',
  })
  // handle all input field
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  // resetting the input
  const resetForm = () => {
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmPass: '',
    })
  }
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      data.password === data.confirmPass && dispatch(signUp(data))
    
    } else {
      dispatch(logIn(data))
    }
    resetForm()
  }
  return (
    <div className="Auth">
      {/* Left Side------- */}
      <div className="auth-left">
        <img src={logo} alt="" />
        <div className="webName">
          <h1>Chat App</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right side------- */}
      <div className="auth-right">
        <form
          className={`infoForm authForm ${isSignUp ? '' : 'login-style'}`}
          onSubmit={handleSubmit}
        >
          <h3>{isSignUp ? 'Sign up' : 'Log in'}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                className="infoInput"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                className="infoInput"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
          )}
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="infoInput"
              onChange={handleChange}
              value={data.username}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
              required
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                placeholder="Confirm Password"
                className="infoInput"
                onChange={handleChange}
                value={data.confirmPass}
                required
              />
            )}
          </div>
          {isSignUp && !(data.password === data.confirmPass) && (
            <span
              style={{
                color: 'red',
                fontSize: '14px',
                alignSelf: 'flex-end',
                margin:'-5px 2px -24px 0px'
              }}
            >
              * Confirm password is not same
            </span>
          )}
          <div>
            <span
              style={{ fontSize: '14px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev)
                resetForm()
              }}
            >
              {isSignUp
                ? ' Already have an account. Login'
                : "Don't have an account. Sign up"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            style={{ marginTop: '-1rem' }}
            disabled={
              loading || (isSignUp && data.password !== data.confirmPass)
            }
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
