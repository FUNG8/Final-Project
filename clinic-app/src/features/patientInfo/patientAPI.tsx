import {useQuery} from "@tanstack/react-query";

interface Patient {
    id: number;
    register_id: number;
    name: string;
    password: string;
    hkid: string;
    birth_date: string;
    phone_number: number;
    diagnosis_id: number;
    emergency_name: string;
    emergency_contact: number;
    updated_at: string;
    created_at: string;
  }

  export function usePatientsInfo(){
    const {isLoading, error, data, isFetching} = useQuery({
        queryKey: ["PatientInfo"],
        queryFn: async ()=> {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/allPatients`)
            const result = await res.json()
            return result as Patient[]
        }
    })
    if(isLoading || isFetching || error || !data){
        return []
    }

    return data
  }

  export async function addPatientInfo(
    register_id: number,
    name: string,
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
            name,
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