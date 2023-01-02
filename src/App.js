import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/users/:id" component={UserProfile} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
