import React from 'react'
import SidebarContext from './SidebarContext'

export const HelperSiderbarContext = ({sidebar,setSidebar}) => {
console.log(sidebar);
    return (
        <SidebarContext.Provider
        value={{
          sidebar:sidebar,
          setSidebar:setSidebar,
          abrir:'abrir'
        }
        }
        />
    )
}
