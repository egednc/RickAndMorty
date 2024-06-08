import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Checkbox from 'expo-checkbox';

interface Character {
    id: number;
    name: string;
    image: string;
    episode: string[];
}

const Dropdown = () => {
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        if (query.length > 0) {
            setLoading(true);
            setError('');
            axios
                .get(`https://rickandmortyapi.com/api/character/?name=${query}`)
                .then(response => {
                    setCharacters(response.data.results);
                })
                .catch(() => {
                    setError('Failed to fetch data');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [query]);

    const handleSelect = (character: Character) => {
        if (selectedCharacters.some(c => c.id === character.id)) {
            setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id));
        } else {
            setSelectedCharacters([...selectedCharacters, character]);
        }
    };

    const handleRemove = (character: Character) => {
        setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id));
    };

    const renderHighlightedText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <Text>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <Text key={index} style={$.bold}>
                            {part}
                        </Text>
                    ) : (
                        part
                    ),
                )}
            </Text>
        );
    };

    const renderSelectedCharacters = () => {
        return selectedCharacters.map(character => (
            <View key={character.id} style={$.selectedCharacter}>
                <Text style={$.selectedCharacterText}>{character.name}</Text>
                <TouchableOpacity onPress={() => handleRemove(character)}>
                    <Text style={$.removeText}>×</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <View style={$.container}>
            <View style={$.inputContainer}>
                {renderSelectedCharacters()}
                <TextInput
                    style={$.input}
                    placeholder="Search characters"
                    value={query}
                    onChangeText={text => {
                        setQuery(text);
                        setDropdownVisible(true);
                    }}
                />
            </View>
            {loading && <ActivityIndicator style={$.loading} />}
            {isDropdownVisible && !loading && characters.length > 0 && (
                <ScrollView style={$.dropdown}>
                    {characters.map(character => (
                        <View key={character.id} style={$.dropdownItem}>
                            <Checkbox
                                value={selectedCharacters.some(c => c.id === character.id)}
                                onValueChange={() => handleSelect(character)}
                            />
                            <Image source={{ uri: character.image }} style={$.image} />
                            <View style={$.textContainer}>
                                {renderHighlightedText(character.name, query)}
                                <Text>{`${character.episode.length} Episodes`}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
            {error && <Text style={$.error}>{error}</Text>}
        </View>
    );
};

const $ = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
    input: {
        flex: 1,
        minWidth: 100,
    },
    loading: {
        marginTop: 8,
    },
    dropdown: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 8,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    image: {
        marginLeft: 16,
        borderRadius: 8,
        width: 40,
        height: 40,
        marginRight: 8,
    },
    textContainer: {
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 8,
    },
    selectedCharacter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 4,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
    },
    selectedCharacterText: {
        marginRight: 4,
    },
    removeText: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default Dropdown;
