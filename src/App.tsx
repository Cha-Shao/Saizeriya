import {
  useSearchParams,
} from 'react-router-dom'
import './App.css'
import Error from './components/Error'
import SelectItem from './components/SelectItem'
import Cart from './components/Cart'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState
} from 'react'
import { Item } from './assets/menu'

export const DishListContext = createContext<
  [Item[], Dispatch<SetStateAction<Item[]>>]
  | null
>(null)

function App() {
  const [itemList, setItemList] = useState<Item[]>([])

  const [searchParams] = useSearchParams()
  const storeId = parseInt(searchParams.get('storeId') || 'undefined')
  const tableId = parseInt(searchParams.get('tableId') || 'undefined')
  const customerCount = parseInt(searchParams.get('customerCount') || 'undefined')

  if (!storeId || !tableId || !customerCount) return <Error />

  return (
    <DishListContext.Provider value={[
      itemList,
      setItemList
    ]}>
      <SelectItem
        storeId={storeId}
        tableId={tableId}
      />
      <Cart />
    </DishListContext.Provider>
  )
}

export default App
