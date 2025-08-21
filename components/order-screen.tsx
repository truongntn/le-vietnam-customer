"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, ArrowLeft, CreditCard, User, Phone } from "lucide-react";
import { breadProducts } from "@/lib/bread-data";
import { useCustomerStore, type OrderItem } from "@/lib/store";
import { initiatePayment, createFallbackPayment } from "@/lib/payment-service";
import axios from "axios";

export default function OrderScreen({
  params,
  setCurrentScreen,
}: {
  params: { customerId: string };
  setCurrentScreen: (screen: Screen) => void;
}) {
  const router = useRouter();
  const { customerId } = params;
  const {
    getCustomerById,
    updateCustomerOrder,
    updatePaymentStatus,
    updateCustomerInfo,
  } = useCustomerStore();

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "redirecting" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Customer information state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const customer = getCustomerById(customerId);

  useEffect(() => {
    if (!customer) {
      console.log("Customer not found, redirecting to home");
      router.push("/");
      return;
    }

    console.log("Customer found:", customer);

    // Initialize order items from products
    const initialItems = breadProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0,
    }));

    setOrderItems(initialItems);

    // Pre-fill customer info if available
    if (customer.name) setName(customer.name);
    if (customer.phone) setPhone(customer.phone);
  }, [customer, router]);

  useEffect(() => {
    // Calculate total amount whenever order items change
    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(Number.parseFloat(total.toFixed(2)));
  }, [orderItems]);

  const updateQuantity = (id: string, change: number) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError("Please enter your name");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate phone number
    if (!phone.trim()) {
      setPhoneError("Please enter your phone number");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      setPhoneError("Please enter a valid 10-digit phone number");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleCheckout = async () => {
    if (!customer) {
      console.error("Customer not found");
      setErrorMessage("Customer information not found. Please try again.");
      return;
    }

    // Validate customer information
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    // Filter out items with quantity 0
    const itemsToOrder = orderItems.filter((item) => item.quantity > 0);

    if (itemsToOrder.length === 0) {
      setErrorMessage("Please select at least one item");
      return;
    }

    // Update customer information
    updateCustomerInfo(customerId, name, phone);

    // Update customer order in store
    updateCustomerOrder(customerId, itemsToOrder, totalAmount);

    try {
      const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000/";
      const res = await axios.post(BACKEND_URL + "api/orders", {
        phone: phone,
        name: name,
        items: itemsToOrder.map((item) => ({
          productName: item.name,
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        paymentMethod: "cash",
        note: "", // Add note if available
      });

      const resCheckin = await axios.get(
        process.env.BACKEND_URL + "api/checkin/",
        {}
      );
    } catch (error) {
      console.error("Error marking as completed:", error);
    } finally {
    }

    // Process payment
    setPaymentStatus("processing");
    setIsProcessingPayment(true);
    setErrorMessage("");

    try {
      console.log("Starting payment process for customer:", customerId);

      // Try using the API route first
      let paymentResult = await initiatePayment({
        amount: totalAmount,
        currency: "AUD",
        orderId: customerId,
        customerName: name,
        customerPhone: phone,
      });

      // If the API route fails or we're in development, use the fallback
      if (!paymentResult.success) {
        console.log("API route failed, trying fallback payment");

        // Create a fallback payment for testing
        paymentResult = await createFallbackPayment({
          amount: totalAmount,
          currency: "AUD",
          orderId: customerId,
          customerName: name,
          customerPhone: phone,
        });
      }

      console.log("Payment result:", paymentResult);

      if (paymentResult.success && paymentResult.paymentId) {
        // Update payment status to paid (for testing/development)
        updatePaymentStatus(customerId, "paid", paymentResult.paymentId);

        if (paymentResult.redirectUrl) {
          // Update status to redirecting
          setPaymentStatus("redirecting");
          console.log(
            "Redirecting to payment gateway:",
            paymentResult.redirectUrl
          );

          // Redirect to payment gateway
          window.location.href = paymentResult.redirectUrl;
        } else {
          // For testing: If no redirect URL is provided, simulate successful payment
          console.log(
            "No redirect URL provided, simulating successful payment"
          );

          // Show success message
          setPaymentStatus("idle");
          setIsProcessingPayment(false);

          // Redirect to success display after a delay
          setTimeout(() => {
            setCurrentScreen("success");
          }, 2000);
        }
      } else {
        console.error("Payment failed:", paymentResult.errorMessage);
        updatePaymentStatus(customerId, "failed");
        setPaymentStatus("error");
        setErrorMessage(
          paymentResult.errorMessage || "Payment failed. Please try again."
        );
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      updatePaymentStatus(customerId, "failed");
      setPaymentStatus("error");
      setErrorMessage(
        "An unexpected error occurred during payment. Please try again."
      );
      setIsProcessingPayment(false);
    }
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#FFD943] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E05A3A] mx-auto mb-4"></div>
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#070923]"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <header className="bg-[#070923] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/*<button onClick={() => router.back()} className="flex items-center text-white">
           <ArrowLeft className="mr-2" /> Back
          </button>*/}
          <div className="w-20 h-12 relative">
            <Image
              src="/images/le-vietnam.jpg"
              alt="LE VIETNAM"
              fill
              className="object-contain"
            />
          </div>
          <h1
            className="text-md md:text-xl font-bold"
            style={{
              color: "#F3B5FD",
              textShadow: "0 0 5px #F3B5FD, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
              fontFamily: "monospace",
              fontWeight: 700,
              display: "block",
              fontSize: "1.8rem",
            }}
          >
            Le Vietnam - Order System
          </h1>
          <div className="md:w-20"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main
        className="container mx-auto p-4 overflow-y-auto"
        style={{ paddingBottom: "4rem" }}
      >
        {/* Customer Information */}
        <div
          className="bg-white rounded-lg shadow-lg  mb-6"
          style={{ borderRadius: "0.5rem", border: "solid 1px #FFD2CC" }}
        >
          <div className="p-4 bg-[#FFD2CC]">
            <h2 className="text-xl font-bold">Your Information</h2>
            <p className="text-sm">Please enter your contact details</p>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm  mb-1 font-bold "
                style={{
                  color: "#F3B5FD",
                  textShadow:
                    "0 0 5px #F3B5FD, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
                  fontFamily: "monospace",
                  display: "block",
                }}
              >
                <p className="text-gray-600">Name</p>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 block w-full rounded-md border ${
                    nameError ? "border-red-300" : "border-gray-300"
                  } py-3 shadow-sm focus:border-[#E05A3A] focus:ring focus:ring-[#E05A3A] focus:ring-opacity-50`}
                  placeholder="Enter your name"
                  style={{ borderRadius: "0.5rem" }}
                />
              </div>
              {nameError && (
                <p className="mt-1 text-sm text-red-600">{nameError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold  mb-1 "
                style={{
                  color: "#F3B5FD",
                  textShadow:
                    "0 0 5px #F3B5FD, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
                  fontFamily: "monospace",
                  display: "block",
                }}
              >
                <p className="text-gray-600">Phone Number</p>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`pl-10 block w-full rounded-md border ${
                    phoneError ? "border-red-300" : "border-gray-300"
                  } py-3 shadow-sm focus:border-[#E05A3A] focus:ring focus:ring-[#E05A3A] focus:ring-opacity-50`}
                  placeholder="Enter your phone number"
                  style={{ borderRadius: "0.5rem" }}
                />
              </div>
              {phoneError && (
                <p className="mt-1 text-sm text-red-600">{phoneError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div
          className="bg-white rounded-lg shadow-lg  mb-6"
          style={{ borderRadius: "0.5rem" }}
        >
          <div className="p-4 bg-[#FFD2CC]">
            <h2 className="text-xl font-bold">Select Bread</h2>
            <p className="text-sm">Choose from our freshly baked options</p>
          </div>

          <div className="p-4">
            {breadProducts.map((product) => {
              const orderItem = orderItems.find(
                (item) => item.id === product.id
              );
              const quantity = orderItem?.quantity || 0;

              return (
                <div
                  key={product.id}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <div className="w-24 h-24 relative mr-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div
                    className="flex-1"
                    style={{
                      color: "#F3B5FD",
                      textShadow:
                        "0 0 5px #F3B5FD, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
                      fontFamily: "monospace",
                      display: "block",
                    }}
                  >
                    <h3 className="font-bold text-lg text-gray-600">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                    <p className="font-bold mt-1 text-gray-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={quantity === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        quantity === 0
                          ? "bg-gray-200 text-gray-400"
                          : "bg-[#E05A3A] text-white"
                      }`}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="mx-3 w-6 text-center">{quantity}</span>

                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 rounded-full bg-[#E05A3A] text-white flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div
          className="bg-white rounded-lg shadow-lg  mb-6"
          style={{ borderRadius: "0.5rem" }}
        >
          <div className="p-4 bg-[#FFD2CC]">
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>

          <div className="p-4">
            {orderItems.filter((item) => item.quantity > 0).length === 0 ? (
              <p
                className="text-gray-600 text-center py-4 font-bold"
                style={{
                  color: "#F3B5FD",
                  textShadow:
                    "0 0 5px #F3B5FD, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
                  fontFamily: "monospace",
                  display: "block",
                }}
              >
                <p className="text-gray-600" No items selected></p>
              </p>
            ) : (
              <>
                {orderItems
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <span>
                        <p className="text-gray-600">
                          {" "}
                          {item.quantity} x {item.name}
                        </p>
                      </span>
                      <span>
                        <p className="text-gray-600">
                          {" "}
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </span>
                    </div>
                  ))}

                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-gray-600">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={isProcessingPayment || totalAmount === 0}
          className={`w-full py-4 rounded-md text-white text-center flex items-center justify-center ${
            isProcessingPayment || totalAmount === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#E05A3A] hover:bg-[#D04A2A]"
          }`}
          style={{ borderRadius: "0.5rem" }}
        >
          {paymentStatus === "processing" ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : paymentStatus === "redirecting" ? (
            <>Redirecting to Payment Gateway...</>
          ) : (
            <>
              <CreditCard className="mr-2" />
              Checkout (${totalAmount.toFixed(2)})
            </>
          )}
        </button>
      </main>
    </div>
  );
}
