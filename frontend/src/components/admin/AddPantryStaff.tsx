"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormItems from "../ui/FormItem";
import { Form } from "@/components/ui/form";
import { useRef } from "react";

type formPantryData = {
  name: string;
  contactInfo: string;
  location: string;
  email: string;
  password: string;
};

const formSchema = z.object({
  name: z.string(),
  contactInfo: z.string(),
  location: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AddPantryStaffComp() {
  const form = useForm<formPantryData>({ resolver: zodResolver(formSchema) });
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const data = {
      name: nameRef.current?.value,
      phone: phoneRef.current?.value,
      location: locationRef.current?.value,
      password: passwordRef.current?.value,
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
          name="Name"
          refs={nameRef}
          required={true}
          type={"text"}
          placeholder={"Enter name"}
        />
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
          name={"Location"}
          refs={locationRef}
          required={true}
          type={"text"}
          placeholder={"Enter the name disease"}
        />
        <FormItems
          form={form}
          name={"Allergy"}
          type={"password"}
          required={true}
          refs={passwordRef}
          placeholder={"Enter the password"}
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
