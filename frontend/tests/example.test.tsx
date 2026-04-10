import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { render, screen } from '@testing-library/react-native';

const SimpleComponent = () => {
  return (
    <View>
      <Text>Example text</Text>
    </View>
  )
}

describe('Settinh up Jest', () => {
    it('should render the text correctly', () => {
        render(<SimpleComponent />);

        const textElement = screen.getByText('Example text');
        expect(textElement).toBeTruthy();
    });
});

