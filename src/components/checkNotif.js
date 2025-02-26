import React, { useState, useEffect } from 'react'

const CountdownTimer = ({ targetDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(
        calculateTimeRemaining(targetDate)
    )

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(targetDate))
        }, 1000)

        return () => clearInterval(intervalId)
    }, [targetDate])

    return (
        <div>
            <h5>Time Remaining</h5>
            <h5>{formatTime(timeRemaining)}</h5>
        </div>
    )
}

const calculateTimeRemaining = (targetDate) => {
    const now = new Date()
    const difference = targetDate - now
    return difference > 0 ? difference : 0
}

const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const seconds = Math.floor((time / 1000) % 60)
    return `${days}Days ${hours}h ${minutes}m ${seconds}s`
}

export default CountdownTimer
