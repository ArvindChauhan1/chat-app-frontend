import React from 'react'
import styles from "./Message.module.css";

const Message = ({ user, message, classs = "left" }) => {
    const mclasss = (classs === "right") ? styles.right : styles.left;

    if (user) {
        return (
            <>
                <div className={[styles.messageBox, mclasss].join(" ")}>
                    {`${user} : ${message}`}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={[styles.messageBox, mclasss].join(" ")}>
                    {`You : ${message}`}
                </div>
            </>
        )
    }
}

export default Message
