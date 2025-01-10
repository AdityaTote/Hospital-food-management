"use client";
import SideComponent from "./SideComponent";

interface SideBarProps {
  name: string;
}

export default function SiderBar({ name }: SideBarProps) {
  const foodAdmin = {
    name: "Food Admin",
    sideComponent: [
      { text: "Dashboard", link: "/admin/dashboard" },
      { text: "Add Patient", link: "/admin/patient" },
      { text: "Add Staff", link: "/admin/staff" },
      { text: "Add Meal", link: "/admin/add-meal" },
      { text: "Add Diet", link: "/admin/add-diet" },
      { text: "Assign Food", link: "/admin/assign-food" },
    ],
  };

  const pantryStaff = {
    name: "Pantry Staff",
    sideComponent: [
      { text: "Dashboard", link: "/pantry/dashboard" },
      { text: "Add Delivert Agent", link: "/pantry/patient" },
      { text: "Assign Food Delivery", link: "/pantry/assign-food-delivert" },
    ],
  };

  // const deliveryAgent = {
  //   name: "Delivery Agent",
  //   sideComponent: [
  //     { text: "Dashboard", link: "/pantry/dashboard" },
  //     { text: "Add Delivert Agent", link: "/pantry/patient" },
  //     { text: "Assign Food Delivery", link: "/pantry/assign-food-delivert" },
  //   ]
  // }

  switch (name) {
    case "Food Admin":
      return (
        <div>
          <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="flex justify-center pt-4 gap-2">
              <h1 className="text-2xl font-semibold">{foodAdmin.name} </h1>
            </div>
            <div className="pt-4">
              {foodAdmin.sideComponent.map((item, index) => (
                <SideComponent key={index} text={item.text} link={item.link} />
              ))}
            </div>
          </div>
        </div>
      );
    case "Pantry Staff":
      return (
        <div>
          <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="flex justify-center pt-4 gap-2">
              <h1 className="text-2xl font-semibold">{pantryStaff.name} </h1>
            </div>
            <div className="pt-4">
              {pantryStaff.sideComponent.map((item, index) => (
                <SideComponent key={index} text={item.text} link={item.link} />
              ))}
            </div>
          </div>
        </div>
      );
  }
}
