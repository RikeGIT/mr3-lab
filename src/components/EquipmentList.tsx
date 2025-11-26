'use client';

import { 
  Card, CardHeader, CardBody, CardFooter, 
  Button, Chip, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure 
} from "@heroui/react";
import { deleteEquipment } from "@/actions/equipment";
import { useState } from "react";
import EditItemModal from "./EditItemModal";

interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function EquipmentList({ items }: { items: EquipmentItem[] }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); // Controle do Modal
  const [deleteId, setDeleteId] = useState<string | null>(null); // Qual item será deletado?
  const [loading, setLoading] = useState(false); // Loading do botão de confirmar

  // 1. Quando clica no botão "Excluir" do card
  const handleOpenDelete = (id: string) => {
    setDeleteId(id);
    onOpen();
  }

  // 2. Quando confirma dentro do Modal
  const handleConfirmDelete = async (onClose: () => void) => {
    if (!deleteId) return;

    setLoading(true);
    await deleteEquipment(deleteId);
    setLoading(false);
    onClose(); // Fecha o modal
    setDeleteId(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item._id} className="py-4 shadow-medium border-none">
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
              <h4 className="font-bold text-large mt-2 text-black dark:text-white">{item.name}</h4>
            </CardHeader>
            
            <CardBody className="overflow-visible py-2">
              <p className="text-gray-500 text-sm line-clamp-2">
                {item.description || "Sem descrição definida."}
              </p>
            </CardBody>
            
            <CardFooter className="gap-2">
              <EditItemModal item={item} />

              <Button 
                className="flex-1 bg-[#991b1b] text-white data-[hover=true]:bg-[#450a0a]"
                variant="flat" 
                size="sm"
                onPress={() => handleOpenDelete(item._id)}
              >
                Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="col-span-3 text-center py-10">
              <p className="text-gray-500 text-xl">Nenhum equipamento cadastrado.</p>
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Confirmar Exclusão</ModalHeader>
              <ModalBody>
                <p className="text-gray-600">
                  Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={() => handleConfirmDelete(onClose)} isLoading={loading}>
                  Sim, Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}