import React from 'react'

const Demo = () => {
  const Name='john';
  const x=10
  const y=20
  const names=['ranjana','akhil','sarah']
  const passed = false

  return (
    <>
    <div>demo</div>
    <p>Hello {Name}</p>
    <h1>{x+y}</h1>
    <ul>
      {names.map((name,index)=>(
        <li kay={index}>{name}</li>
      ))}
    </ul>
    {passed?<h1 className='text-green-600 text-2xl'>green</h1>:<h1 className='text-red-600 text-2xl'>red</h1>}
    </>
  )
}

export default Demo