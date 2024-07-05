// hahahahaha
import { useQuery } from "@tanstack/react-query";

//mutation
export async function insertMedicine(
    name: string,
    generic_drug: string,
    description: string,
    dosage: string,
    unit_measurement: string,
    type: string,
    drug_shape_id: string,
    color: string,
    created_at: string,
    updated_at: string
) {
    console.log("medicineAPI.ts ready to fetch");
    try {
        let res = await fetch(`${process.env.REACT_APP_API_SERVER}/medicines/insertMedicines`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                generic_drug,
                description,
                dosage,
                unit_measurement,
                type,
                drug_shape_id,
                color,
                created_at,
                updated_at
            })
        })
        let insertResult = await res.json();
        if (!res.ok) {
            console.log(insertResult)
            throw new Error(insertResult.message)
          }
          return insertResult;
        
    } catch (error) {
        console.error("Error inserting medicine:", error);
        throw error
    }
}


//query
export function useMedicineInfo(pageNumber = 1, pageSize = 20,searchTerm = ""){
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
            console.log(result)
            return { status: "success", medicineResult: result.medicineResult, currentPage: result.currentPage, totalPages: result.totalPages };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }
console.log(data)
    return data
}

export function getDrugShape(){
    
}