import React from 'react'
import { useState,useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { categories } from '../utils/categories'
import RowContainer from './RowContainer'
const MenuContainer = () => {
    const [filter, setFilter] = useState("cake")
    useEffect(() => {
      
    }, [filter])
    const [{items},dispatch]=useStateValue()
  return (
    <section className='w-full my-6' id='menu'><div className="w-full flex flex-col item-center justify-center">
        <p>Our Specials</p>
        {categories && categories.map(category=>(<div onClick={()=>setFilter(category.urlParamName)} className={`${filter===category.urlParamName?'text-red-900':'text-black-900'}`} key={category.id}>{category.name}</div>))}
        </div>
        <div className="w-full">
            <RowContainer flag={false}data={items?.filter(n=>n.category===filter)}></RowContainer>
        </div>
        </section>
  )
}

export default MenuContainer