import { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ReactionsScreen from './src/screens/ReactionsScreen';
import FeaturesSettings from './src/screens/FeaturesSettings';
import InitialSettingsScreen from './src/screens/InitialScreen';

import { ThemeContext, ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { styles } from './src/styles/styles';

function AppContent() {
    const { activeTab, setActiveTab } = useContext(ThemeContext);
    const { theme } = useTheme();

    AsyncStorage.getItem("isConfigured").then((value) => {
        if (!value || value === null) {
            setActiveTab("initial");
        }
    })

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
                {['home', 'stats', 'settings'].map(tab => (
                    <TouchableOpacity
                            key={tab}
                            style={[styles.tab, (activeTab === tab || (activeTab === 'reactions' || activeTab === 'profile' || activeTab === 'features') && tab === 'settings') && { borderBottomColor: theme.accent }]}
                            onPress={() => setActiveTab(tab)}
                        >
                        <Text style={[styles.tabText, { color: (activeTab === tab || (activeTab === 'reactions' || activeTab === 'profile' || activeTab === 'features') && tab === 'settings') ? theme.accent : theme.subtext }]}>
                            {tab === 'home' && '🏠 Главная'}
                            {tab === 'stats' && '📊 Статистика'}
                            {tab === 'settings' && '⚙️ Настройки'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView style={[styles.content, { backgroundColor: theme.background }]}>
                {activeTab === 'home' && <HomeScreen />}
                {activeTab === 'stats' && <StatsScreen />}
                {activeTab === 'profile' && <ProfileScreen />}
                {activeTab === 'settings' && <SettingsScreen />}
                {activeTab === 'reactions' && <ReactionsScreen />}
                {activeTab === 'features' && <FeaturesSettings />}
                {activeTab === 'initial' && <InitialSettingsScreen />}
            </ScrollView>
        </View>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
