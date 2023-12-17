import classNames from "classnames"
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react"
import CartItemCard from "./CartItemCard"
import XIcon from '../assets/x.svg'
import {
  AnimatePresence,
  motion
} from 'framer-motion'
import { Item } from "../assets/menu"

const Cart = ({
  itemList,
  setItemList,
  onOrder
}: {
  itemList: Item[]
  setItemList: Dispatch<SetStateAction<Item[]>>
  onOrder: () => void
}) => {
  // 如果当前时间是晚上10点到早上8点，显示“休息中”
  const closed = new Date().getHours() >= 22 || new Date().getHours() < 8

  const [expand, setExpand] = useState(false)

  // 如果购物车为空，自动收起
  useEffect(() => {
    if (!itemList.length) {
      setExpand(false)
    }
  }, [itemList.length])

  return !closed ? (<>
    <AnimatePresence>
      {expand && (
        <motion.div
          className="fixed left-0 top-0 w-screen h-screen z-10 bg-black bg-opacity-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pb-0 relative bg-white border border-b-0 border-gray-200 rounded-t-2xl">
              <h1 className="text-2xl font-bold mb-2">已选择的菜品</h1>
              <button
                className="absolute top-4 right-4 p-2"
                onClick={() => setExpand(false)}
              >
                <img
                  src={XIcon}
                  alt=""
                  className="w-5"
                />
              </button>
              <ul className="max-h-[60vh] overflow-y-auto pb-24">
                {itemList.filter((item, i, arr) => arr
                  .findIndex(t => t.id === item.id) === i)
                  .map((item, i) => (
                    <li key={i}>
                      <CartItemCard
                        item={item}
                        itemList={itemList}
                        onAdd={item => setItemList(itemList => [...itemList, item])}
                        onMinus={item => setItemList(itemList => {
                          const newItemList = [...itemList]
                          newItemList.splice(newItemList.findIndex(t => t.id === item.id), 1)
                          return newItemList
                        })}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <div className="fixed left-0 bottom-0 w-screen px-2 py-4 z-10">
      <div className="bg-white border border-gray-200 shadow-lg rounded-full p-2">
        <div className="flex justify-between">
          <div
            className="grow flex items-center"
            onClick={() => {
              if (!!itemList.length && !expand) {
                setExpand(true)
              }
            }}
          >
            <div className="relative mr-2">{!!itemList.length && (
              <span className={classNames(
                "absolute right-2 -top-6",
                "w-5 h-5 rounded-full bg-red-500",
                "text-sm text-white",
                "flex justify-center items-center"
              )}>
                {itemList.length}
              </span>
            )}
              <img
                src={'/logo.webp'}
                alt=""
                className="h-16 -mt-6"
              />
            </div>
            <p className="text-main">
              <span>￥</span>
              <span className="text-2xl font-bold">
                {itemList.reduce((prev, current) => prev + current.price, 0)}
              </span>
            </p>
          </div>
          <button
            className="px-6 py-2 text-white bg-primary rounded-full"
            onClick={onOrder}
          >
            去下单
          </button>
        </div>
      </div>
    </div>
  </>) : (
    <div className="fixed left-0 bottom-0 w-screen px-2 py-4 z-10">
      <div className="bg-main rounded-full p-2 text-white flex items-end">
        <img
          src="/logo.webp"
          alt=""
          className="h-16 -mt-6"
        />
        <div className="grow text-center">
          <p>营业时间08:00-22:00</p>
          <p className="text-sm opacity-80">期待您的光临</p>
        </div>
      </div>
    </div>
  )
}

export default Cart
