import { useEffect, useState } from "react"
import { menu } from "../assets/menu"
import classNames from "classnames"

const MenuCategoryList = () => {
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

  return (
    <aside className="relative bg-gray-100">
      <ul className="sticky top-14 mb-20">
        {menu.map((category, i) => {
          const active = activeCategory === i

          return (
            <li key={i} className={classNames(
              'border-l-2 border-transparent',
              active && '!border-main'
            )}>
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
  )
}

export default MenuCategoryList
