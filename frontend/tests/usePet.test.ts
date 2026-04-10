import { getPets } from '../services/api'
import usePet from '../src/hooks/usePet'
import { renderHook, waitFor, act } from '@testing-library/react-native';

jest.mock('../services/api');

const mockPets = [
    {
      id: 1,
      name: 'Quesito',
      breed: 'Pomeranian',
      is_social: true,
      is_pipican_allowed: true,
      image_url: 'https://test.com/quesito.jpg'
    }
  ];

  describe('Hook: usePet', () => {
    it('should load the pets when mounted', async () => {
        (getPets as jest.Mock).mockResolvedValue(mockPets);

        const { result } = renderHook(() => usePet());

        expect(result.current.pets).toEqual([]);

        await waitFor(() => {
            expect(result.current.pets).toHaveLength(1);
        });

        expect(result.current.pets[0].name).toBe('Quesito');

    });
  });

describe('Hook: togglePet', () => {
    it('should add the pet id to the selectedPets array', async () => {
        (getPets as jest.Mock).mockResolvedValue(mockPets);

        const { result } = renderHook(() => usePet());

        expect(result.current.pets).toEqual([]);

        await waitFor(() => {
            expect(result.current.pets).toHaveLength(1);
        });

        const petIdToSelect = mockPets[0].id;

        act(() => {
            result.current.togglePet(petIdToSelect);
        });

        expect(result.current.selectedPets).toContain(petIdToSelect);
        expect(result.current.selectedPets).toHaveLength(1);



    });
});