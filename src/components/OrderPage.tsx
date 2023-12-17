import { Item } from "../assets/menu"
import { Store } from "../assets/stores"
import ArrowIcon from '../assets/arrow.svg'
import CartItemCard from "./CartItemCard"
import {
  Dispatch,
  SetStateAction,
  useEffect
} from "react"

const OrderPage = ({
  itemList,
  setItemList,
  store,
  tableId,
  onClose,
}: {
  itemList: Item[]
  setItemList: Dispatch<SetStateAction<Item[]>>
  store: Store
  tableId: number
  onClose: () => void
}) => {

  // 设置背景bg-gray-100
  useEffect(() => {
    document.body.classList.add('bg-gray-100')
    return () => document.body.classList.remove('bg-gray-100')
  }, [])

  return (
    <div>
      <header className="relative p-4 bg-white border-b border-gray-200 flex justify-center">
        <button
          className="absolute left-2 top-2 p-3"
          onClick={onClose}
        >
          <img
            src={ArrowIcon}
            alt=""
            className="w-4 -rotate-90"
          />
        </button>
        <span>确认订单</span>
      </header>
      <main className="p-2">
        <div className="p-4 rounded-2xl bg-white mb-2">
          <p className="text-xl">{store.name}{tableId}台</p>
          <p className="text-gray-500">{store.location}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white mb-16">
          <p className="mb-2">菜品列表</p>
          <ul>
            {itemList.filter((item, i, arr) => arr
              .findIndex(t => t.id === item.id) === i)
              .map((item, i) => (
                <CartItemCard
                  key={i}
                  item={item}
                  itemList={itemList}
                  onAdd={item => setItemList([...itemList, item])}
                  onMinus={item => setItemList(itemList => {
                    const newItemList = [...itemList]
                    newItemList.splice(newItemList.findIndex(t => t.id === item.id), 1)
                    if (newItemList.length === 0) onClose()
                    return newItemList
                  })}
                />
              ))}
          </ul>
          <div className="flex justify-between items-end mt-2">
            <p>总计</p>
            <p className="text-main">
              <span>￥</span>
              <span className="text-2xl font-bold">
                {itemList.reduce((sum, item) => sum + item.price, 0)}
              </span>
            </p>
          </div>
        </div>
        <div className="fixed left-0 bottom-0 w-screen px-2 py-4">
          <button
            className="w-full px-4 py-2 text-white bg-primary rounded-full flex justify-between items-center"
            onClick={() => alert('已提交，祝您用餐愉快！')}
          >
            <span>
              <span>￥</span>
              <span className="text-2xl font-bold">
                {itemList.reduce((sum, item) => sum + item.price, 0)}
              </span>
            </span>
            <span>
              提交订单
            </span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default OrderPage
