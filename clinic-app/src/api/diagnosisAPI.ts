import { useQuery } from "@tanstack/react-query";

interface Patient {
    id:number,
    name:string,
    doctor_id:number,
    patient_id:string,
    remarks:string,
    updated_at:string,
    created_at:string
}

export function useShowDiagnosis(id: number) {


    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["showDiagnosis", id],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/diagnosis/getDiagnosis/${id}`);
            const result = await res.json();

            const diagnosisResult = result
            const instructionsResult = result[0].instructions
            console.log("api diagnosis",diagnosisResult)
            console.log("api instruction",instructionsResult)

            return { status: "success", diagnosisResult:diagnosisResult, instructionsResult: instructionsResult};
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}


export async function insertDiagnosis(
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
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/medicines/insertMedicines`,
        {
          method: "POST",
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
            updated_at,
          }),
        }
      );
      console.log("medicineAPI.ts ready to fetch");
      console.log(
        "API DATA",
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
      );
  
      let insertResult = await res.json();
      if (!res.ok) {
        console.log(insertResult);
        throw new Error(insertResult.message);
      }
      return insertResult;
    } catch (error) {
      console.error("Error inserting medicine:", error);
      throw error;
    }
  }
