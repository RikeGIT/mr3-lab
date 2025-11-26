import connectDB from "@/lib/db";
import Equipment from "@/models/Equipment";
import EquipmentList from "@/components/EquipmentList";
import CreateItemModal from "@/components/CreateItemModal"; // 👈 Importe aqui

async function getEquipments() {
  await connectDB();
  const items = await Equipment.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(items));
}

export default async function DashboardPage() {
  const equipments = await getEquipments();

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel de Equipamentos 🔬</h1>
          
          <CreateItemModal />
        </div>

        <EquipmentList items={equipments} />
      </main>
    </div>
  );
}