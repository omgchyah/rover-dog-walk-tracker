import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import AppInput from '../atoms/AppInput'
import { Coordinate } from '@/types/location'
import usePlaceForm from '../../../src/hooks/usePlaceForm';
import AppSelect from '../molecules/AppSelect';
import AppSwitch from '../atoms/AppSwitch';
import { Category } from '../../../src/types/place'

interface PlaceFormInterface {
    tempCoordinate: Coordinate;
}

const PlaceForm = (
    {tempCoordinate}:
    PlaceFormInterface
) => {

    const { formData, updateField } = usePlaceForm(tempCoordinate);

  return (
    <ScrollView
    keyboardShouldPersistTaps='handled'>
    
        <AppInput label='Name' placeholder='Write name of establishment'
        required value={formData.name} onChange={(text) => updateField('name', text)}
        />

        <AppInput label='Description' placeholder='Provide a brief description'
        required value={formData.description} onChange={(text) => updateField('description', text)}
        />

        <AppSelect label='Choose a category'
        categories={Object.values(Category)}
        selectedCategory={formData.category}
        onSelect={(cat) => updateField('category', cat)}
        />

        <AppSwitch label='Does it allow unleashed pets?' value={formData.allows_unleashed} toggleSwitch={() => updateField('allows_unleashed', !formData.allows_unleashed)} />

        <AppSwitch label='Does it require an entry fee?' value={formData.requires_entry_fee} toggleSwitch={() => updateField('requires_entry_fee', !formData.requires_entry_fee)} />

        <AppSwitch label='Is it an enclosed space?' value={formData.is_enclosed} toggleSwitch={() => updateField('is_enclosed', !formData.is_enclosed)} />


    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({})