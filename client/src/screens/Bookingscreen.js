import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'; 
AOS.init({
    duration:1000
});

function Bookingscreen({ match }) {
    const [room, setRoom] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const roomid = match.params.roomid
    const fromDate = moment(match.params.fromDate, 'DD-MM-YYYY')
    const toDate = moment(match.params.toDate, 'DD-MM-YYYY')

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1
    const [totalAmount, setTotalAmount] = useState()

    useEffect(async () => {

        if(!localStorage.getItem('currentUser')){
            window.location.href='/login'
        }

        try {
            setLoading(true)
            const data = (await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid })).data
            setTotalAmount(data.rentperday * totalDays)
            setRoom(data)
            setLoading(false)

        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }, [])

    

    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }
        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setLoading(false)
            Swal.fire('Congratulations', 'Your room has been booked successfully!', 'success').then(result=>{
                window.location.href = '/bookings'
            })
        } catch (error) {
            setLoading(false)
            Swal.fire('Oops!', 'Something went wrong', 'error')
        }
    }

    return (
        <div className='m-5' data-aos='fade-up'>
            {loading ? (<Loader />) : room ? (<div>

                <div className='row justify-content-center mt-5 bs'>

                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {match.params.fromDate}</p>
                                <p>To Date: {match.params.toDate}</p>
                                <p>Max Count: {room.maxcount}</p>
                            </b>
                        </div>
                        <br />
                        <div style={{ textAlign: 'right' }}>
                            <h1>Amount</h1>
                            <hr />
                            <b>
                                <p>Total days: {totalDays}</p>
                                <p>Rent per day: {room.rentperday}</p>
                                <p>Total amount: {totalAmount}</p>
                            </b>
                        </div>

                        <div style={{ float: 'right' }}>

                            <StripeCheckout
                                amount={totalAmount * 100}
                                currency='CAD'
                                token={onToken}
                                stripeKey="pk_test_51Km0wmBBPgTHSdZAtfcEfF0bqF2Tru6PXoECQHbs1W0mZvXsXyaxppCIe0Gmpki95yPxrxAf466kxGDTFQvNrAo300qUMRVVYH"
                            >
                                <button className='btn btn-primary'>Pay Now</button>
                            </StripeCheckout>
                        </div>

                    </div>


                </div>

            </div>) : (<Error />)}
        </div>
    )
}

export default Bookingscreen