import React, { useLocation } from 'react-router-dom'

import MainLayout from '../layouts'

const main_paths = ['/']

interface Props {
  children: any
}

const AppWrapper = ({ children }:Props) => {
  const location = useLocation()
  
  if (main_paths.some(x => (location.pathname.includes(x)))) {
    return (
      <MainLayout>
        {children}
      </MainLayout>
    )
  }
  
  return (children)
}

export default AppWrapper
