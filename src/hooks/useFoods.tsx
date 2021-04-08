import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import { FoodItem } from '../model/foodItem';

interface FoodsProviderProps {
  children: ReactNode
}

interface FoodsProviderData {
  foods: FoodItem[];
  editingFood: FoodItem;
  addFood: (foodItem: FoodItem) => Promise<void>;
  updateFood: (foodItem: FoodItem) => Promise<void>;
  deleteFood: (id: number) => Promise<void>;
  editFood: (foodItem: FoodItem) => void;
}

const FoodsContext = createContext<FoodsProviderData>(
  {} as FoodsProviderData
);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [editingFood, setEditingFood] = useState<FoodItem>({} as FoodItem);

  useEffect(() => {
    api.get<FoodItem[]>('/foods')
      .then(response => setFoods(response.data));
  }, []);

  async function addFood(foodItem: FoodItem) : Promise<void> {
    const response = await api.post<FoodItem>('/foods', {...foodItem, available: true});

    setFoods([
      ...foods, 
      response.data
    ]);
  }

  async function updateFood(foodItem: FoodItem) : Promise<void> {
    const foodUpdated = await api.put<FoodItem>(
      `/foods/${foodItem.id}`,
      foodItem,
    );

    const foodsUpdated = foods.map(item =>
      item.id !== foodUpdated.data.id ? item : foodUpdated.data,
    );

    setFoods(foodsUpdated);
  }

  async function deleteFood(id: number): Promise<void> {
    const listFoods = [...foods];

    await api.delete(`/foods/${id}`);

    const foodIndex = foods.findIndex(item => item.id === id);

    if (foodIndex !== -1) {
      listFoods.splice(foodIndex, 1);

      setFoods(listFoods);
    }
  }

  function editFood(foodItem: FoodItem): void {
    setEditingFood(foodItem);
  }

  return (
    <FoodsContext.Provider value={{ 
      foods, 
      editingFood, 
      addFood, 
      updateFood, 
      deleteFood, 
      editFood 
    }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);

  if (!context) {
    throw new Error('useFoods deve ser usado dentro de um FoodsProvider');
  }

  return context;
}
