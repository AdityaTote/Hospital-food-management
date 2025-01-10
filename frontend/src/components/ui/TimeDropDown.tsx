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

export function TimeDropDown({ value, setValue }: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {value !== "" ? <p>{value}</p> : <p>Time</p>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          <DropdownMenuRadioItem value="morning">Morning</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="noon">Afternoon</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="night">Night</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
