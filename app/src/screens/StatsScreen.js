import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

// Контекст
import { ThemeContext } from "../contexts/ThemeContext";
// Стили
import { styles } from "../styles/styles";
import { apiRequest } from "../api/client";

const StatsScreen = () => {
    const { theme } = useContext(ThemeContext);

    const [stats, setStats] = useState({
      total: { messages: 0, words: 0 },
      topWords: [] // изначально пусто, загрузится с сервера
    });

    useEffect(() => {
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
        apiRequest("/stats/total")
            .then(data => {
                setStats(prev => ({
                    ...prev, 
                    total: { messages: data.data.total.messages, words: data.data.total.words } 
                }))
            })
    }, []);


    return (
        <View>
            {/* Общая статистика */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>📊 Общая статистика</Text>
                <View style={styles.totalStats}>
                    <View style={styles.totalItem}>
                        <View style={[styles.totalIconWrapper, { backgroundColor: theme.accent + '20' }]}>
                            <Text style={styles.totalIcon}>💬</Text>
                        </View>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>{stats.total.messages}</Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>сообщений</Text>
                    </View>

                    <View style={styles.totalDivider} />

                    <View style={styles.totalItem}>
                        <View style={[styles.totalIconWrapper, { backgroundColor: theme.accent + '20' }]}>
                            <Text style={styles.totalIcon}>📝</Text>
                        </View>
                        <Text style={[styles.totalNumber, { color: theme.accent }]}>
                            {Math.round( stats.total.words / stats.total.messages )}
                        </Text>
                        <Text style={[styles.totalLabel, { color: theme.subtext }]}>ср. слов</Text>
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
                    <View style={[styles.rankBar, { width: `${(item.count / stats.topWords[0].count) * 85}%`, backgroundColor: theme.accent }]} />
                </View>
                ))}
            </View>
        </View>
    );
}

export default StatsScreen;
