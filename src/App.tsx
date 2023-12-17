import {
  useSearchParams,
} from 'react-router-dom'
import './App.css'
import Error from './components/Error'
import Cart from './components/Cart'
import { useState } from 'react'
import { Item, menu } from './assets/menu'
import { stores } from './assets/stores'
import SearchPage from './components/SearchPage'
import Hero from './components/Hero'
import Search from './components/Search'
import { AnimatePresence } from 'framer-motion'
import Focus from './components/Focus'
import MenuCategoryList from './components/MenuCategoryList'
import ItemCard from './components/ItemCard'
import GithubIcon from './assets/github.svg'
import OrderPage from './components/OrderPage'

function App() {
  const [searchParams] = useSearchParams()
  const storeId = parseInt(searchParams.get('storeId') || 'undefined')
  const tableId = parseInt(searchParams.get('tableId') || 'undefined')
  const customerCount = parseInt(searchParams.get('customerCount') || 'undefined')

  const [itemList, setItemList] = useState<Item[]>([])
  const store = stores.find(store => store.id === storeId)
  const [searching, setSearching] = useState(false)
  const [ordering, setOrdering] = useState(false)
  const [focus, setFocus] = useState<Item | null>(null)

  if (!store || !storeId || !tableId || !customerCount) return <Error />

  if (searching) return (
    <SearchPage
      itemList={itemList}
      setItemList={setItemList}
      onClose={() => setSearching(false)}
    />
  )

  if (ordering) return (
    <OrderPage
      itemList={itemList}
      setItemList={setItemList}
      store={store}
      tableId={tableId}
      onClose={() => setOrdering(false)}
    />
  )

  return (
    <div>
      <Hero store={store} tableId={tableId} />
      <Search onClick={() => setSearching(true)} />
      <AnimatePresence>
        {focus && (
          <Focus
            {...focus}
            onClose={() => setFocus(null)}
            onSelect={() => {
              setItemList(itemList => [...itemList, focus])
              setFocus(null)
            }}
          />
        )}
      </AnimatePresence>
      <main className="grid grid-cols-4">
        <MenuCategoryList />
        <article className="col-span-3 mb-20">
          <ul>
            {menu.map((category, i) => (
              <li key={i} id={`category-${category.category}`} className="relative">
                <h2 className="p-2 sticky top-0 bg-white z-10">{category.category}</h2>
                <ul>
                  {category.list.map((item, j) => (
                    <ItemCard
                      key={j}
                      item={item}
                      onClick={() => setFocus(item)}
                      itemList={itemList}
                      setItemList={setItemList}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <footer className="px-2 my-4 flex flex-wrap gap-4 justify-center text-xs text-gray-500">
            <a href="https://github.com/Cha-Shao">© 2023 Cha_Shao</a>
            <a href="https://github.com/Cha-Shao/Saizeriya" className="flex">
              <img src={GithubIcon} alt="" className="w-3 mr-1" />
              Source code
            </a>
          </footer>
        </article>
      </main>
      <Cart
        itemList={itemList}
        setItemList={setItemList}
        onOrder={() => setOrdering(true)}
      />
    </div>
  )
}

export default App
