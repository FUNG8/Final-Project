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