import {
  useSearchParams,
} from 'react-router-dom'
import './App.css'
import Error from './components/Error'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'
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
import NetlifyLogo from './assets/netlify_logo.svg'
import StickerLogo from './assets/sticker_logo.png'
import OrderPage from './components/OrderPage'
import InfiniteDrink from './components/InfiniteDrink'

function App() {
  const [searchParams] = useSearchParams()
  const storeId = parseInt(searchParams.get('storeId') || 'undefined')
  const tableId = parseInt(searchParams.get('tableId') || 'undefined')
  const customerCount = parseInt(searchParams.get('customerCount') || 'undefined')

  const [itemList, setItemList] = useState<Item[]>([
    menu
      .find(category => category.category === '前菜')!
      .list.find(item => item.id === 1240)!
  ])
  const store = stores.find(store => store.id === storeId)
  const [searching, setSearching] = useState(false)
  const [ordering, setOrdering] = useState(false)
  const [focus, setFocus] = useState<Item | null>(null)

  useEffect(() => {
    const closed = new Date().getHours() >= 22 || new Date().getHours() < 8
    if (!closed) {
      alert('海带丝真的很好吃！')
    }
  }, [])

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
    <div className='relative'>
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
            {menu.map((category, i) => {
              if (category.category === '畅饮') return (
                <InfiniteDrink
                  key={i}
                  itemList={itemList}
                  setItemList={setItemList}
                />
              )
              return (
                <li key={i} id={`category-${category.category}`} className="relative">
                  <h2 className="p-2 sticky top-14 bg-white">{category.category}</h2>
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
              )
            })}
          </ul>
          <footer className="px-2 my-2 flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs text-gray-500">
            <a href="https://github.com/Cha-Shao">
              © 2023 Cha_Shao
            </a>
            <a href="https://github.com/Cha-Shao/Saizeriya" className="flex">
              <img src={GithubIcon} alt="github" className="w-3 mr-1" />
              <span>Source code</span>
            </a>
            <a href="https://www.netlify.com/" className='flex'>
              <span>Hosted on</span>
              <img src={NetlifyLogo} alt="netlify" className='h-4 ml-1' />
            </a>
            <a href="https://sticker.hsott.cn/" className='flex'>
              <span>友链：大贴纸</span>
              <img src={StickerLogo} alt="sticker" className='h-4 ml-1' />
            </a>
          </footer>
        </article>
      </main>
      <Cart
        itemList={itemList}
        setItemList={setItemList}
        onOrder={() => {
          if (itemList.length) setOrdering(true)
        }}
      />
    </div>
  )
}

export default App
