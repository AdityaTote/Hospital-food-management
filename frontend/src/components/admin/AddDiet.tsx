"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormItems from "../ui/FormItem";
import { Form } from "@/components/ui/form";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { TimeDropDown } from "../ui/TimeDropDown";

type formDietData = {
  name: string;
  time: string;
  mealId: string;
  patientId: string;
};

const formSchema = z.object({
  name: z.string(),
  time: z.enum(["morning", "noon", "night"]),
  mealId: z.string(),
  patientId: z.string(),
});

export default function AddDietComp() {
  const form = useForm<formDietData>({ resolver: zodResolver(formSchema) });
  const nameRef = useRef<HTMLInputElement>(null);
  const mealIdRef = useRef<HTMLInputElement>(null);
  const patientIdRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<string>("");

  const handleSubmit = async () => {
    const data = {
      name: nameRef.current?.value,
      time: time,
      mealId: mealIdRef.current?.value,
      patientId: patientIdRef.current?.value,
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
          name="Name of Diet"
          refs={nameRef}
          required={true}
          type={"text"}
          placeholder={"Enter name"}
        />
        <div className={"flex flex-col gap-2 justify-center"}>
          <Label className={"text-sm font-semibold"}>Time</Label>
          <TimeDropDown value={time} setValue={setTime} />
        </div>
        <FormItems
          form={form}
          name={"Ingredients"}
          required={true}
          refs={mealIdRef}
          pattern={"[0-9]{10}"}
          type={"tel"}
          placeholder={"Enter the phone number"}
        />
        <FormItems
          form={form}
          name={"Special Instructions"}
          refs={patientIdRef}
          required={false}
          type={"text"}
          placeholder={"Enter the name disease"}
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
