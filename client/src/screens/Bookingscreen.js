import React, { useState, useEffect } from 'react'
import axios from 'axios'
function Bookingscreen({ match }) {
    const [room, setRoom] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const roomid = match.params.roomid
    useEffect(async () => {
        try {
            setLoading(true)
            const data = (await axios.post('/api/rooms/getroombyid', {roomid})).data
            setRoom(data)
            setLoading(false)

        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }, [])

    return (
        <div>
            <h1>Booking screen</h1>
            <h1>Room id is {match.params.roomid}</h1>
        </div>
    )
}

export default Bookingscreen