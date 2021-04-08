import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import { useFoods } from '../../hooks/useFoods';
import { FoodItem } from '../../model/foodItem';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { Form } from './styles';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export function ModalEditFood({
  isOpen,  
  setIsOpen,
}: ModalEditFoodProps) {
  const { editingFood, updateFood } = useFoods();

  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: FoodItem) {
    try {
      await updateFood({
        ...editingFood,
        ...data
      });

      setIsOpen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" required placeholder="Cole o link aqui" />

        <Input name="name" required placeholder="Ex: Moda Italiana" />
        <Input name="price" type="number" step="0.01" required placeholder="Ex: 19,90" />

        <Input name="description" required placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
