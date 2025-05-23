// ANZ Worldline Payment Integration Service

interface PaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerName: string
  customerPhone: string
}

interface PaymentResponse {
  success: boolean
  paymentId?: string
  errorMessage?: string
  redirectUrl?: string
}

/**
 * Initiates a payment with ANZ Worldline via server API route
 * @param paymentData Payment request data
 * @returns Payment response with success status and payment ID
 */
export async function initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    console.log("Initiating payment via server API route:", paymentData)

    // Call our server-side API route
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    // Parse the response
    const data = await response.json()

    console.log("Payment initiation response:", data)

    // Check if the request was successful
    if (response.ok) {
      return {
        success: true,
        paymentId: data.paymentId,
        redirectUrl: data.redirectUrl,
      }
    } else {
      console.error("Payment initiation failed:", data)
      return {
        success: false,
        errorMessage: data.errorMessage || "Payment initiation failed",
      }
    }
  } catch (error) {
    console.error("Payment error:", error)
    return {
      success: false,
      errorMessage: "An unexpected error occurred during payment initiation",
    }
  }
}

/**
 * Checks the status of a payment via server API route
 * @param paymentId The ID of the payment to check
 * @returns The status of the payment
 */
export async function checkPaymentStatus(paymentId: string): Promise<{ status: "pending" | "paid" | "failed" }> {
  try {
    console.log("Checking payment status for:", paymentId)

    // Call our server-side API route
    const response = await fetch(`/api/payment/status?paymentId=${paymentId}`)

    // Parse the response
    const data = await response.json()

    console.log("Payment status response:", data)

    // Check if the request was successful
    if (response.ok) {
      return { status: data.status }
    } else {
      console.error("Payment status check failed:", data)
      return { status: "failed" }
    }
  } catch (error) {
    console.error("Error checking payment status:", error)
    return { status: "failed" }
  }
}

/**
 * Creates a fallback payment for testing when API calls fail
 * This should only be used in development
 */
export async function createFallbackPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  console.log("Using fallback payment mechanism")

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // For testing purposes, create a mock payment ID
  const mockPaymentId = `TEST-${Date.now()}-${Math.floor(Math.random() * 1000)}`

  console.log("Created fallback payment for testing:", mockPaymentId)

  return {
    success: true,
    paymentId: mockPaymentId,
  }
}
