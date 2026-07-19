import { Switch, Text, TouchableOpacity, View, Linking } from "react-native";

// Стили
import { styles } from "../styles/styles";
import { darkTheme } from "../styles/theme";

const SettingsScreen = ({ setActiveTab }) => {
    const theme = darkTheme

    const openGitHub = () => {
        Linking.openURL("https://github.com/netrabbit-off/ZyncGram");
    };
    // Переход к настройке авто-реакций
    const goToAutoReactions = () => {
        setActiveTab("reactions");
    };
    // Переход к настройке автоматика
    const goToFeatures = () => {
        setActiveTab("features");
    };
    // Переход в профиль
    const goToProfile = () => {
        setActiveTab("profile");
    };

    return (
        <View>
            {/* Профиль */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]} onPress={goToProfile}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>👤 Профиль</Text>
                    <Text style={{ color: theme.subtext, fontSize: 16 }}>›</Text>
                </TouchableOpacity>
            </View>

            {/* Автоматика */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>✨ Автоматика</Text>
                <TouchableOpacity style={styles.syncButton} onPress={goToFeatures}>
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>⚙️ Настроить автоматику</Text>
                </TouchableOpacity>
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
                <View style={[styles.aboutRow]}>
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
