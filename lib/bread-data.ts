export interface BreadProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const breadProducts: BreadProduct[] = [
  {
    id: "baguette",
    name: "Traditional Baguette",
    description: "Crispy crust with a soft, airy interior. Perfect for sandwiches or with butter.",
    price: 4.5,
    image: "/images/baguette.png",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "Flaky, buttery layers with a golden crust. A French breakfast classic.",
    price: 3.75,
    image: "/images/croissant.png",
  },
  {
    id: "banh-mi",
    name: "Bánh Mì Roll",
    description: "Light, airy Vietnamese-style roll with a thin crust. Perfect for our signature sandwiches.",
    price: 3.25,
    image: "/images/banh-mi.png",
  },
]
