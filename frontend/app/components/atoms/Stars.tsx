import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import COLORS from '@/theme/colors';

interface StarProps {
    avg_review: number;
}

const Stars = ({avg_review}: StarProps) => {

    const stars = Array(5).fill(0);

    return (
        <View
        style={styles.container}
        >

{            stars.map((_, index) => {
                const starNumber = index + 1;

                if (starNumber <= Math.floor(avg_review)) {
                    return <FontAwesome key={index} name="star" size={24} color={COLORS.food} />
                } else if (starNumber === Math.ceil(avg_review) && Math.ceil(avg_review) > avg_review) {
                    return <FontAwesome key={index} name="star-half-full" size={24} color={COLORS.food} />
                } else {
                    return <FontAwesome key={index} name="star-o" size={24} color={COLORS.food} />
                }

            })}

        </View>
        

    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }

});

export default Stars