import React from 'react'

const HeaderContext = React.createContext({
  searchValue: '',
  activeTab: 'Home',
  onChangeInput: () => {},
  onActiveHomeTab: () => {},
  onActiveProfileTab: () => {},
})

export default HeaderContext
