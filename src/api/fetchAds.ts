export const fetchAds = async () => {
  try {
    const response = await fetch("http://localhost:3000/advertisements");
    if (!response.ok) {
      throw new Error("Failed to fetch advertisements");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
