import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import socketIO from "socket.io-client"

import styles from './Chat.module.css'

import sendLogo from "../../images/send.png"

import closeIcon from "../../images/closeIcon.png"

import Message from "../Message/Message"

import ReactScrollToBottom from 'react-scroll-to-bottom';

let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [message, setMessage] = useState();
    const [id, setId] = useState();

    const [messages, setMessages] = useState([]);

    const send = () => {
        socket.emit('message', { message, id })
        setMessage("");
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] })

        socket.on('connect', () => {
            // alert("Connected")
            setId(socket.id)
        })

        console.log(socket)
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })



        return () => {
            socket.emit('disconnect')
            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })
        return () => {
            socket.off()
        }
    }, [messages])



    return (
        <>
            <div className={styles.page}>
                <div className={styles.chatContainer}>
                    <div className={styles.header}>
                        <h2>CHAT</h2>
                        <a href="/"><img src={closeIcon} alt="close" /></a>
                    </div>
                    <ReactScrollToBottom className={styles.chatBox}>
                        {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />)}
                    </ReactScrollToBottom>
                    <div className={styles.inputBox}>
                        <input onKeyPress={e => e.key === 'Enter' ? send() : null} type="text" id={styles.chatInput} value={message} onChange={e => setMessage(e.target.value)} />
                        <button className={styles.sendBtn} onClick={send} >
                            <img src={sendLogo} alt="send" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;
