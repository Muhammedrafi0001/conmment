import React, { useEffect } from 'react'
import { auth, provider } from "./config"
import { signInWithPopup } from "firebase/auth"
import {Google_log} from "./GoogleLogo"

const Signin = ({ setUser, setGoogleSignin }) => {

    useEffect(() => {
        setGoogleSignin(() => handleSignin)
    }, [setGoogleSignin])

    const handleSignin = () => {
        try {
            signInWithPopup(auth, provider).then((data) => {
                setUser(data.user)
            })
        } catch (error) {
            alert("Error in signing", error)
        }
    }
    return (
        <div className="mt-3 d-flex align-items-center justify-content-end" >
            <img
            src={Google_log}
                alt=""
                className="rounded-circle me-3"
                style={{ width: '30px', height: '30px', objectFit: 'cover' }}
            />
            <button className="btn bg-transparent border-0 fs-4 fw-bold p-0" onClick={handleSignin}>Signin with Google</button>
        </div>
    )
}

export default Signin
