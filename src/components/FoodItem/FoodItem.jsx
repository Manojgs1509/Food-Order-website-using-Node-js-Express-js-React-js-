import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../Context/StroreContext';

export const FoodItem = ({id,name,price,image,description}) => {

 
    const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)

  return (
    <div className='food-item'>
          <div className='food-item-img-conatiner'>
               <img className='food-item-img' src={url+'/images/'+image} alt="" />
               {
                  !cartItems[id] 
                  ?  <img onClick={()=> addToCart(id)}  src={assets.add_icon_white} alt='' className='add'/>
                  : <div className='food-item-count'>
                       <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={()=> removeFromCart(id)}  src={assets.remove_icon_red} alt="" />
                  </div>
               }
          </div>
          <div className='food-item-info'>
               <div className="food-item-name-rating">
                  <p>{name}</p>
                  <img src={assets.rating_starts} alt="" />
               </div>
               <p className='food-item-desc'>{description}</p>
               <p className='food-item-price'>${price}</p>
          </div>
    </div>
  )
}