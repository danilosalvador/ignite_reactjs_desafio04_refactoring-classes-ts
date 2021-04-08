import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { useFoods } from '../../hooks/useFoods';
import { FoodItem } from '../../model/foodItem';

import { Container } from './styles';

interface FoodProps {
  food: FoodItem;
  openEditingFood: () => void;
}

export function Food({ food, openEditingFood }: FoodProps) {
  const { editFood, updateFood, deleteFood } = useFoods();

  const [isAvailable, setIsAvailable] = useState(food.available);

  async function handleDelete(id: number) {
    await deleteFood(id);
  }

  async function toggleAvailable() {
    await updateFood({
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  }

  function setEditingFood() {
    editFood(food);
    openEditingFood();
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          <b>{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(food.price)}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};
