import useSWR from "swr";
import { Shipment } from "../stories/Components/Table/columns";

export function useGetOrders(page: number, rowsPerPage: number) {
  const fetcher = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Shipment[] = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error!", error);
      throw error;
    }
  };

  const { data, error } = useSWR(
    `https://64be65da5ee688b6250c56b1.mockapi.io/api/v1/shipments?page=${page}&limit=${rowsPerPage}`,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true },
  );

  return {
    data: data,
    error: error,
  };
}
