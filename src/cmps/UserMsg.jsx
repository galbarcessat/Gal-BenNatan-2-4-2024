import { useState, useEffect, useRef } from 'react'
import { eventBus } from '../services/event-bus.service'
import { Alert } from '@mui/material'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', (msg) => {
            setMsg(msg)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return
    return (
        <div className='event-bus-msg'>
            {msg.type === 'POSITIVE' && <Alert severity="success">{msg.txt}</Alert>}
            {msg.type === 'NEGATIVE' && <Alert severity="error">{msg.txt}</Alert>}
        </div>

    )
}