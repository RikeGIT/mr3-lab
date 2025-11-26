import connectDB from "@/lib/db";
import Equipment from "@/models/Equipment";
import EquipmentList from "@/components/EquipmentList";
import CreateItemModal from "@/components/CreateItemModal";
import LogoutButton from "@/components/LogoutButton";

async function getEquipments() {
  await connectDB();
  const items = await Equipment.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(items));
}

export default async function DashboardPage() {
  const equipments = await getEquipments();

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto p-6">
        <div className="flex justify-end items-center mb-8 gap-3">
          {/* <h1 className="text-3xl font-bold">Painel de Equipamentos 🔬</h1> */}
          
          <CreateItemModal />
          <LogoutButton />
        </div>

        <EquipmentList items={equipments} />
      </main>
    </div>
  );
}