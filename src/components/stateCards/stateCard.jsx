import React from 'react'
import stateData from "../../assets/state_data.json"

const StateCard = () => {
  
  return (
    <div className='text-black w-full min-h-full flex items-center gap-5 justify-evenly '>
            {stateData && stateData.map((data, idx) => (
                <div className='w-full h-8 border border-black' key={idx}>
                    
                </div>
            ))}
    </div>
  )
}

export default StateCard
