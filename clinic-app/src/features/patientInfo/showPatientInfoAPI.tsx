import { useQuery } from "@tanstack/react-query";

export function useShowPatientInfo(patientId: number) {
    console.log("show patient with ID:", patientId)

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["showPatientsInfo", patientId],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/showPatients?patientId=${patientId}`);
            const result = await res.json();
            return { status: "success", result };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}