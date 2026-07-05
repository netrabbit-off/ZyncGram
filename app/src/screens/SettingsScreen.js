import { useContext } from "react";
import { Switch, Text, TouchableOpacity, View, Linking, Alert } from "react-native";

// Контекст
import { ThemeContext } from "../contexts/ThemeContext";
// Стили
import { styles } from "../styles/styles";

const SettingsScreen = () => {
    const { isDarkMode, toggleTheme, theme, setActiveTab } = useContext(ThemeContext);

    // Открыть GitHub
    const openGitHub = () => {
        Linking.openURL("https://github.com/netrabbit-off/ZyncGram");
    };

    // Переход к настройке авто-реакций
    const goToAutoReactions = () => {
        setActiveTab("reactions")
    };

    return (
        <View>
            {/* Внешний вид */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>Внешний вид</Text>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>🌙 Тёмная тема</Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>
            </View>

            {/* Авто-реакции */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>🤖 Авто-реакции</Text>
                <TouchableOpacity style={styles.syncButton} onPress={goToAutoReactions}>
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>⚙️ Настроить авто-реакции</Text>
                </TouchableOpacity>
                <Text style={[styles.lastSync, { color: theme.subtext }]}>
                    Автоматические реакции на сообщения пользователей
                </Text>
            </View>

            {/* О приложении и GitHub */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>О приложении</Text>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Версия</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>1.0.0</Text>
                </View>
                <TouchableOpacity style={styles.syncButton} onPress={openGitHub}>
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>🐙 GitHub репозиторий</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;
