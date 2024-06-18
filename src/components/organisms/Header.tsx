import { HiBell } from 'react-icons/hi2'
import { Button } from '../ui/button'

export default function Header() {
  return (
    <header className="h-24 flex items-center px-8 top-0 bg-white border-b border-[#E9E9E9] text-font">
      <nav className="flex items-center justify-between flex-1">
        <h2 className="font-bold text-3xl">Dashboard</h2>
        <div className="flex items-center gap-6">
          <Button size="icon" variant="ghost" className="rounded-full">
            <HiBell className="text-2xl text-primary" />
          </Button>
          <div className="flex items-center gap-4">
            <img
              src="https://source.unsplash.com/random/900×700/?man"
              alt="profile"
              className="w-12 h-12 object-cover rounded-[14px]"
            />
            <div className="flex flex-col">
              <p className="font-bold">Tarmizi</p>
              <p className="text-sm text-[#8F8F8F]">Linjamsos</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
