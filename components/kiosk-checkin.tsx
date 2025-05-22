"use client"

import { useState } from "react"
import { X, ArrowLeft } from "lucide-react"

export default function KioskCheckin() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(phoneNumber + num)
    }
  }

  const handleClear = () => {
    setPhoneNumber("")
  }

  const handleBackspace = () => {
    setPhoneNumber(phoneNumber.slice(0, -1))
  }

  const handleCheckIn = () => {
    if (phoneNumber.length === 10) {
      // In a real app, you would send this data to your backend
      console.log("Checking in with phone number:", phoneNumber)
      setIsCheckedIn(true)

      // Reset after 5 seconds
      setTimeout(() => {
        setIsCheckedIn(false)
        setPhoneNumber("")
      }, 5000)
    }
  }

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 0) return ""
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `${phone.slice(0, 3)}-${phone.slice(3)}`
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg bg-white border-4 border-green-400">
      <div className="flex flex-col md:flex-row h-[700px]">
        {/* Left Side - Promotional Content */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-white text-xl font-bold">KIOSK CENTER</h2>
            <p className="text-white text-sm">(800) 555-1234</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-full max-w-xs mx-auto text-center">
              <h3 className="text-blue-500 text-4xl font-bold">10% OFF</h3>
              <p className="text-gray-700 uppercase text-sm font-medium mt-2">WHEN YOU REDEEM</p>
              <p className="text-red-500 text-3xl font-bold mt-1">10 REWARD POINTS</p>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-white text-xs">
              By entering my phone number, I agree to receive KIOSK CENTER promotional and other marketing messages via
              email and call/text at the number provided.
            </p>
          </div>
        </div>

        {/* Right Side - Phone Entry */}
        <div className="w-full md:w-3/5 bg-white p-6 flex flex-col">
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center mr-1">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-gray-800">KIOSK</span>
            </div>
          </div>

          {isCheckedIn ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600 text-center">You have successfully checked in with phone number:</p>
              <p className="text-gray-800 font-bold text-xl mt-2">{formatPhoneNumber(phoneNumber)}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">PLEASE ENTER PHONE NUMBER</h2>
                <p className="text-gray-600 text-sm">Your visit will not be shared with any third party</p>
              </div>

              <div className="mb-4">
                <div className="h-14 border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-800">
                  {formatPhoneNumber(phoneNumber) || "Enter your number"}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="h-16 rounded-full border border-pink-200 flex items-center justify-center text-2xl font-medium text-pink-600 hover:bg-pink-50 transition-colors"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  className="h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleNumberClick("0")}
                  className="h-16 rounded-full border border-pink-200 flex items-center justify-center text-2xl font-medium text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4 mb-8">
                <button
                  onClick={handleCheckIn}
                  disabled={phoneNumber.length !== 10}
                  className={`w-full py-5 rounded-full text-white font-bold text-xl ${
                    phoneNumber.length === 10 ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 cursor-not-allowed"
                  } transition-colors`}
                >
                  CHECK-IN
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
