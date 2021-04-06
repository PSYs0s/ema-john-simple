import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './LoginManager';



function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        photo: ""
    })

    initializeLoginFrameWork()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res,true)
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res,false)
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res)
                handleResponse(res,true)
            })
    }
    const handleResponse = (res, redirecet) => {
        setUser(res)
        setLoggedInUser(res)
        if (redirecet) {
            history.replace(from);
        }
    }

    const handleBlur = (event) => {
        let isFeildValid = true
        if (event.target.name === "email") {
            isFeildValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === "password") {
            const isPasValid = event.target.value.length > 6
            const passHasNumber = /\d{1}/.test(event.target.value)
            isFeildValid = isPasValid && passHasNumber
        }
        if (isFeildValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (event) => {
        // console.log(user.name,user.email,user.password)
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res,true)
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res)
                    handleResponse(res,true)
                })
        }
        event.preventDefault()
    }


    return (
        <div style={{ textAlign: "center" }}>
            {
                user.isSignIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign in using Facebook</button>
            {
                user.isSignIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt="profile pic" />
                </div>
            }
            <h1>Our own authentication system</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New user sign up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="your name" required />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="your email" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="your password" required />
                <br />
                <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && <p style={{ color: "green" }}>accounnt {newUser ? "created" : "Loggd In"} successfully</p>}
        </div>
    );
}

export default Login;
