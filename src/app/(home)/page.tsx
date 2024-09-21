"use client"

import { Button } from "@/components/ui/button";

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div className="h-screen flex flex-col gap-y-16 justify-center items-center">
        Home Page!
        <Button onClick={() => {
          router.refresh()
          router.push('/login')
        }}>
          Log In
        </Button>
      </div>
    </>
  )
}