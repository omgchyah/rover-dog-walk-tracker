import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import AppInput from '../atoms/AppInput'
import { Coordinate } from '@/types/location'
import usePlaceForm from '../../../src/hooks/usePlaceForm';
import AppSelect from '../molecules/AppSelect';
import AppSwitch from '../atoms/AppSwitch';
import { Category, Place } from '../../../src/types/place'
import AppButton from '../atoms/AppButton';
import ErrorText from '../atoms/ErrorText';
import useSpotter from '@/hooks/useSpotter';

interface PlaceFormInterface {
    tempCoordinate: Coordinate;
    onSuccess: (newPlace: Place) => void;
}

const PlaceForm = (
    {tempCoordinate, onSuccess}:
    PlaceFormInterface
) => {
    const { formData, updateField, handleValidation, loading, errors } = usePlaceForm({
        tempCoordinate,
    onSuccess: (newPlace) => {
        onSuccess(newPlace);
    }
    });

  return (
    <ScrollView
    keyboardShouldPersistTaps='handled'>

        {errors.submit && <ErrorText message={errors.submit}/>}

        {errors.name && <ErrorText message={errors.name}/>}    
        <AppInput label='Name' placeholder='Write name of establishment'
        required value={formData.name} onChange={(text) => updateField('name', text)}
        />

{errors.description && <ErrorText message={errors.description}/>}
        <AppInput label='Description' placeholder='Provide a brief description'
        required={false} value={formData.description} onChange={(text) => updateField('description', text)}
        />

{errors.category && <ErrorText message={errors.category}/>}
        <AppSelect label='Choose a category'
        categories={Object.values(Category)}
        selectedCategory={formData.category}
        onSelect={(cat) => updateField('category', cat)}
        />

        <AppSwitch label='Does it allow unleashed pets?' value={formData.allows_unleashed} toggleSwitch={() => updateField('allows_unleashed', !formData.allows_unleashed)} />

        <AppSwitch label='Does it require an entry fee?' value={formData.requires_entry_fee} toggleSwitch={() => updateField('requires_entry_fee', !formData.requires_entry_fee)} />

        <AppSwitch label='Is it an enclosed space?' value={formData.is_enclosed} toggleSwitch={() => updateField('is_enclosed', !formData.is_enclosed)} />

        <AppButton
        title='Submit'
        variant='primary'
        onPress={handleValidation}
        disabled={loading}
        />

    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({})