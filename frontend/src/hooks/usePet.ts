import React, { useEffect, useState } from 'react'
import { Pet } from '../../src/types/pet'
import { getPets } from "services/api";

const usePet = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPets, setSelectedPets] = useState<number[]>([]);
    const [isPetModalVisible, setisPetModalVisible] = useState<boolean>(false);

    useEffect(() =>{
        const fetchPets = async () => {
            const pets = await getPets();
            setPets(pets);

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

      return {
        selectedPets,
        togglePet,
        handlePetSelection,
        isPetModalVisible,
        pets,
      }
}

export default usePet;