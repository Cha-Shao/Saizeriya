import classNames from "classnames"
import { Item } from "../assets/menu"
import PepperIcon from '../assets/pepper.svg'
import {
  Dispatch,
  SetStateAction,
  useRef
} from "react"
import Tags from "./Tags"

const ItemCard = ({
  onClick,
  item,
  itemList,
  setItemList
}: {
  item: Item
  onClick?: () => void
  itemList: Item[]
  setItemList: Dispatch<SetStateAction<Item[]>>
}) => {
  const closed = new Date().getHours() >= 22 || new Date().getHours() < 8
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="p-2 grid grid-cols-5 gap-2" onClick={e => {
      if (e.target === buttonRef.current) return
      onClick?.()
    }}>
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
          <Tags {...item} />
          {!closed && (
            <div className="relative">
              {itemList.find(thisItem => thisItem.id === item.id) && (
                <span className={classNames(
                  'absolute -right-1 -top-1',
                  'w-4 h-4 rounded-full bg-red-500',
                  'text-xs text-white',
                  'flex justify-center items-center'
                )}>
                  {itemList.filter(thisItem => thisItem.id === item.id).length}
                </span>
              )}
              <button
                ref={buttonRef}
                className="px-2 py-1 bg-primary rounded-full text-xs text-white"
                onClick={() => {
                  setItemList(itemList => ([...itemList, item]))
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
