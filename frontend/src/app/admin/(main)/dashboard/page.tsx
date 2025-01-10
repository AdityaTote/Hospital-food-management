import MealPreparationStats from "@/components/admin/MealPreparedStats";

export default function AdminDashboard(){

    // const meal =[
    //     {name: "chicken", time: "morning", deliverd: true},
    //     {name: "mutton", time: "noon", deliverd: false},
    // ]

    return(
        <div className="flex flex-col gap-4">
            <MealPreparationStats/>
        </div>
    )
}