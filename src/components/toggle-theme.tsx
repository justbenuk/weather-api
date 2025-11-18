'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {theme === 'light' ? (
        <Button onClick={() => setTheme('dark')} variant={'outline'} size={'lg'}>
          <MoonIcon className='fill-gray-500' />
        </Button>
      ) : (
        <Button onClick={() => setTheme('light')} variant={'outline'} size={'lg'}>
          <SunIcon className='fill-yellow-400' />
        </Button>
      )}
    </>
  )
}
