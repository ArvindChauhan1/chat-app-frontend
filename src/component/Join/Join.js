import React, { useState } from 'react'
import styles from './Join.module.css'
import logo from '../../images/logo.png'

import { Link } from 'react-router-dom'

let user;

const Join = () => {
    const [name, setName] = useState()

    const sendUser = () => {
        user = name
        setName("")
    }

    return (
        <div className={styles.page}>
            <div className={styles.joinContainer}>
                <img src={logo} alt="logo" />
                <h1>Chat</h1>
                <input placeholder='Enter Your Name' value={name} type="text" id={styles.joinInput} onChange={(e) => setName(e.target.value)} />
                <Link onClick={(e) => (!name) ? e.preventDefault() : null} to="/chat" >
                    <button className={styles.joinBtn} onClick={sendUser} >
                        login
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default Join;
export { user };