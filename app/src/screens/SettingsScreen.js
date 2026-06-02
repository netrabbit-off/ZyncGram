import { useContext, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

// Контекст
import { ThemeContext } from "../contexts/ThemeContext";
// Стили
import { styles } from "../styles/styles";

const SettingsScreen = () => {
    const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);
    const [autoStart, setAutoStart] = useState(true);
    const [saveStats, setSaveStats] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
        <View>
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>Внешний вид</Text>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>🌙 Темная тема</Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>
            </View>

            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>Бот</Text>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>🚀 Автозапуск бота</Text>
                    <Switch value={autoStart} onValueChange={setAutoStart} />
                </View>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>📊 Сохранять статистику</Text>
                    <Switch value={saveStats} onValueChange={setSaveStats} />
                </View>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>🔔 Уведомления</Text>
                    <Switch value={notifications} onValueChange={setNotifications} />
                </View>
            </View>

            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>Синхронизация</Text>
                <TouchableOpacity style={styles.syncButton}>
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>🔄 Синхронизировать сейчас</Text>
                </TouchableOpacity>
                <Text style={[styles.lastSync, { color: theme.subtext }]}>Последняя синхронизация: сегодня, 15:30</Text>
            </View>

            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>О приложении</Text>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Версия</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>1.0.0</Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Бэкенд</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>Go + gogram</Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Приложение</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>React Native + Expo</Text>
                </View>
            </View>
        </View>
    );
}

export default SettingsScreen;
