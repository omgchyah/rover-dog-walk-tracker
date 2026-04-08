import { StyleSheet, Text, Modal, Pressable, View, ScrollView } from 'react-native'
import React from 'react'
import { Place, Review } from '@/types/place';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import COLORS from '@/theme/colors';
import Stars from '../atoms/Stars';
import Foundation from '@expo/vector-icons/Foundation';
import AppReview from '../atoms/AppReview';

interface PlaceDetailModalInterface {
    place: Place | null;
    handleCloseModal: () => void;
}

const PlaceDetailModal = ({
    place, handleCloseModal
}: PlaceDetailModalInterface) => {
    const insets = useSafeAreaInsets();

    const reviews = place?.reviews;

  return (
    <Modal
    transparent={true}
    animationType='slide'
    >
        <Pressable
        style={styles.overlay}
        onPress={handleCloseModal}
        >


    <Pressable
    style={[
        styles.sheet,
        {paddingBottom: insets.bottom}
    
    ]}
    onPress={(e) => e.stopPropagation()}
    >
        {place && (
        
            <View style={styles.placeCard}>
                <View style={styles.headerSection}>

        <Text style={styles.title}>{place.name}</Text>

        <Text style={styles.category}>• {place.category}</Text>
                </View>
        
        {place.review_count
        ? (
            <View style={styles.rowContainer}>
                <Text>{place.average_review}</Text>
                <Stars avg_review={place.average_review ?? 0} />
                <Text>({place.review_count})</Text>

            </View>
        ) : (
            <Text>No reviews.</Text>
        )
        }


<View style={styles.featureWrapper}>


        <View style={styles.featureItem}>
        {place.allows_unleashed ? <FontAwesome name="check" size={18} color={COLORS.nature} /> : <Foundation name="prohibited" size={18} color={COLORS.danger} />}

        <Text style={styles.featureText}>Unleashed pets </Text>
        </View>

        <View style={styles.featureItem}>
        {place.requires_entry_fee ? <Foundation name="prohibited" size={18} color={COLORS.danger} /> : <FontAwesome name="check" size={18} color={COLORS.nature} />}
        <Text style={styles.featureText}>Free entry </Text>
        </View>

        <View style={styles.featureItem}>
        {place.is_enclosed ? <FontAwesome name="check" size={18} color={COLORS.nature} /> : <Foundation name="prohibited" size={18} color={COLORS.danger} />}
        <Text style={styles.featureText}>Enclosed area </Text>
        
        </View>
</View>

        
        <Text style={styles.description}>{place.description}</Text>

        <View style={styles.reviewsSection}>
                                <Text style={styles.sectionTitle}>Reviews</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.reviewsScroll}
                                >
                                    {reviews && reviews.length > 0 ? (
                                        reviews.map((item: Review, index: number) => (
                                            <AppReview key={index} review={item} />
                                        ))
                                    ) : (
                                        <Text style={styles.noReviews}>Be the first to leave a review!</Text>
                                    )}
                                </ScrollView>
                            </View>
                
                
    </View>

    

             )}


    </Pressable>
        </Pressable>

    </Modal>
  )
}

export default PlaceDetailModal

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        justifyContent: 'flex-end'
    },
    sheet: {
        maxHeight: '85%',
        height: '70%',
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          padding: 24,
        
    },
    placeCard: {
        gap: 2,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 2,
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    color: '#202124',
        
    },
    category: {
        fontWeight: '400',
        fontSize: 14,
        color: '#70757a'
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        alignContent: 'center',
    },
    featureWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#f1f3f4',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    featureText: {
        fontSize: 12,
        color: '#3c4043',
    },
    description: {
        fontSize: 15,
        color: '#3c4043',
        lineHeight: 20,
        marginTop: 12,
    },
    reviewsSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        color: '#202124',
    },
    reviewsScroll: {
        paddingRight: 20,
    },
    noReviews: {
        color: '#70757a',
        fontStyle: 'italic',
        marginTop: 5,
    }

});