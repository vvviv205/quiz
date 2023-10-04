import React, { Children } from 'react'

export default function Main({children}) {
  return (
    <main className='main'>
        {children}
    </main>
  )
}
