import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function MealPreparationStats(){
  return(
    <Card>
      <CardHeader>
        <CardTitle>Total Meal Prepared</CardTitle>
      </CardHeader>
      <div className="flex justify-center items-center">
      <CardContent>
        <h1 className="text-4xl font-semibold">20</h1>
      </CardContent>
      </div>
    </Card>
  )
}