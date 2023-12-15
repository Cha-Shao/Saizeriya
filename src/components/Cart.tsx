import classNames from "classnames"
import {
  useContext,
  useEffect,
  useState
} from "react"
import { DishListContext } from "../App"
import CartItemCard from "./CartItemCard"
import XIcon from '../assets/x.svg'
import {
  AnimatePresence,
  motion
} from 'framer-motion'

const Cart = () => {
  // 如果当前时间是晚上10点到早上8点，显示“休息中”
  const closed = new Date().getHours() >= 22 || new Date().getHours() < 8

  const [expand, setExpand] = useState(false)
  const [itemList] = useContext(DishListContext)!

  // 如果购物车为空，自动收起
  useEffect(() => {
    if (!itemList.length) {
      setExpand(false)
    }
  }, [itemList.length])

  return closed ? (
    <div className={classNames(
      "bg-white border border-gray-200 shadow-lg rounded-3xl",
      "fixed left-2 bottom-4 w-[calc(100vw-1rem)] p-2",
    )}>
      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-2 relative pb-4">
              <h1 className="text-2xl font-bold mb-2">已选择的菜品</h1>
              <button
                className="absolute top-1 right-1 p-2"
                onClick={() => setExpand(false)}
              >
                <img
                  src={XIcon}
                  alt=""
                  className="w-5"
                />
              </button>
              <ul className="max-h-96 overflow-y-auto">
                {itemList.filter((item, i, arr) => arr.findIndex(t => t.id === item.id) === i).map((item, i) => (
                  <li key={i}>
                    <CartItemCard {...item} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between">
        <div
          className="grow flex items-center"
          onClick={() => {
            if (!!itemList.length && !expand) {
              setExpand(true)
            }
          }}
        >
          <div className="relative mr-4">{!!itemList.length && (
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
        >
          去下单
        </button>
      </div>
    </div>
  ) : (
    <div className="fixed left-0 bottom-0 w-screen py-4 bg-primary text-white text-center">
      <p>营业时间08:00-22:00 期待您的光临</p>
    </div>
  )
}

export default Cart
