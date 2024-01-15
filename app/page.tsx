import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className=" max-w-7xl mx-auto">
      <div className="grid my-96">
        <div className=" space-y-5 text-center">
          <h1 className=' text-5xl font-bold max-w-3xl mx-auto'>
            Save <span className=' text-sky-500'>beautiful</span> content of your ideas regardless of your design experience.
          </h1>
          <h4 className=' text-gray-500'>
            Beautiful, fast and modern React UI library.
          </h4>

          <div className=" flex justify-center items-center gap-3">

            <Link href="/sign-in" className=' px-4 py-3 bg-primary text-white rounded-xl hover:bg-opacity-90 transition duration-100'>
              Get Started
            </Link>

            <Button className=' py-6' variant="ghost">Source code</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
