import { useState } from 'react';

import { useFoods } from '../../hooks/useFoods';

import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

export function Dashboard() {
  const { foods } = useFoods();
  
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleOpenEditingFood() {
    setEditModalOpen(true);
  }

  function toggleAddModal() {
    setAddModalOpen(!addModalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  return (
    <>
      <Header openAddModal={toggleAddModal} />

      <ModalAddFood
        isOpen={addModalOpen}
        setIsOpen={toggleAddModal}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              openEditingFood={handleOpenEditingFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
