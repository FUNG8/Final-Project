import { useQuery } from "@tanstack/react-query";
import usePatientSearch from "../../components/usePatientSearch";
import patient from "./patient";


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