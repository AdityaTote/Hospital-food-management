import AddPantryStaffComp from "@/components/admin/AddPantryStaff";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

export default function AddPantryStaff() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-100">
      <Card className={"pr-11 py-4 flex flex-col justify-center items-center"}>
        <Label className="text-2xl font-bold text-center">Add Pantry Staff</Label>
        <AddPantryStaffComp />
      </Card>
    </div>
  );
}
