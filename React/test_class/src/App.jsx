import React from 'react'
import Demo from './Demo.jsx'
import Card from './Card.jsx'

const App = () => {

  const cardsData = [{
    title:'card 1',
    text:'This is the first card',
    customClasses:"bg-green-200"
  },
  {
    title:'card 2',
    text:'This is the second card',
    customClasses:"bg-blue-200"
  },
  {
    title:'card 3',
    text:'This is the third card',
    customClasses:"bg-yellow-200"
  },]

  return (
    <>
    <div className='text-5xl'>App</div>
    <Demo/>
    {cardsData.map((card,index)=>(
      <Card key={index}//key is important
          title={card.title}//it is called props
          text={card.text}
          customClasses={card.customClasses}/>
      ))
    }
    </>
  )
}

export default App