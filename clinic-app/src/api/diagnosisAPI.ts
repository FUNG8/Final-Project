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



