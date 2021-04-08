import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import { useFoods } from '../../hooks/useFoods';
import { FoodItem } from '../../model/foodItem';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { Form } from './styles';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export function ModalAddFood({isOpen, setIsOpen }: ModalAddFoodProps) {
  const { addFood } = useFoods();
  
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: FoodItem) {
    try {
      await addFood(data);

      setIsOpen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" type="number" step="0.01" placeholder="Ex: 19,90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
