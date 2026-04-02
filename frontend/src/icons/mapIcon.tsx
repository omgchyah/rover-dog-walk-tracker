import React from 'react';
import Svg, { G, Path, Circle, Rect } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

// 1. Lodging (Bed)
export const LodgingIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
      height={size} 
      width={size} 
      viewBox="0 -960 960 960"
    >
      <G fill={color}>
        {/* The Headboard/Left Post */}
        <Path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Z" />
        
        {/* The Mattress/Body (Filled Block) */}
        <Path d="M440-560h400v240H440z" />
        
        {/* The Pillow/Head Area (Solid Circle) */}
        <Circle cx="280" cy="-560" r="100" />
      </G>
    </Svg>
  );

// 2. Cafe (Coffee Cup)
export const CafeIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <G id="Environment / Coffee">
        {/* Cuerpo de la taza relleno */}
        <Path 
          d="M4 8.92285C4 8.41305 4.41305 8 4.92285 8H17.0767C17.5865 8 18 8.41305 18 8.92285V12.9998C18 16.8468 14.8966 19.9695 11.0567 20H10.9433C7.1034 19.9695 4 16.8468 4 12.9998V8.92285Z" 
          fill={color} 
        />
        {/* El asa de la taza */}
        <Path 
          d="M18 9H19.5C20.8807 9 22 10.1193 22 11.5C22 12.8807 20.8807 14 19.5 14H18V9Z" 
          fill={color} 
        />
        {/* El platito de abajo */}
        <Path 
          d="M4 20H18" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        {/* El vapor (humo) lo dejamos como líneas para que se entienda que está caliente */}
        <Path 
          d="M15 3L14 5M12 3L11 5M9 3L8 5" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </G>
    </Svg>
  );

export const RestaurantIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
    width={size} 
    height={size} 
    viewBox="0 -960 960 960"
    fill={color}
  >
    <Path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z" />
  </Svg>
);

// 4. Park (Tree)
export const ParkIcon = ({ color = '#27ae60', size = 24 }: IconProps) => (
  <Svg 
    width={size} 
    height={size} 
    viewBox="0 -960 960 960"
  >
    <Path 
      d="M558-80H402v-160H120l160-240h-80l280-400 280 400h-80l160 240H558v160Z" 
      fill={color} 
    />
  </Svg>
);

// 5. Pipí can (Dog) - Let's use a bone or dog icon for clarity
export const DogIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 436.785 436.785"
    >
      <G fill={color}>
        {/* Cuerpo y detalles principales */}
        <Path d="M434.562,76.253c-1.656-1.895-4.029-3.01-6.544-3.075l-44.219-1.146c-6.147-10.159-17.319-16.65-29.45-16.65
          c-1.294,0-2.581,0.073-3.86,0.218l-11.054-23.226c-1.537-3.231-4.839-5.23-8.42-5.127c-3.577,0.117-6.744,2.342-8.068,5.666
          l-6.016,15.11l-14.394-19.498c-2.308-3.127-6.362-4.419-10.054-3.204c-3.692,1.215-6.186,4.662-6.186,8.549v150.995
          c0,0-164.967,35.907-165.607,36.219c-10.604,1.422-21.143-1.31-29.727-7.721c-8.706-6.502-14.357-16.005-15.915-26.759
          c-1.558-10.753,1.164-21.469,7.665-30.174c6.502-8.705,16.004-14.357,26.757-15.915c4.92-0.713,8.329-5.278,7.616-10.198
          c-0.713-4.919-5.275-8.331-10.197-7.616c-15.512,2.248-29.219,10.401-38.598,22.959c-9.379,12.557-13.306,28.015-11.058,43.525
          c2.247,15.512,10.4,29.22,22.958,38.6c8.133,6.075,17.483,9.852,27.276,11.156c-1.827,3.778-3.58,8.186-4.968,13.204
          c-4.396,15.891-5.973,41.246,10.281,73.465l-26.406,35.866c-1.712,2.325-2.205,5.331-1.324,8.081l11.565,36.104
          c1.194,3.727,4.658,6.255,8.571,6.255h11.777c0.006,0,0.012,0,0.02,0c4.971,0,9-4.029,9-9c0-1.057-0.182-2.07-0.516-3.012
          l-5.092-18.279l75.044-51.939c0.229-0.159,0.452-0.329,0.666-0.509c7.26-6.097,13.024-13.28,17.194-21.414l94.665-1.674
          l15.443,98.224c0.688,4.378,4.46,7.603,8.891,7.603h9.691c4.971,0,9-4.029,9-9V302.724c11.568-5.962,14.228-18.303,14.23-28.383
          V149.618c37.415-0.701,67.39-28.437,71.533-66.468C437.005,80.649,436.218,78.148,434.562,76.253z" />
        
        {/* Detalle inferior / Patas */}
        <Path d="M59.414,388.566h-0.837c1.479-1.832,2.37-4.159,2.37-6.692c0-5.886-4.788-10.675-10.674-10.675h-0.696
          c1.479-1.832,2.37-4.159,2.37-6.692c0-5.887-4.788-10.676-10.674-10.676H28.816c-5.886,0-10.674,4.789-10.674,10.676
          c0,2.533,0.891,4.86,2.37,6.692h-0.696c-5.886,0-10.674,4.789-10.674,10.675c0,2.533,0.891,4.86,2.37,6.692h-0.837
          C4.789,388.566,0,393.355,0,399.242c0,5.886,4.789,10.675,10.676,10.675h48.738c5.886,0,10.674-4.789,10.674-10.675
          C70.088,393.355,65.3,388.566,59.414,388.566z" />
      </G>
    </Svg>
  );

// 6. Fun (Gamepad)
export const FunIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
      height={size} 
      width={size} 
      viewBox="0 -960 960 960" 
    >
      <Path 
        fill={color}
        d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z" 
      />
    </Svg>
  );

// 7. Business (Briefcase)
export const BusinessIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
      height={size} 
      width={size} 
      viewBox="0 -960 960 960"
    >
      {/* Back Suitcase - Remains an outline/L-shape */}
      <Path 
        fill={color} 
        d="M120-80q-33 0-56.5-23.5T40-160v-440h80v440h680v80H120Z" 
      />
      
      {/* Front Suitcase - The "Forefront" one, now fully filled */}
      {/* This combines the handle and the main body into a solid block */}
      <Path 
        fill={color} 
        d="M280-240q-33 0-56.5-23.5T200-320v-440h200v-80q0-33 23.5-56.5T480-920h160q33 0 56.5 23.5T720-840v80h200v440q0 33-23.5 56.5T840-240H280Zm200-520h160v-80H480v80Z" 
      />
    </Svg>
  );

// 8. Store (Shopping Bag)
export const StoreIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg 
      height={size} 
      width={size} 
      viewBox="0 -960 960 960"
    >
      <G fill={color}>
        {/* The Handle and Frame */}
        <Path d="M170-880l38 80h632q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130Z" />
        
        {/* The "Cone" / Basket Area (Now a filled block) */}
        <Path d="M246-720l96 200h280l110-200H246Z" />
        
        {/* Solid Wheel 1 */}
        <Circle cx="280" cy="-160" r="80" />
        
        {/* Solid Wheel 2 */}
        <Circle cx="680" cy="-160" r="80" />
      </G>
    </Svg>
  );