import { useState, useEffect } from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export function useMessages() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const messagesRef = firebase.database().ref("messages");
        messagesRef.on("value", (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
                const messagesArray = Object.values(messagesData);
                console.log({ messagesArray });
                setMessages(messagesArray);
            } else {
                setMessages([]);
            }
        });

        return () => {
            messagesRef.off();
        };
    }, []);
    return [messages]
}
