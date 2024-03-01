export const getBanners = async () => {
  try {
    const response = await fetch("/api/swipeCarouselConstants.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
