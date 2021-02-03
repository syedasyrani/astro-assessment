import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { AuthContext } from '../stores/Auth/AuthContext'
import Layout from '../components/Layout'

import { Login, Logout, ChannelsList, ChannelDetail, Error404 } from '../pages'

import PrivateRoute from '../components/PrivateRoute'

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Switch>
      <PrivateRoute
        authed={isAuthenticated}
        exact
        path="/"
        component={() => <Redirect to={'/channels'} />}
      />

      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />

      <Route
        exact
        path={['/', '/channels', '/channels/:category', '/channel/:id']}
      >
        <Layout title="astro assessment">
          <Switch>
            <PrivateRoute
              authed={isAuthenticated}
              path="/channels"
              component={ChannelsList}
            />
            <PrivateRoute
              authed={isAuthenticated}
              path="/channels/:category"
              component={ChannelsList}
            />
            <PrivateRoute
              authed={isAuthenticated}
              path="/channel/:id"
              component={ChannelDetail}
            />
          </Switch>
        </Layout>
      </Route>

      <Route component={Error404} />
    </Switch>
  )
}

export default Routes
