export const fetchAds = async () => {
  try {
    const response = await fetch("http://localhost:3000/advertisements");
    if (!response.ok) {
      throw new Error("Failed to fetch advertisements");
    }
    const data = await response.json();

    const updatedData = data.map((ad: { imageUrl: string }) => ({
      ...ad,
      imageUrl:
        ad.imageUrl && ad.imageUrl.trim() !== ""
          ? ad.imageUrl
          : "/no-image.svg",
    }));

    return updatedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
