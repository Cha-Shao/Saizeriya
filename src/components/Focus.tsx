import { useRef } from "react"
import { Item } from "../assets/menu"
import { motion } from 'framer-motion'
import Tags from "./Tags"
import classNames from "classnames"

const Focus = ({
  onClose,
  onSelect,
  ...item
}: Item & {
  onSelect: () => void
  onClose: () => void
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null)

  const closed = new Date().getHours() >= 22 || new Date().getHours() < 8

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={backgroundRef}
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-30 flex flex-col justify-end"
      onClick={e => {
        if (e.target === backgroundRef.current) {
          onClose()
        }
      }}
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-t-2xl p-6"
      >
        <img
          src={`/items/2000${item.id}.jpg`}
          alt=""
          className="border border-gray-200 rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <p className="text-gray-800">{item.desc}</p>
        <Tags {...item} />
        <button
          disabled={closed}
          onClick={onSelect}
          className={classNames(
            'mt-4 bg-primary text-white rounded-full text-xl py-2 w-full',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {closed ? '休息中' : '加一份'}
        </button>
      </motion.div>
    </motion.div>
  )
}

export default Focus
