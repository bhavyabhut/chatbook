import React, { useEffect } from 'react'
import { ChatEngine } from 'react-chat-engine'
import axios from 'axios'
import { useAuth } from '../provider'
import { useHistory } from 'react-router-dom'
import { auth } from '../config/firebase'
// eslint-disable-next-line no-undef
const projectId = process.env.REACT_APP_Project_ID
// eslint-disable-next-line no-undef
const privetKey = process.env.REACT_APP_PRIVATE_KEY

function Chats() {
  const user = useAuth()
  const history = useHistory()
  const test = () => {
    console.log('test vadu fn')
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
          console.log(data, 'ha')
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
            })
            .catch((e) => console.log(e))
        })
    }
  }

  useEffect(() => {
    if (!user) {
      history.push('/')
      return
    }
    test()
  }, [user])
  const logout = async () => {
    try {
      await auth.signOut()
      history.push('/')
    } catch (error) {
      console.log('logout', error)
    }
  }
  return (
    <>
      <div
        style={{
          width: '100%',
          background: '#001529',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: 'white' }}>{user?.email}</span>
        <span style={{ color: 'white', marginRight: '1rem', cursor: 'pointer' }} onClick={logout}>
          Logout
        </span>
      </div>

      {user && (
        <ChatEngine
          height="calc(100vh - 3rem)"
          projectID={projectId}
          userName={user.email}
          userSecret={user.uid}
        ></ChatEngine>
      )}
    </>
  )
}

export default Chats
