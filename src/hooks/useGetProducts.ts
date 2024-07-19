import useSWR from "swr";

export function useGetProducts(query: string) {
  const fetcher = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error!", error);
      throw error;
    }
  };

  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/products/search?q=${query}`,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true, fallbackData: [] },
  );

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
}
