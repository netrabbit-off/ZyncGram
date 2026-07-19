import { Text, TouchableOpacity, View, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';

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
        <View style={{ paddingBottom: 40 }}>
            {/* Профиль */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]} onPress={goToProfile}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="person-outline" size={24} color={theme.accent} style={{ marginRight: 12 }} />
                        <Text style={[styles.settingLabel, { color: theme.text }]}>Профиль</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={20} color={theme.subtext} />
                </TouchableOpacity>
            </View>

            {/* Автоматика */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Ionicons name="flash-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Автоматика</Text>
                </View>
                <TouchableOpacity style={styles.syncButton} onPress={goToFeatures}>
                    <Ionicons name="settings-outline" size={20} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>Настроить автоматику</Text>
                </TouchableOpacity>
            </View>

            {/* Авто-реакции */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Авто-реакции</Text>
                </View>
                <TouchableOpacity style={styles.syncButton} onPress={goToAutoReactions}>
                    <Ionicons name="settings-outline" size={20} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>Настроить авто-реакции</Text>
                </TouchableOpacity>
                <Text style={[styles.lastSync, { color: theme.subtext }]}>
                    Автоматические реакции на сообщения пользователей
                </Text>
            </View>

            {/* О приложении и GitHub */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Ionicons name="information-circle-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>О приложении</Text>
                </View>
                <View style={[styles.aboutRow]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Версия</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>1.0.0</Text>
                </View>
                <TouchableOpacity style={styles.syncButton} onPress={openGitHub}>
                    <Ionicons name="logo-github" size={20} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.syncButtonText, { color: theme.accent }]}>GitHub репозиторий</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;
