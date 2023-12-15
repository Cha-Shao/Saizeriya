import { Store } from "../assets/stores"

const Hero = ({
  store,
  tableId
}: {
  store: Store
  tableId: number
}) => {
  return (
    <div
      className="h-56 px-4 py-8 flex flex-col justify-end"
      style={{
        backgroundImage: `linear-gradient(to top, #00000080, transparent),url(/stores/${store.id}.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-white text-3xl font-bold">{store.name}{tableId}台</h1>
    </div>
  )
}

export default Hero
