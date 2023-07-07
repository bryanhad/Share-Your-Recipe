import React from 'react'

export default function PaddingWrapper({children}:{children:React.ReactNode}) {
  return (
    <div className='px-6'>
      {children}
    </div>
  )
}
