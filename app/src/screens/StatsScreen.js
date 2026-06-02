import { useContext } from "react";
import { Text, View } from "react-native";

// Контекст
import { ThemeContext } from "../contexts/ThemeContext";
// Стили
import { styles } from "../styles/styles";

const StatsScreen = () => {
    const { theme } = useContext(ThemeContext);

    const stats = {
        total: { messages: 1256, commands: 189, reactions: 234, favorites: 12 },
        topWords: [
            { word: 'привет', count: 67 },
            { word: 'круто', count: 45 },
            { word: 'бот', count: 34 },
            { word: 'пинг', count: 28 },
            { word: 'спасибо', count: 23 },
        ],
        topChats: [
            { name: 'Рабочий чат', messages: 456 },
            { name: 'Друзья', messages: 234 },
            { name: 'Семья', messages: 123 },
        ],
    };

    return (
        <View>
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>📊 Общая статистика</Text>
                <View style={styles.totalStats}>
                    <View style={styles.totalItem}>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{stats.total.messages}</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>сообщений</Text>
                    </View>
                    <View style={styles.totalItem}>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{stats.total.commands}</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>команд</Text>
                    </View>
                    <View style={styles.totalItem}>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{stats.total.reactions}</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>реакций</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>🔥 Топ слов</Text>
                {stats.topWords.map((item, i) => (
                <View key={i} style={styles.rankRow}>
                    <Text style={[styles.rankNumber, { color: theme.accent }]}>{i + 1}</Text>
                    <Text style={[styles.rankWord, { color: theme.text }]}>{item.word}</Text>
                    <Text style={[styles.rankCount, { color: theme.subtext }]}>{item.count}×</Text>
                    <View style={[styles.rankBar, { width: `${(item.count / stats.topWords[0].count) * 100}%`, backgroundColor: theme.accent }]} />
                </View>
                ))}
            </View>

            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>💬 Активные чаты</Text>
                {stats.topChats.map((chat, i) => (
                <View key={i} style={styles.chatRow}>
                    <Text style={[styles.chatName, { color: theme.text }]}>{chat.name}</Text>
                    <Text style={[styles.chatCount, { color: theme.accent }]}>{chat.messages} сообщ.</Text>
                </View>
                ))}
            </View>
        </View>
    );
}

export default StatsScreen;
