import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Стили
import { styles } from "../styles/styles";
import { apiRequest } from "../api/client";
import { darkTheme } from "../styles/theme";

const StatsScreen = () => {
    const theme = darkTheme;

    const [stats, setStats] = useState({
        total: { messages: 0, words: 0, uncensored: 0 },
        topWords: []
    });

    useEffect(() => {
        // Загрузка топ-слов
        apiRequest("/stats/words/top")
            .then(data => {
                if (data.error) {
                    console.warn('Сервер вернул ошибку:', data);
                    return;
                }
                const wordsObject = data.data || {};
                const newTopWords = Object.entries(wordsObject).map(([word, count]) => ({
                    word,
                    count
                }));
                newTopWords.sort((a, b) => b.count - a.count);
                setStats(prev => ({ ...prev, topWords: newTopWords }));
            })
            .catch(err => console.error('Ошибка загрузки топ-слов:', err));

        // Загрузка общей статистики
        apiRequest("/stats/total")
            .then(data => {
                if (data && data.data && data.data.total) {
                    setStats(prev => ({
                        ...prev,
                        total: data.data.total
                    }));
                }
            })
            .catch(err => console.error('Ошибка загрузки статистики:', err));
    }, []);

    // Безопасное вычисление средних
    const avgWords = stats.total.messages > 0 
        ? (stats.total.words / stats.total.messages).toFixed(1) 
        : '0.0';
    const swearPercent = stats.total.words > 0 
        ? ((stats.total.uncensored / stats.total.words) * 100).toFixed(2) 
        : '0.00';

    return (
        <View style={{ paddingBottom: 40 }}>
            {/* Общая статистика */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Ionicons name="stats-chart-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Общая статистика</Text>
                </View>
                <View style={styles.totalStats}>
                    <View style={styles.totalItem}>
                        <View style={[styles.totalIconWrapper, { backgroundColor: theme.accent + '20' }]}>
                            <Ionicons name="chatbubble-outline" size={24} color={theme.accent} />
                        </View>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{stats.total.messages}</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>сообщений</Text>
                    </View>

                    <View style={styles.totalDivider} />

                    <View style={styles.totalItem}>
                        <View style={[styles.totalIconWrapper, { backgroundColor: theme.accent + '20' }]}>
                            <Ionicons name="create-outline" size={24} color={theme.accent} />
                        </View>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{avgWords}</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>ср. слов</Text>
                    </View>

                    <View style={styles.totalDivider} />

                    <View style={styles.totalItem}>
                        <View style={[styles.totalIconWrapper, { backgroundColor: theme.accent + '20' }]}>
                            <Ionicons name="warning-outline" size={24} color={theme.accent} />
                        </View>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{swearPercent}%</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>частота мата</Text>
                    </View>
                </View>
            </View>

            {/* Топ слов */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Ionicons name="flame-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Топ слов</Text>
                </View>
                {stats.topWords.length === 0 ? (
                    <Text style={{ color: theme.subtext, textAlign: 'center' }}>Нет данных</Text>
                ) : (
                    stats.topWords.map((item, i) => (
                        <View key={i} style={styles.rankRow}>
                            <Text style={[styles.rankNumber, { color: theme.accent }]}>{i + 1}</Text>
                            <Text style={[styles.rankWord, { color: theme.text }]}>{item.word}</Text>
                            <Text style={[styles.rankCount, { color: theme.subtext }]}>{item.count}×</Text>
                            <View style={[styles.rankBar, { width: `${(item.count / stats.topWords[0].count) * 85}%`, backgroundColor: theme.accent }]} />
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}

export default StatsScreen;
