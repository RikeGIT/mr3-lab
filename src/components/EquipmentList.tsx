'use client';

import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { deleteEquipment } from "@/actions/equipment";
import EditItemModal from "./EditItemModal";
import { useState } from "react";

interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function EquipmentList({ items }: { items: EquipmentItem[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    // Pergunta de segurança simples (pode ser um Modal depois se quiser refinar)
    const confirm = window.confirm("Tem certeza que deseja excluir este item?");
    
    if (confirm) {
      setLoadingId(id); // Ativa o loading só no botão clicado
      await deleteEquipment(id);
      setLoadingId(null);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item._id} className="py-4 bg-zinc-900 border border-zinc-800">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="flex justify-between w-full">
              <p className="text-tiny uppercase font-bold text-gray-400">
                ID: {item._id.slice(-4)}
              </p>
              <Chip 
                color={item.status === 'disponivel' ? "success" : "warning"} 
                size="sm" 
                variant="flat"
              >
                {item.status}
              </Chip>
            </div>
            <h4 className="font-bold text-large mt-2">{item.name}</h4>
          </CardHeader>
          
          <CardBody className="overflow-visible py-2">
            <p className="text-gray-400 text-sm line-clamp-2">
              {item.description || "Sem descrição definida."}
            </p>
          </CardBody>
          
          <CardFooter className="gap-2">
            {/* Botão de Editar (Faremos em breve) */}
            <EditItemModal item={item} />

            {/* Botão de Excluir */}
            <Button 
              className="flex-1" 
              color="danger" 
              variant="flat" 
              size="sm"
              isLoading={loadingId === item._id}
              onPress={() => handleDelete(item._id)}
            >
              Excluir
            </Button>
          </CardFooter>
        </Card>
      ))}

      {items.length === 0 && (
        <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 text-xl">Nenhum equipamento cadastrado.</p>
            <p className="text-gray-600 text-sm">Clique em "+ Novo Item" para começar.</p>
        </div>
      )}
    </div>
  );
}