import { useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

// Контекст
import { ThemeContext } from "../contexts/ThemeContext";
// Стили
import { styles } from "../styles/styles";

const HomeScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [botActive, setBotActive] = useState(true);

    return (
        <View>
            {/* Статус бота */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <View style={styles.statusRow}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>🤖 Статус бота</Text>
                    <View style={[styles.statusBadge, botActive ? styles.statusActive : styles.statusInactive]}>
                        <Text style={styles.statusText}>{botActive ? 'Активен' : 'Остановлен'}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.toggleButton, { backgroundColor: botActive ? '#e74c3c' : '#27ae60' }]}
                    onPress={() => setBotActive(!botActive)}
                >
                    <Text style={styles.toggleButtonText}>
                        {botActive ? '⏸ Остановить бота' : '▶ Запустить бота'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Краткая статистика */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>📊 Сегодня</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: theme.accent }]}>156</Text>
                        <Text style={[styles.statLabel, { color: theme.subtext }]}>сообщений</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: theme.accent }]}>23</Text>
                        <Text style={[styles.statLabel, { color: theme.subtext }]}>команды</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: theme.accent }]}>12</Text>
                        <Text style={[styles.statLabel, { color: theme.subtext }]}>реакций</Text>
                    </View>
                </View>
            </View>

            {/* Активность по часам */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>⏰ Часы пик</Text>
                <View style={styles.hoursContainer}>
                    {['12', '15', '18', '21', '00'].map(hour => (
                        <View key={hour} style={styles.hourItem}>
                            <View style={[styles.hourBar, { height: Math.random() * 40 + 10, backgroundColor: theme.accent }]} />
                            <Text style={[styles.hourLabel, { color: theme.subtext }]}>{hour}:00</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Команды за неделю */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>📈 Команды (неделя)</Text>
                <View style={styles.weekRow}>
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                        <View key={day} style={styles.weekItem}>
                            <Text style={[styles.weekValue, { color: theme.text }]}>{[12, 8, 15, 20, 18, 25, 10][i]}</Text>
                            <Text style={[styles.weekLabel, { color: theme.subtext }]}>{day}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;
