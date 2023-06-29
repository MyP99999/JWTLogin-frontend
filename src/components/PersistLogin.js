import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const [persist] = useLocalStorage('persist', false)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        /* eslint-disable */
    }, [])

    useEffect(() => {
        console.log(`is loading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
        /* eslint-disable */
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>loading..</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin