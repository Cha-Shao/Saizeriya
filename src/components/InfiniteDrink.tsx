import {
  Dispatch,
  SetStateAction
} from "react"
import { Item, menu } from "../assets/menu"
import classNames from "classnames"
import DrinkIcon from '../assets/drink.svg'
import CircleIcon from '../assets/circle.svg'

const InfiniteDrink = ({
  itemList,
  setItemList,
}: {
  itemList: Item[]
  setItemList: Dispatch<SetStateAction<Item[]>>
}) => {
  const category = menu.find(category => category.category === '畅饮')!

  return (
    <li id={`category-${category.category}`} className='relative'>
      <h2 className="p-2 sticky top-14 bg-white">{category.category}</h2>
      <div className="grid grid-cols-2 p-2">
        <div
          className={classNames(
            'border p-2 rounded-lg',
            'flex flex-col justify-between',
            'duration-200',
            // itemList有id1888的item时就是激活
            itemList.find(item => item.id === 1888)
              ? 'border-primary'
              : 'border-transparent',
          )}
          onClick={() => setItemList(itemList => [...itemList, category.list[0]])}
        >
          <div className="mb-1">
            <div className="flex items-center">
              <img src={DrinkIcon} alt="" className="h-4 mr-2" />
              <span>{category.list[0].name}</span>
            </div>
            <p className="text-xs text-gray-500">{category.list[0].desc}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-main">
              <span className="text-xs">￥</span>
              <span className="text-xl font-bold">{category.list[0].price}</span>
            </span>
            <div className="relative">
              {itemList.find(thisItem => thisItem.id === category.list[0].id) && (
                <span className={classNames(
                  'absolute -right-1 -top-1',
                  'w-4 h-4 rounded-full bg-red-500',
                  'text-xs text-white',
                  'flex justify-center items-center'
                )}>
                  {itemList.filter(thisItem => thisItem.id === category.list[0].id).length}
                </span>
              )}
              <button className="px-2 py-1 bg-primary rounded-full text-xs text-white">
                加一份
              </button>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            // itemList没有id1888的item时就是激活
            'border p-2 rounded-lg',
            'flex flex-col justify-between',
            'duration-200',
            !itemList.find(item => item.id === 1888)
              ? 'border-primary'
              : 'border-transparent',
          )}
          onClick={() => setItemList(itemList => {
            const newItemList = [...itemList]
            // 移除所有id1888的item
            return newItemList.filter(item => item.id !== 1888)
          })}
        >
          <div className="mb-1">
            <div className="flex items-center">
              <img src={CircleIcon} alt="" className="h-4 mr-2" />
              <span>{category.list[1].name}</span>
            </div>
            <p className="text-xs text-gray-500">{category.list[1].desc}</p>
          </div>
          <button className="w-full py-1 bg-gray-200 rounded-full text-xs">
            无需畅饮
          </button>
        </div>
      </div>
    </li>
  )
}

export default InfiniteDrink
