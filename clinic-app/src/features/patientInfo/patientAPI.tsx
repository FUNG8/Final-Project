import {useQuery} from "@tanstack/react-query";

interface Patient {
    id: number;
    register_id: number;
    name: string;
    password: string;
    hkid_number: string;
    birth_date: string;
    phone_number: number;
    diagnosis_id: number;
    emergency_name: string;
    emergency_contact: number;
    updated_at: string;
    created_at: string;
  }