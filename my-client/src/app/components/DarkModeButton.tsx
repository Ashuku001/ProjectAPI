"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"

function DarkModeButton() {
  const [mounted, setMounted] = useState(false) // until it is mounted on the client
  const{ systemTheme, theme, setTheme} = useTheme();

  // once you mount set it to true
  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted){
    return null
  }

  // if theme is system set it to system else what the user has set
  const currentTheme = theme === "system" ? systemTheme : theme;


  return (
    <div>
      {
        // if dart render sun icon else 
        currentTheme === "dark" ? (
          <SunIcon
             className="h-8 w-8 cursor-pointer text-yellow-200"
             onClick={() => setTheme("light")}
          />
        ) :
        <MoonIcon
          className="h-8 w-8 cursor-pointer text-gray-500"
          onClick={() => setTheme("dark")}
        />
      }
    </div>
  )
}

export default DarkModeButton