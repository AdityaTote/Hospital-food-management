import { RefObject } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";

interface AdminFormItemProps {
  form: any;
  name: string;
  placeholder: string;
  type: string;
  refs: RefObject<HTMLInputElement | null>;
  required: boolean;
  pattern?: string;
}

export default function FormItems({
  placeholder,
  name,
  type,
  refs,
  pattern,
  required=false
}: AdminFormItemProps) {
  return (
    <FormField
    name={name}
    render={() => (
      <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
          {required === true ? <Input type={type} ref={refs} pattern={pattern}  required  placeholder={placeholder}/> : <Input type={type} ref={refs} pattern={pattern} placeholder={placeholder} />}
          </FormControl>
        </FormItem>
      )}
    />
  );
}