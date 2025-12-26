import React from 'react'

const Card = ({title,price,image}) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-lg rounded-xl p-6 w-full flex-1 hover:shadow-xl transition-shadow">
      {/* Icon */}
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {image}
      </div>

      {/* Text */}
      <div>
        <h2 className="text-gray-500 font-medium uppercase text-sm">{title}</h2>
        <p className="text-2xl font-bold text-gray-800 mt-1">{price}</p>
      </div>
    </div>
  )
}

export default Card