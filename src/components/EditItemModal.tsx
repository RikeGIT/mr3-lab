'use client';

import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure, 
  Input, 
  Textarea,
  Select,
  SelectItem,
  Tooltip
} from "@heroui/react";
import { updateEquipment } from "@/actions/equipment";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi"; 

interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function EditItemModal({ item }: { item: EquipmentItem }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading, setLoading] = useState(false);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>, onClose: () => void) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    // Passamos o ID do item e os dados do formulário
    await updateEquipment(item._id, formData);
    
    setLoading(false);
    onClose();
  }

  return (
    <>
      {/* Botão que abre o modal */}
      <Button onPress={onOpen} color="primary" variant="ghost" size="sm" className="flex-1">
        Editar
      </Button>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={(e) => handleUpdate(e, onClose)}>
              <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
                Editar Equipamento
              </ModalHeader>
              
              <ModalBody>
                <Input
                  label="Nome"
                  name="name"
                  variant="bordered"
                  defaultValue={item.name}
                  required
                />
                <Textarea
                  label="Descrição"
                  name="description"
                  variant="bordered"
                  defaultValue={item.description}
                />
                <Select 
                  label="Status" 
                  name="status"
                  defaultSelectedKeys={[item.status]}
                  variant="bordered"
                >
                  <SelectItem key="disponivel">Disponível</SelectItem>
                  <SelectItem key="emprestado">Emprestado</SelectItem>
                  <SelectItem key="manutencao">Manutenção</SelectItem>
                </Select>
              </ModalBody>
              
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isLoading={loading}>
                  Salvar Alterações
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}