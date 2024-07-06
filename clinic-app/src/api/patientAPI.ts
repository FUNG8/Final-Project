// hahahahaha
import { useQuery } from "@tanstack/react-query";


export enum Gender {
    Male = 'male',
    Female = 'female',
}

export enum BloodType {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = 'O',
}

interface Patient {
    title: any;
    id: number,
    register_id: number,
    firstName: string,
    lastName: string,
    gender: Gender,
    blood: BloodType,
    password: string,
    hkid: string,
    birth_date: string,
    phone_number: number,
    diagnosis_id: number,
    emergency_name: string,
    emergency_contact: number,
    updated_at: string,
    created_at: string
}

export function usePatientsInfo(pageNumber = 1, pageSize = 20, searchTerm = "") {
    let paramString = `pageNumber=${pageNumber}&pageSize=${pageSize}`
    console.log("check searchTerm", searchTerm)
    if (searchTerm !== null && searchTerm !== "" && searchTerm !== undefined) {
        paramString += `&searchTerm=${searchTerm}`
    }
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["PatientInfo", pageNumber, pageSize, searchTerm],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/searchPatients?${paramString}`);
            const result = await res.json();
            return { status: "success", patientResult: result.patientResult, currentPage: result.currentPage, totalPages: result.totalPages };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}

export async function addPatientInfo(
    register_id: number,
    firstName: string,
    lastName: string,
    gender: Gender,
    blood: BloodType,
    password: string,
    hkid: string,
    birth_date: string,
    phone_number: number,
    diagnosis_id: number,
    emergency_name: string,
    emergency_contact: number,
    updated_at: string,
    created_at: string
) {
    const response = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/addPatients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            register_id,
            firstName,
            lastName,
            gender,
            blood,
            password,
            hkid,
            birth_date,
            phone_number,
            diagnosis_id,
            emergency_name,
            emergency_contact,
            updated_at,
            created_at,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();
    return result.data;
}

export function useShowPatientInfo(patientId: number) {


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

export async function editPatientInfo(patientId: number, editedInfo: Patient) {

    let updateResponse = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/editPatients?patientId=${patientId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editedInfo }),
    })

    if (!updateResponse.ok) {
        throw new Error(`HTTP error ${updateResponse.status}`);
    }

    const result = await updateResponse.json();
    return result.message;
}

export function useFetchDataToProfile(hkid: string) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["profileData", hkid],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patientProfile/profilePage/`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("patientToken")}`
                }
            });
            const result = await res.json();
            console.log(result)
            return { status: "success", result: result.data }
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }


    return data
}


export function useFetchDataToDiagnosis(hkid: string) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["diagnosisData", hkid],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patientDiagnosis/getDiagnosis/`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("patientToken")}`
                }
            });
            const results = await res.json();
            return results.data
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }


    return data
}



export function useNumberWaitingList() {


    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["NumberWaitingList"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/homePatient/allWaitingList`);
            const result = await res.json();
            console.log("this is patient waiting List",result.data)
            return { status: "success", result: result.data };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}


export function usePatientWaitingList() {


    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["PatientWaitingList"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/homePatient/patientWaitingList`);
            const result = await res.json();
            console.log("this is usePatientWaitingList",result.data)
            return { status: "success", result: result.data };
        },
    });
    if (isLoading || isFetching || error || !data) {
        return { status: "loading" }
    }

    return data
}

