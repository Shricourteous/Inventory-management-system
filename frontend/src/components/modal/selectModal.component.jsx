import React, { useState } from 'react'

const SelectionModal = ({ setchosenId,dataList, selectionModalToggle}) => {
  
    const onCLickHandler = (id) => {
        setchosenId(id)
        selectionModalToggle()
    }

    return (
        
            <div className="absolute flex items-center justify-center top-0 left-0 bg-black bg-opacity-50 h-[100vh] w-[100vw]">
              <div className="h-96  w-96 bg-green-100 rounded-lg opacity-100 bg-opacity-100 shadow-md overflow-y-scroll ">
                
              <p className="ml-5 mt-5 font-bold  text-green-900">
                  {" "}
                  Select {" "}
                </p>
                
                {dataList.map((each) => {
                  return <div 
                  key={each.id} 
                  className="w-80 h-10 hover:bg-green-300 bg-green-200 rounded-md mt-2 ml-5"> 
                
                  <p className="text-xs p-1" onClick={()=> onCLickHandler(each.id)}>
                    
                    {each.desc}
                  </p>
                   </div>;
                })}
              </div>
            </div>
          
  )
}

export default SelectionModal