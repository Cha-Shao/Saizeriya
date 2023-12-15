import classNames from "classnames"
import { Item } from "../assets/menu"
import PepperIcon from '../assets/pepper.svg'
import { useContext } from "react"
import { DishListContext } from "../App"

const ItemCard = (item: Item) => {
  const closed = new Date().getHours() >= 22 || new Date().getHours() < 8

  const [dishList, setDishList] = useContext(DishListContext)!

  return (
    <div className="p-2 grid grid-cols-5 gap-2">
      <img
        src={`/items/2000${item.id}.jpg`}
        alt=""
        className="border border-gray-200 rounded-lg col-span-2 aspect-[4/3] object-cover"
      />
      <div className="col-span-3 flex flex-col justify-between">
        <div className="mb-2">
          <p>{item.name}</p>
          <p className="text-xs text-gray-500">{item.desc}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-10">
            <p className="text-main mr-2">
              <span className="text-xs">￥</span>
              <span className="text-xl font-bold">{item.price}</span>
            </p>
          </div>
          {item.spicy && (
            <span className={classNames(
              'text-xs p-1 rounded',
              'border border-red-700 text-red-700 bg-red-50',
              'flex'
            )}>
              {Array(item.spicy).fill(null).map((_, i) => (
                <img
                  key={i}
                  src={PepperIcon}
                  alt=""
                  className="w-2"
                />
              ))}
            </span>
          )}
          {item.new && (
            <span className={classNames(
              'text-xs px-1 rounded',
              'border border-red-700 text-red-700 bg-red-100'
            )}>
              新品
            </span>
          )}
          {item.capacity && (
            <span className={classNames(
              'text-xs px-1 rounded',
              'border border-orange-700 text-orange-700 bg-orange-50'
            )}>
              {item.capacity}ml
            </span>
          )}
          {item.top && (
            <span className={classNames(
              'text-xs px-1 rounded',
              'border border-emerald-700 text-emerald-700 bg-emerald-100'
            )}>
              人气
            </span>
          )}
          {item.cold && (
            <span className={classNames(
              'text-xs px-1 rounded',
              'border border-blue-700 text-blue-700 bg-blue-100'
            )}>
              冷
            </span>
          )}
          {item.recommend && (
            <span className={classNames(
              'text-xs px-1 rounded',
              'border border-orange-700 text-orange-700 bg-orange-100'
            )}>
              主厨推荐
            </span>
          )}
          {closed && (
            <div className="relative">
              {dishList.find(dish => dish.id === item.id) && (
                <span className={classNames(
                  'absolute -right-1 -top-1',
                  'w-4 h-4 rounded-full bg-red-500',
                  'text-xs text-white',
                  'flex justify-center items-center'
                )}>
                  {dishList.filter(dish => dish.id === item.id).length}
                </span>
              )}
              <button
                className="px-2 py-1 bg-primary rounded-full text-xs text-white"
                onClick={() => {
                  setDishList(dishList => ([...dishList, item]))
                }}
              >
                加一份
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemCard
