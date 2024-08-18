import React from 'react'
import { auth } from './config'

const Logout = ({ setUser, user }) => {

  const handleLogout = () => {
    try {
      auth.signOut().then(() => {
        setUser(null)
      })
    } catch (error) {
      alert("Error in Logout", error)
    }
  }
  console.log(user)
  return (
    <div className="d-flex justify-content-between align-items-center pt-3">
      <div className="d-flex align-items-center">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="rounded-circle me-3"
          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
        />
        <p className="mb-0 fs-5">{user?.displayName}</p>
      </div>
      <div>
        <button
          className="btn bg-transparent border-0 fs-4 fw-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Logout
