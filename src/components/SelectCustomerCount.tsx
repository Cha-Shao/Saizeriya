import {
  useRef,
  useState
} from "react"
import {
  useSearchParams,
} from 'react-router-dom'
import Error from "./Error"
import { stores } from "../assets/stores"

export default function SelectCustomerCount() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [people, setPeople] = useState(4)

  const [searchParams] = useSearchParams()
  const storeId = parseInt(searchParams.get('storeId') || 'undefined')
  const tableId = parseInt(searchParams.get('tableId') || 'undefined')

  if (!storeId || !tableId) return <Error />

  const store = stores.find(store => store.id === storeId)
  if (!store) return <Error />

  const createUrl = (path: string, searchParams: object): string => {
    return path + '?' + new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams)
          .map(([key, value]) => value && [key, value.toString()])
          .filter(option => option)
      )
    ).toString()
  }

  return (
    <div>
      <div className="text-center mt-16 mb-24">
        <img
          src="/logo.webp"
          alt="Saizeriya"
          className="w-1/2 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold mb-2 text-main">欢迎光临萨莉亚</h1>
        <p className="text-lg text-gray-500">{store.name}114号台</p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        <button
          className="selectPeopleButton"
          onClick={() => location.href = createUrl(
            '/', {
            storeId,
            tableId,
            customerCount: 1
          }
          )}
        >
          1
        </button>
        <button
          className="selectPeopleButton"
          onClick={() => location.href = createUrl(
            '/', {
            storeId,
            tableId,
            customerCount: 2
          }
          )}
        >
          2
        </button>
        <button
          className="selectPeopleButton"
          onClick={() => location.href = createUrl(
            '/', {
            storeId,
            tableId,
            customerCount: 3
          }
          )}
        >
          3
        </button>
        <div className="col-span-3 flex items-center my-2">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="mx-2 text-gray-400">或</span>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>
        <div className="col-span-3 grid grid-cols-3 border border-primary rounded-lg">
          <button
            className="rounded-r-none bg-primary/10 text-3xl py-4"
            onClick={() => setPeople(people => people - 1)}
          >
            -
          </button>
          <input
            ref={inputRef}
            type="number"
            value={people}
            onChange={e => {
              const people = parseInt(e.target.value)
              setPeople(people)
            }}
            className="text-center text-3xl py-4"
          />
          <button
            className="rounded-l-none bg-primary/10 text-3xl py-4"
            onClick={() => setPeople(people => people + 1)}
          >
            +
          </button>
        </div>
        <button
          className="col-span-3 selectPeopleButton py-6"
          onClick={() => {
            location.href = createUrl(
              '/', {
              storeId,
              tableId,
              customerCount: people
            })
          }}
        >
          {people}人
        </button>
      </div>
    </div >
  )
}

