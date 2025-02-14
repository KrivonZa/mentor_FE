import React from 'react'
import { LoginForm } from '../../modules/mainPage'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default AuthLayout