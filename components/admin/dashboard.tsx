"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CheckIn = {
  id: string
  phoneNumber: string
  timestamp: Date
}

export default function AdminDashboard() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch from your API
    const mockData: CheckIn[] = [
      {
        id: "1",
        phoneNumber: "555-123-4567",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: "2",
        phoneNumber: "555-987-6543",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
      {
        id: "3",
        phoneNumber: "555-555-5555",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    ]

    setTimeout(() => {
      setCheckIns(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Check-ins Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? "..." : checkIns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? "..." : "2"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? "..." : "68%"}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Check-ins</h2>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {checkIns.map((checkIn) => (
                <tr key={checkIn.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {checkIn.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTime(checkIn.timestamp)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Checked In
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
