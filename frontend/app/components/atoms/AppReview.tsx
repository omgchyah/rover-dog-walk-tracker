import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Review } from '@/types/place'
import Stars from './Stars';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;

interface AppReviewInterface {
    review: Review;
}

const AppReview = (
    {review}:
    AppReviewInterface
) => {
  return (
    <View
    style={styles.card}
    >
        <Text style={styles.authorName}>{review.author_name}</Text>
        <View style={styles.starDate}>

        <Stars avg_review={review.star} />
        <Text>{review.created_at ?
        new Date(review.created_at).toLocaleDateString() : 'Recent'}</Text>
        </View>
        <Text style={styles.title}>{review.title}</Text>
        <Text style={styles.body}>{review.body}</Text>
    </View>
  )
}

export default AppReview

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        marginRight: 12,
        width: CARD_WIDTH,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        overflow: 'hidden',
      },
      authorName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#202124',
        marginBottom: 4,
      },
      starDate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
      },
      dateText: {
        fontSize: 12,
        color: '#70757A',
        marginLeft: 8,
      },
      title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#202124',
        marginBottom: 4,
      },
      body: {
        fontSize: 14,
        color: '#3C4043',
        lineHeight: 20,
        flexWrap: 'wrap',
      },
})