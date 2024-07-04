export function SendPatient(patientId: number) {
    console.log("send patient with ID:", patientId)

    // const { isLoading, error, data, isFetching } = useQuery({
    //     queryKey: ["PatientInfo"],
    //     queryFn: async () => {
    //         const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/searchPatients?${paramString}`);
    //         const result = await res.json();
    //         return { status: "success", patientResult: result.patientResult, currentPage: result.currentPage, totalPages: result.totalPages };
    //     },
    // });
    // if (isLoading || isFetching || error || !data) {
    //     return { status: "loading" }
    // }

    // return data
}