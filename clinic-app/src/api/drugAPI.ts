import { useQuery } from "@tanstack/react-query";



export function GetDrugShape() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["Show Drug Shape"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/drugShape/getDrugShape`
      );
      const result = await res.json();
      console.log(result);
      return { status: "success", data: result };
    },
  });
  if (isLoading || isFetching || error || !data) {
    return { status: "loading" };
  }

  return data;
}