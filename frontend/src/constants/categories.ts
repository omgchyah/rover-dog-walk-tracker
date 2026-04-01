import COLORS from '@/theme/colors';
import { Category } from '../types/place';
import * as Icons from '../icons/mapIcon';


export const CATEGORY_UI_DATA = {
    [Category.PARK]: {
        label: "Park",
        icon: Icons.ParkIcon,
        color: COLORS.nature,
        
    },
    [Category.LODGING]: {
        label: "Lodging",
        icon: Icons.LodgingIcon,
        color: COLORS.info,
        
    },
    [Category.CAFE]: {
        label: "Cafe",
        icon: Icons.CafeIcon,
        color: COLORS.danger,
        
    },
    [Category.PIPI_CAN]: {
        label: "Pipí can",
        icon: Icons.DogIcon,
        color: COLORS.brown,
        
    },
    [Category.FUN]: {
        label: "Fun",
        icon: Icons.FunIcon,
        color: COLORS.fun,
        
    },
    [Category.BUSINESS]: {
        label: "Business",
        icon: Icons.BusinessIcon,
        color: COLORS.primary,
        
    },
    [Category.STORE]: {
        label: "Store",
        icon: Icons.StoreIcon,
        color: COLORS.success,
        
    },
    [Category.RESTAURANT]: {
        label: "Restaurant",
        icon: Icons.RestaurantIcon,
        color: COLORS.food,
        
    },
    
}