import { StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg';

const ChevronIcon = ({ color = '#C9CFD4', size = 20 }) => (
    <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <Path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

export default ChevronIcon

const styles = StyleSheet.create({})