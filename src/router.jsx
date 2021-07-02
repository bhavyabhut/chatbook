import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './components/Chat'
import Landing from './components/Landing'
import Provider from './provider'

export default function AllRouters() {
  return (
    <Router>
      <Provider>
        <Switch>
          <Route path="/" exact={true}>
            <Landing />
          </Route>
          <Route path="/chats" exact={true}>
            <Chat />
          </Route>
        </Switch>
      </Provider>
    </Router>
  )
}
