import React, { useEffect, useState } from 'react'
import { Pet } from '../../src/types/pet'
import { getPets } from "services/api";

const usePet = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPets, setSelectedPets] = useState<number[]>([]);
    const [isPetModalVisible, setisPetModalVisible] = useState<boolean>(false);

    useEffect(() =>{
        const fetchPets = async () => {
          try {
            const data = await getPets();
            setPets(data);
        } catch (error) {
            console.error("Error:", error);
        }

        };
        fetchPets();
    }, [])

    const handlePetSelection = () => {
        setisPetModalVisible(prev => !prev);
    }


      const togglePet = (id: number) => {
        setSelectedPets(prev =>
          prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
      };

      const clearPets = () => {
        setSelectedPets(prev => []);
      }

      return {
        selectedPets,
        togglePet,
        handlePetSelection,
        isPetModalVisible,
        pets,
        clearPets
      }
}

export default usePet;