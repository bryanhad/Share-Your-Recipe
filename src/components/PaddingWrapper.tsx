import React from 'react'

export default function PaddingWrapper({children}:{children:React.ReactNode}) {
  return (
    <div className='p-8'>
      {children}
    </div>
  )
}
