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
    d_name: string,
    d_doctor_id:number,
    d_patient_id:number,
    d_remarks:string,
    d_created_at: string,
    d_updated_at: string,
    demoInstructions:any
  ) {
    console.log("diagnosis api",d_name,d_doctor_id,d_patient_id,d_remarks,d_created_at,d_updated_at,demoInstructions)
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/diagnosis/postDiagnosis/${d_patient_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            d_name,
            d_doctor_id,
            d_patient_id,
            d_remarks,
            d_created_at,
            d_updated_at,
            demoInstructions
        })}
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
