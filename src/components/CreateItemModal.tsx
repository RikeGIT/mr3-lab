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
  SelectItem
} from "@heroui/react";
import { createEquipment } from "@/actions/equipment";
import { useState } from "react";

export default function CreateItemModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading, setLoading] = useState(false);

  // Função que roda quando clica em Salvar
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>, onClose: () => void) {
    event.preventDefault(); // Não deixa a tela piscar
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    await createEquipment(formData);
    
    setLoading(false);
    onClose(); // Fecha o modal
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="shadow">
        + Novo Item
      </Button>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
                Cadastrar Equipamento
              </ModalHeader>
              
              <ModalBody>
                <Input
                  autoFocus
                  label="Nome do Equipamento"
                  name="name"
                  placeholder="Ex: Câmera Canon T7i"
                  variant="bordered"
                  required
                />
                <Textarea
                  label="Descrição"
                  name="description"
                  placeholder="Detalhes do item, estado de conservação..."
                  variant="bordered"
                />
                <Select 
                  label="Status Inicial" 
                  name="status"
                  defaultSelectedKeys={["disponivel"]}
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
                  Salvar Item
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}