"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isLoggedIn: boolean
  onAuth: (mode: "login" | "signup") => void
}

export function Header({ isLoggedIn, onAuth }: HeaderProps) {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push("/")
  }

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 
              className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
              onClick={handleLogoClick}
            >
              PromptIQ
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={() => onAuth("login")} className="text-sm">
                  Log In
                </Button>
                <Button
                  onClick={() => onAuth("signup")}
                  className="text-sm text-black"
                  style={{ backgroundColor: "#ebfc72" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5f666")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebfc72")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-sm">
                  My Prompts
                </Button>
                <Button variant="ghost" className="text-sm">
                  History
                </Button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
