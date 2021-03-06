/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { auth } from './config/firebase'
import { ChatEngine } from 'react-chat-engine'
import axios from 'axios'
const projectId = process.env.REACT_APP_Project_ID
// eslint-disable-next-line no-undef
const privetKey = process.env.REACT_APP_PRIVATE_KEY

function App() {
  const [user, setUser] = useState()
  const [isUserInChat, setIsUserInChat] = useState(false)
  const test = () => {
    // console.log('test vadu fn')
    if (user) {
      const myHeaders = new Headers()
      myHeaders.append('Project-ID', projectId)
      myHeaders.append('User-Name', user.email)
      myHeaders.append('User-Secret', user.uid)

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }

      fetch('https://api.chatengine.io/users/me/', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
      axios
        .get('https://api.chatengine.io/users/me/', {
          headers: {
            'Project-ID': projectId,
            'User-Name': user.email,
            'User-Secret': user.uid,
          },
        })
        .then((data) => {
          console.log(data)
          setIsUserInChat(true)
        })
        .catch((e) => {
          console.log(e, e.response, 'e')
          let formData = new FormData()
          formData.append('email', user.email)
          formData.append('username', user.email)
          formData.append('secret', user.uid)
          axios
            .post(
              'https://api.chatengine.io/users/',
              { email: user.email, username: user.email, secret: user.uid },
              {
                headers: {
                  'PRIVATE-KEY': privetKey,
                },
              },
            )
            .then((data) => {
              console.log(data, 'ha na')
              setIsUserInChat(true)
            })
            .catch((e) => console.log(e))
        })
    }
  }

  useEffect(() => {
    if (user) test()
  }, [user])
  return (
    <>
      {isUserInChat ? (
        <ChatEngine
          height="100vh"
          projectID={projectId}
          userName={user.email}
          userSecret={user.uid}
        ></ChatEngine>
      ) : (
        <>
          <button
            onClick={() => {
              auth
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then((data) => setUser(data.user))
            }}
          >
            Google
          </button>
          <button
            onClick={() => {
              auth
                .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then((data) => setUser(data.user))
            }}
          >
            Facebook
          </button>
        </>
      )}
    </>
  )
}

export default App
