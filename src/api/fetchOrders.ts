export const fetchOrders = async () => {
  try {
    const response = await fetch("http://localhost:3000/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
