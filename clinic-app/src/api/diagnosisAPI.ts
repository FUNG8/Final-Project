// hahahahaha
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";




interface Patient {
    id:number,
    name:string,
    doctor_id:number,
    patient_id:string,
    remarks:string,
    updated_at:string,
    created_at:string
}

// export function usePatientsInfo(pageNumber = 1, pageSize = 20, searchTerm = "") {
//     let paramString = `pageNumber=${pageNumber}&pageSize=${pageSize}`
//     console.log("check searchTerm", searchTerm)
//     if (searchTerm !== null && searchTerm !== "" && searchTerm !== undefined) {
//         paramString += `&searchTerm=${searchTerm}`
//     }
//     const { isLoading, error, data, isFetching } = useQuery({
//         queryKey: ["PatientInfo", pageNumber, pageSize, searchTerm],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/searchPatients?${paramString}`);
//             const result = await res.json();
//             return { status: "success", patientResult: result.patientResult, currentPage: result.currentPage, totalPages: result.totalPages };
//         },
//     });
//     if (isLoading || isFetching || error || !data) {
//         return { status: "loading" }
//     }

//     return data
// }

// export async function addPatientInfo(
//     register_id: number,
//     firstName: string,
//     lastName: string,

//     password: string,
//     hkid: string,
//     birth_date: string,
//     phone_number: number,
//     diagnosis_id: number,
//     emergency_name: string,
//     emergency_contact: number,
//     updated_at: string,
//     created_at: string
// ) {
//     const response = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/addPatients`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             register_id,
//             firstName,
//             lastName,
//             gender,
//             blood,
//             password,
//             hkid,
//             birth_date,
//             phone_number,
//             diagnosis_id,
//             emergency_name,
//             emergency_contact,
//             updated_at,
//             created_at,
//         }),
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error ${response.status}`);
//     }

//     const result = await response.json();
//     return result.data;
// }

export function useShowDiagnosis(id: number) {


    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["showDiagnosis", id],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/diagnosis/getDiagnosis/${id}`);
            const diagnosisResult = await res.json();
            return { status: "success", result:diagnosisResult };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}


// export function useEditPatientInfo(patientId: number) {
//     console.log("show patient with ID so to Edit:", patientId)

//     const { isLoading, error, data, isFetching } = useQuery({
//         queryKey: ["editPatientsInfo", patientId],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/editPatients?patientId=${patientId}`);
//             const result = await res.json();
//             return { status: "success", editPatientId: result.patientId};
//         },
//     });
//     if (isLoading || isFetching || error || !data) {
//         return { status: "loading" }
//     }
//     console.log(data)
//     return data
// }

