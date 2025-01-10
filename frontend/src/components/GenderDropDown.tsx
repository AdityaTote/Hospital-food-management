"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropDownProps {
  value: string;
  setValue: (value: string) => void;
}

export function GenderDropDown({ value, setValue }: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {value !== "" ? <p>{value}</p> : <p>Gender</p>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="female">Female</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
