import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import HeaderContext from './HeaderContext/headerContext'

import './App.css'

class App extends Component {
  state = {activeTab: 'Home'}

  onActiveProfileTab = () => {
    this.setState({activeTab: 'Profile'})
  }

  onActiveHomeTab = () => {
    this.setState({activeTab: 'Home', searchValue: ''})
  }

  onChangeInput = value => {
    this.setState({searchValue: value})
  }

  render() {
    const {activeTab, searchValue} = this.state
    return (
      <HeaderContext.Provider
        value={{
          activeTab,
          searchValue,
          onActiveHomeTab: this.onActiveHomeTab,
          onActiveProfileTab: this.onActiveProfileTab,
          onChangeInput: this.onChangeInput,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/users/:id" component={UserProfile} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <Route component={NotFound} />
          </Switch>
        </>
      </HeaderContext.Provider>
    )
  }
}

export default App
