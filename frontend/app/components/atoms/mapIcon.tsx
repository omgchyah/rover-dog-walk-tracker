import { MaterialCommunityIcons, FontAwesome6, FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';

export const mapIcon = (category: string) => {
  switch (category) {
    case 'Lodging':
      return { lib: FontAwesome6, name: 'bed', color: COLORS.lodging };
    case 'Cafe':
      return { lib: MaterialCommunityIcons, name: 'coffee', color: COLORS.food };
    case 'Restaurant':
      return { lib: MaterialCommunityIcons, name: 'silverware-fork-knife', color: COLORS.food };
    case 'Park':
        return { lib: FontAwesome5, name: 'tree', color: COLORS.nature };
    case "Pipí can":
        return { lib: FontAwesome6, name: 'tree-city', color: COLORS.nature };
    case "Fun":
        return { lib: FontAwesome, name: 'gamepad', color: COLORS.fun };
    case "Business":
        return { lib: Ionicons, name: 'business', color: COLORS.info };
    case "Store":
        return { lib: FontAwesome5, name: 'store', color: COLORS.info };
    default:
      return { lib: MaterialCommunityIcons, name: 'map-marker', color: '#3498db' };
  }
};

export default mapIcon;