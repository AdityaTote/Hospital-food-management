"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormItems from "../ui/FormItem";
import { Form } from "@/components/ui/form";
import { useRef, useState } from "react";
import { GenderDropDown } from "../GenderDropDown";
import { Label } from "../ui/label";

type formPatientData = {
  name: string;
  disease: string;
  allergy: string;
  roomNo: string;
  floorNo: string;
  age: number;
  gender: "male" | "female";
  phone: string;
  emergency?: string;
  address: string;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  disease: z.string().min(2, {
    message: "Disease must be at least 2 characters.",
  }),
  allergy: z.string().min(2, {
    message: "Allergy must be at least 2 characters.",
  }),
  roomNo: z.string().min(2, {
    message: "Room No must be at least 2 characters.",
  }),
  floorNo: z.string().min(2, {
    message: "Floor No must be at least 2 characters.",
  }),
  age: z.number().min(1, { message: "Age must be at least 1." }),
  gender: z.enum(["male", "female"]),
  phone: z.string().length(10, { message: "Phone must be 10 characters." }),
  emergency: z.string().optional(),
  address: z.string(),
});

export default function AddPaitentComp() {
  const form = useForm<formPatientData>({ resolver: zodResolver(formSchema) });
  const usernameRef = useRef<HTMLInputElement>(null);
  const diseaseRef = useRef<HTMLInputElement>(null);
  const allergyRef = useRef<HTMLInputElement>(null);
  const roomNoRef = useRef<HTMLInputElement>(null);
  const floorNoRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emergencyRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState("");

  const handleSubmit = async () => {
    console.log(gender);
    const data = {
      name: usernameRef.current?.value,
      disease: diseaseRef.current?.value,
      allergy: allergyRef.current?.value,
      roomNo: roomNoRef.current?.value,
      floorNo: floorNoRef.current?.value,
      age: ageRef.current?.value,
      gender: gender,
      phone: phoneRef.current?.value,
      emergency: emergencyRef.current?.value,
      address: addressRef.current?.value,
    };
    const patientData = formSchema.safeParse({ data });
    console.log(patientData);
    alert("hello");
  };

  return (
    <Form {...form}>
      <form className="space-y-2 pl-10">
        <FormItems
          form={form}
          name="Username"
          refs={usernameRef}
          required={true}
          type={"text"}
          placeholder={"Enter username"}
        />
        <FormItems
          form={form}
          name={"Disease"}
          refs={diseaseRef}
          required={true}
          type={"text"}
          placeholder={"Enter the name disease"}
        />
        <FormItems
          form={form}
          name={"Allergy"}
          type={"text"}
          required={true}
          refs={allergyRef}
          placeholder={"Enter the name allergy"}
        />
        <div className="flex space-x-4">
          <FormItems
            form={form}
            name={"Room No"}
            refs={roomNoRef}
            required={true}
            type={"text"}
            placeholder={"Enter the room number"}
          />
          <FormItems
            form={form}
            name={"Floor No"}
            required={true}
            refs={floorNoRef}
            type={"text"}
            placeholder={"Enter the floor number"}
          />
        </div>
        <div className="flex space-x-4">
          <FormItems
            form={form}
            name={"Age"}
            refs={ageRef}
            required={true}
            type={"number"}
            placeholder={"Enter the age"}
          />
          <div className={"flex flex-col gap-4 justify-center"}>
            <Label className={"text-sm font-semibold"}>Gender</Label>
            <GenderDropDown value={gender} setValue={setGender} />
          </div>
        </div>
        <div className="flex space-x-4">
          <FormItems
            form={form}
            name={"Phone No."}
            required={true}
            refs={phoneRef}
            pattern={"[0-9]{10}"}
            type={"tel"}
            placeholder={"Enter the phone number"}
          />
          <FormItems
            form={form}
            name={"Emergency Contact"}
            required={false}
            refs={emergencyRef}
            pattern={"[0-9]{10}"}
            type={"tel"}
            placeholder={"Enter the emergency contact"}
          />
        </div>
        <FormItems
          form={form}
          name={"Address"}
          required={true}
          refs={addressRef}
          type={"text"}
          placeholder={"Enter the address"}
        />
        <div className="flex justify-center items-center pt-4">
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
