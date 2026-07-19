import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ReactionsScreen from './src/screens/ReactionsScreen';
import FeaturesSettings from './src/screens/FeaturesSettings';
import InitialSettingsScreen from './src/screens/InitialScreen';

import { styles } from './src/styles/styles';
import { darkTheme } from './src/styles/theme';

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const theme = darkTheme;

    // Проверяем, настроено ли приложение
    useEffect(() => {
        AsyncStorage.getItem("isConfigured").then((value) => {
            if (!value || value === 'false') {
                setActiveTab("initial");
            }
        });
    }, []);

    // Определяем, активна ли вкладка (с учётом вложенных)
    const isTabActive = (tab) => {
        if (tab === 'settings') {
            return activeTab === 'settings' || activeTab === 'reactions' || activeTab === 'profile' || activeTab === 'features';
        }
        return activeTab === tab;
    };

    // Получаем цвет текста для таба
    const getTabColor = (tab) => {
        return isTabActive(tab) ? theme.accent : theme.subtext;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Zync</Text>
                <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>
                    управление юзерботом
                </Text>
            </View>

            {/* Tab Bar */}
            <View style={[styles.tabBar, { backgroundColor: theme.cardBg, borderBottomColor: theme.border }]}>
                {['home', 'stats', 'settings'].map(tab => {
                    let iconName;
                    let label;
                    switch (tab) {
                        case 'home':
                            iconName = 'home-outline';
                            label = 'Главная';
                            break;
                        case 'stats':
                            iconName = 'stats-chart-outline';
                            label = 'Статистика';
                            break;
                        case 'settings':
                            iconName = 'settings-outline';
                            label = 'Настройки';
                            break;
                    }
                    const active = isTabActive(tab);
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                active && { borderBottomColor: theme.accent }
                            ]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Ionicons
                                name={iconName}
                                size={22}
                                color={active ? theme.accent : theme.subtext}
                            />
                            <Text style={[styles.tabText, { color: active ? theme.accent : theme.subtext }]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Content */}
            <ScrollView style={[styles.content, { backgroundColor: theme.background }]}>
                {activeTab === 'home' && <HomeScreen />}
                {activeTab === 'stats' && <StatsScreen />}
                {activeTab === 'profile' && <ProfileScreen />}
                {activeTab === 'settings' && <SettingsScreen setActiveTab={setActiveTab} />}
                {activeTab === 'reactions' && <ReactionsScreen />}
                {activeTab === 'features' && <FeaturesSettings />}
                {activeTab === 'initial' && <InitialSettingsScreen setActiveTab={setActiveTab} />}
            </ScrollView>
        </View>
    );
}
