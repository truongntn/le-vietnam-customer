"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function KitchenScreen() {
  const [activeCheckin, setActiveCheckin] = useState([]);
  const [completedCheckin, setCompletedCheckin] = useState([]);

  useEffect(() => {
    const checkinData = async () => {
      const res = await axios.get(process.env.BACKEND_URL + "api/checkin/", {});
      setActiveCheckin(res.data);
    };
    checkinData();
    setCompletedCheckin([]);
    // Poll the server every 5 seconds
    const interval = setInterval(checkinData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const [loading, setLoading] = useState<string | null>(null);

  const handleMarkCompleted = async (id: string) => {
    setLoading(id);
    try {
      const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000/";
      const res = await axios.post(
        BACKEND_URL + "api/checkin/completeCheckin",
        {
          id: id,
        }
      );

      const resCheckin = await axios.get(
        process.env.BACKEND_URL + "api/checkin/",
        {}
      );
      setActiveCheckin(resCheckin.data);
    } catch (error) {
      console.error("Error marking as completed:", error);
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  const handleRemoveCheckin = (id: string) => {
    //removeCustomer(id)
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    //return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#F05122] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/*<Link href="/" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>*/}
            <div className="w-24 h-12 relative rounded-full">
              <Image
                src="/images/le-vietnam.jpg"
                alt="LE VIETNAM"
                fill
                className="object-contain rounded-full"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Le Vietnam - Kitchen</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#FFB347] p-4">
            <h2 className="text-2xl font-bold text-center">
              Arrived Customers
            </h2>
            <p className="text-center text-sm mt-1">
              Staff must tick the box after delivering the food to the customer
            </p>
          </div>

          <div className="p-4">
            {activeCheckin.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No customers waiting
              </div>
            ) : (
              <div className="h-[calc(100vh-250px)] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-4">Name</th>
                      <th className="text-left py-2 px-4">Phone</th>
                      <th className="text-left py-2 px-4">Time</th>
                      <th className="text-left py-2 px-4">Order Details</th>
                      <th className="text-center py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCheckin.map((customer) => (
                      <tr
                        key={customer._id}
                        className="border-b border-gray-100"
                      >
                        <td className="py-4 px-4 font-semibold">
                          {customer.name}
                        </td>
                        <td className="py-4 px-4">{customer.phone}</td>
                        <td className="py-4 px-4">
                          {formatTime(customer.checkInTime)}
                        </td>
                        <td className="py-4 px-4">{customer.order_details}</td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleMarkCompleted(customer._id)}
                            className={`w-8 h-8 border-2 rounded inline-flex items-center justify-center transition-colors ${
                              loading === customer._id
                                ? "border-gray-400 bg-gray-200 cursor-not-allowed"
                                : "border-gray-400 hover:bg-green-50 hover:border-green-500"
                            }`}
                            aria-label="Mark as completed"
                            disabled={loading === customer._id} // Disable button while loading
                          >
                            {loading === customer._id ? (
                              <div className="loader w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
                            ) : (
                              customer.completed && (
                                <Check className="h-5 w-5 text-green-600" />
                              )
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {completedCheckin.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-100 p-4">
              <h2 className="text-xl font-bold text-center text-green-800">
                Recently Completed
              </h2>
            </div>

            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Phone</th>
                    <th className="text-left py-2 px-4">Time</th>
                    <th className="text-center py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completedCheckin.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 text-gray-500"
                    >
                      <td className="py-3 px-4 line-through">
                        {customer.name}
                      </td>
                      <td className="py-3 px-4 line-through">
                        {customer.phone}
                      </td>
                      <td className="py-3 px-4 line-through">
                        {formatTime(customer.timestamp)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          // onClick={() => handleRemoveCustomer(customer.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
