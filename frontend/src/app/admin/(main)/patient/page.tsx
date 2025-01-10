import AddPaitentComp from "@/components/admin/AddPatient";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

export default function AddPaitent() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-100">
      <Card className={"pr-11 py-4 flex flex-col justify-center items-center"}>
        <Label className="text-2xl font-bold">Add Patient</Label>
        <AddPaitentComp />
      </Card>
    </div>
  );
}
