import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useSpotter from '../src/hooks/useSpotter';

jest.mock('react-native-maps', () => {
    const React = require('react');
    const { View } = require('react-native');

    class MockMapView extends React.Component {
        render() {
            return <View {...this.props}>{this.props.children}</View>;
        }
    }

    class MockMarker extends React.Component {
        render() {
            return <View {...this.props}>{this.props.children}</View>
        }
    }

    return {
        __esModule: true,
        default: MockMapView,
        Marker: MockMarker,
    };
});

jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('@expo/vector-icons/Foundation', () => 'Foundation');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0}),
}));


jest.mock('../src/hooks/useSpotter');

describe('MainMap -> SpotterModal', () => {
  it('should show the Modal to create new place when long pressed on the map', async () => {
    (useSpotter as jest.Mock).mockReturnValue({
      tempCoordinate: null,
      isSheetVisible: false,
      handleMapLongPress: jest.fn(),
      handleCancel: jest.fn(),
    });

    const { rerender } = render(<HomeScreen />);

    (useSpotter as jest.Mock).mockReturnValue({
      tempCoordinate: { latitude: 41.38, longitude: 2.17 },
      isSheetVisible: true,
      handleMapLongPress: jest.fn(),
      handleCancel: jest.fn(),
    });

    rerender(<HomeScreen />);

    const modalTitle = screen.getByText(/Name/i); 
    
    expect(modalTitle).toBeTruthy();
  });
});