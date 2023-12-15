import classNames from "classnames"
import { menu } from "../assets/menu"
import { stores } from "../assets/stores"
import Error from "./Error"
import ItemCard from "./ItemCard"
import {
  useEffect,
  useState
} from "react"
import Hero from "./Hero"
import Search from "./Search"

const SelectItem = ({
  storeId,
  tableId,
}: {
  storeId: number
  tableId: number
}) => {
  const store = stores.find(store => store.id === storeId)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const categories = document.querySelectorAll('li[id^="category-"]')
      const category = Array.from(categories).find(category => {
        const rect = category.getBoundingClientRect()
        return rect.top > 0 && rect.top < window.innerHeight / 2
      })
      if (category) {
        const categoryIndex = Array.from(categories).indexOf(category)
        setActiveCategory(categoryIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!store) return <Error />

  return (
    <div>
      <Hero store={store} tableId={tableId} />
      <Search />
      <main className="grid grid-cols-4">
        <aside className="relative bg-gray-100">
          <ul className="sticky top-0 mb-20">
            {menu.map((category, i) => {
              const active = activeCategory === i

              return (
                <li key={i}>
                  <button
                    className={classNames(
                      'w-full p-3 text-left',
                      active && 'bg-white'
                    )}
                    onClick={() => {
                      const categoryElement = document.getElementById(`category-${category.category}`)
                      if (categoryElement) {
                        categoryElement.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    }}
                  >
                    <span className={classNames(
                      'text-sm',
                      active ? 'text-main' : 'text-gray-500'
                    )}>
                      {category.category}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>
        <article className="col-span-3">
          <ul className="mb-20">
            {menu.map((category, i) => (
              <li key={i} id={`category-${category.category}`} className="relative">
                <p className="p-2 sticky top-0 bg-white z-10">{category.category}</p>
                <ul>
                  {category.list.map((item, j) => (
                    <ItemCard key={j} {...item} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </div>
  )
}

export default SelectItem
