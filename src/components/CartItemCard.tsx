import { useContext } from "react"
import { Item } from "../assets/menu"
import { DishListContext } from "../App"
import AddIcon from '../assets/add.svg'
import MinusIcon from '../assets/minus.svg'

const CartItemCard = (item: Item) => {
  const [dishList, setDishList] = useContext(DishListContext)!

  return (
    <div className="grid grid-cols-5 gap-2 py-2">
      <img
        src={`/items/2000${item.id}.jpg`}
        alt=""
        className="border border-gray-200 rounded-lg col-span-2"
      />
      <div className="col-span-3 flex flex-col justify-between">
        <p>{item.name}</p>
        <div className="flex justify-between">
          <div className="w-10">
            <p className="text-main mr-2">
              <span className="text-xs">￥</span>
              <span className="text-xl font-bold">{item.price}</span>
            </p>
          </div>
          <div className="flex">
            <button
              className="w-8 flex justify-center items-center bg-primary text-white font-bold rounded-l-full"
              onClick={() => {
                const newDishList = [...dishList]
                newDishList.splice(newDishList.findIndex(dish => dish.id === item.id), 1)
                setDishList(newDishList)
              }}
            >
              <img
                src={MinusIcon}
                alt=""
                className="w-4 ml-1"
              />
            </button>
            <span className="px-2 border border-primary box-border">
              {dishList.filter(dish => dish.id === item.id).length}
            </span>
            <button
              className="w-8 flex justify-center items-center bg-primary text-white font-bold rounded-r-full"
              onClick={() => {
                const newDishList = [...dishList, item]
                setDishList(newDishList)
              }}
            >
              <img
                src={AddIcon}
                alt=""
                className="w-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
