import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import AddDietComp from "@/components/admin/AddDiet";
import AddMealComp from "@/components/admin/AddMeal";

export default function AddMeal() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-100">
      <Card className={"pr-11 py-4 flex flex-col justify-center items-center"}>
        <Label className="text-2xl font-bold text-center">Add Meal</Label>
        <AddMealComp />
      </Card>
      <Card className={"pr-11 py-4 flex flex-col justify-center items-center"}>
        <Label className="text-2xl font-bold text-center">Add Diet</Label>
        <AddDietComp />
      </Card>
    </div>
  );
}
