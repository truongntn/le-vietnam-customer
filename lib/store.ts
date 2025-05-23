import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Customer {
  id: string
  name: string
  phone: string
  timestamp: number
  completed: boolean
  order: OrderItem[]
  totalAmount: number
  paymentStatus: "pending" | "paid" | "failed"
  paymentId?: string
}

interface CustomerStore {
  customers: Customer[]
  addCustomer: (name: string, phone: string) => string
  updateCustomerInfo: (id: string, name: string, phone: string) => void
  updateCustomerOrder: (id: string, order: OrderItem[], totalAmount: number) => void
  updatePaymentStatus: (id: string, status: "pending" | "paid" | "failed", paymentId?: string) => void
  markCompleted: (id: string) => void
  removeCustomer: (id: string) => void
  getActiveCustomers: () => Customer[]
  getCustomerById: (id: string) => Customer | undefined
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customers: [],

      addCustomer: (name, phone) => {
        const newCustomer: Customer = {
          id: Date.now().toString(),
          name,
          phone,
          timestamp: Date.now(),
          completed: false,
          order: [],
          totalAmount: 0,
          paymentStatus: "pending",
        }

        set((state) => ({
          customers: [...state.customers, newCustomer],
        }))

        return newCustomer.id
      },

      updateCustomerInfo: (id, name, phone) => {
        set((state) => ({
          customers: state.customers.map((customer) => (customer.id === id ? { ...customer, name, phone } : customer)),
        }))
      },

      updateCustomerOrder: (id, order, totalAmount) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, order, totalAmount } : customer,
          ),
        }))
      },

      updatePaymentStatus: (id, status, paymentId) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, paymentStatus: status, paymentId } : customer,
          ),
        }))
      },

      markCompleted: (id) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, completed: true } : customer,
          ),
        }))
      },

      removeCustomer: (id) => {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        }))
      },

      getActiveCustomers: () => {
        return get().customers.filter((customer) => !customer.completed)
      },

      getCustomerById: (id) => {
        return get().customers.find((customer) => customer.id === id)
      },
    }),
    {
      name: "customer-storage",
    },
  ),
)
