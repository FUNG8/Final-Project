// usePatientSearch.tsx
import { useQuery } from '@tanstack/react-query';

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

export interface Patient {
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

const usePatientSearch = (searchTerm: string = '') => {
  return useQuery(
    {
      queryKey: ['PatientProfile', searchTerm], queryFn: async () => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/patients/searchAllPatients?searchTerm=${searchTerm}`);
        console.log("this is searching data:",res)
        const result = await res.json();
        return result as Patient[];
      }
    });
};

export default usePatientSearch;
