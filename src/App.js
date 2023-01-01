import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <Route exact path="/login" component={Login} />
    <Header />
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/user-profile/:userId"
        component={UserProfile}
      />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    </Switch>
  </>
)

export default App
