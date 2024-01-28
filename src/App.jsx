import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'
import authServices from  './appwrite/auth'
import { login, logout } from './store/authSlice' // Add missing imports
import { Outlet } from 'react-router-dom'
import { Header } from './components'
import Footer from './components'

function App() {
  const [loading, setLoading] = useState(true)
  // dispatch is a function that sends actions to the store
  const dispatch = useDispatch() 

  useEffect(() => {
    authServices.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between text-white'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
