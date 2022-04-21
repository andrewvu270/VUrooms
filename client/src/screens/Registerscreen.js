import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

function Registerscreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    async function register(){
        if(password == cpassword){
            const user = {
                name,
                email,
                password,
                cpassword
            }
            
            try{
                setLoading(true)
                const result = await axios.post('/api/users/register', user).data
                setLoading(false)
                setSuccess(true)

                setName('')
                setEmail('')
                setPassword('')
                setCpassword('')
                window.setTimeout(function(){
                    window.location.href = '/login'
                },1200)
                
            } catch(error){
                console.log(error)
                setLoading(false)
                setError(true)
            }

        } else {
            alert('Passwords not matched! Try again')
        }
    }

    return (
        
        <div>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>
                {success && (<Success message='Registration success. Redirecting to Login Page. Please wait...'/>)}
                    <div className='bs'>
                        <h2>Register</h2>
                        <div className='input-group mb-2'></div>
                        <input type='text' className='form-control' placeholder='name' 
                        value={name} onChange={(e) => { setName(e.target.value) }} />
                        <div className='input-group mb-2'></div>
                        <input type='text' className='form-control' placeholder='email' 
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <div className='input-group mb-2'></div>
                        <input type='text' className='form-control' placeholder='password' 
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <div className='input-group mb-2'></div>
                        <input type='text' className='form-control' placeholder='confirm password' 
                        value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen