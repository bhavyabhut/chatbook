import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { auth } from './config/firebase'
import { ChatEngine } from 'react-chat-engine'
import axios from 'axios'
function App() {
  const [user, setUser] = useState()
  const [isUserInChat, setIsUserInChat] = useState(false)
  const test = () => {
    console.log('test vadu fn')
    if (user) {
      var myHeaders = new Headers()
      myHeaders.append('Project-ID', '221361ee-f2b8-4340-bf80-03219274f0e9')
      myHeaders.append('User-Name', user.email)
      myHeaders.append('User-Secret', user.uid)

      var requestOptions = {
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
            'Project-ID': '221361ee-f2b8-4340-bf80-03219274f0e9',
            'User-Name': user.email,
            'User-Secret': user.uid,
          },
        })
        .then((data) => {
          console.log(data, 'ha')
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
                  'PRIVATE-KEY': 'da2c2ab2-b4ef-4c91-81ca-d679d3f0ee1e',
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
          projectID="221361ee-f2b8-4340-bf80-03219274f0e9"
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
