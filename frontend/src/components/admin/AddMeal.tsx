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
  ingredients: string;
  specialInstructions?: string;
};

const formSchema = z.object({
  name: z.string(),
  ingredients: z.string(),
  specialInstructions: z.string().optional(),
});

export default function AddMealComp() {
  const form = useForm<formPantryData>({ resolver: zodResolver(formSchema) });
  const nameRef = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const specialInstructionsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const data = {
      name: nameRef.current?.value,
      ingredients: ingredientsRef.current?.value,
      specialInstructions: specialInstructionsRef.current?.value,
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
          name="Name of Meal"
          refs={nameRef}
          required={true}
          type={"text"}
          placeholder={"Enter name"}
        />
        <FormItems
          form={form}
          name={"Ingredients"}
          required={true}
          refs={ingredientsRef}
          pattern={"[0-9]{10}"}
          type={"tel"}
          placeholder={"Enter the phone number"}
        />
        <FormItems
          form={form}
          name={"Special Instructions"}
          refs={specialInstructionsRef}
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
