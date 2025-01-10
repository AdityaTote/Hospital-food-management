import { UseFormReturn } from "react-hook-form";

export type formPatientData = UseFormReturn<{
    phone: string;
    address: string;
    name: string;
    disease: string;
    allergy: string;
    roomNo: string;
    floorNo: string;
    age: number;
    gender: "male" | "female";
    emergency?: string | undefined;
}, undefined>