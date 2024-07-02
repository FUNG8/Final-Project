import { useQuery } from "@tanstack/react-query";

interface Medicine {
    title: any;
    id: number;
    name: string;
    generic_drug: string;
    description: string;
    dosage: number;
    unit_measurement: number;
    type: string;
    drug_shape_id: number;
    color: string;
    updated_at: string,
    created_at: string
}

export function useMedicineInfo(pageNumber = 1, pageSize = 20, searchTerm = "") {
    let paramString = `pageNumber=${pageNumber}&pageSize=${pageSize}`
    if (searchTerm !== null && searchTerm !== "" && searchTerm !== undefined) {
        paramString += `&searchTerm=${searchTerm}`
    }
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["MedicineInfo", pageNumber, pageSize,searchTerm],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/medicines/allMedicines?${paramString}`);
            console.log("this is response", res)
            const result = await res.json();
            return { status: "success", medicineResult: result.medicineResult, currentPage: result.currentPage, totalPages: result.totalPages };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}