import SearchIcon from '../assets/search.svg'
import ArrowIcon from '../assets/arrow.svg'
import {
  Dispatch,
  SetStateAction,
  useState
} from 'react'
import { Item, menu } from '../assets/menu'
import ItemCard from './ItemCard'

const SearchPage = ({
  itemList,
  setItemList,
  onClose
}: {
  itemList: Item[]
  setItemList: Dispatch<SetStateAction<Item[]>>
  onClose: () => void
}) => {
  const items = menu.map(category => category.list).flat()

  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState<Item[]>(items)

  return (
    <div>
      <header className='sticky top-0 p-2 flex bg-white z-10 border-b border-b-gray-100'>
        <button className='p-3' onClick={onClose}>
          <img src={ArrowIcon} alt="" className='w-4 -rotate-90' />
        </button>
        <div className="relative grow">
          <button className='p-3 absolute top-0 left-0'>
            <img src={SearchIcon} alt="" className="w-4" />
          </button>
          <input
            type="text"
            placeholder="搜索菜品名或编号"
            className="px-4 py-2 pl-10 bg-gray-100 rounded-full w-full outline-none placeholder:text-gray-400"
            value={keyword}
            onChange={e => {
              setKeyword(e.target.value)
              setResult(items.filter(item => item.name.includes(e.target.value)))
            }}
          />
        </div>
      </header>
      <main className='px-2'>
        {result.length ? (
          <ul>
            {result.map((item, i) => (
              <li key={i}>
                <ItemCard
                  item={item}
                  onClick={() => { }}
                  itemList={itemList}
                  setItemList={setItemList}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-center text-gray-500 p-4'>没有找到相关菜品</div>
        )}
      </main>
    </div>
  )
}

export default SearchPage
