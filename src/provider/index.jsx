import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../config/firebase'
import PropTypes from 'prop-types'

const AuthContext = React.createContext()
export const useAuth = () => useContext(AuthContext)
const Provider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user, 'USER')
      setUser(user)
      setLoading(false)
      history.push('/chats')
    })
  }, [history, user])

  return <AuthContext.Provider value={user}>{!loading && children}</AuthContext.Provider>
}
Provider.propTypes = {
  children: PropTypes.element,
}
export default Provider
