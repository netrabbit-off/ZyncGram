import { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { ThemeContext } from "../contexts/ThemeContext";
import { apiRequest } from "../api/client";
import { styles } from "../styles/styles";

const HomeScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [weekStats, setWeekStats] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [botActive, setBotActive] = useState(false);

    useEffect(() => {
        apiRequest("/stats/week").then(data => setWeekStats(data.data))
    }, [])
    
    let weekSum = weekStats.reduce((acc, curr) => acc + curr, 0)
    const today = weekStats[6] || 0;
    const yesterday = weekStats[5] || 0;
    let trendPercent = 0;
    let trendDirection = '▲';
    let trendColor = '#27ae60';

    if (yesterday > 0) {
        trendPercent = ((today - yesterday) / yesterday) * 100;
        if (trendPercent > 0) {
            trendDirection = '▲';
            trendColor = '#27ae60';
        } else if (trendPercent < 0) {
            trendDirection = '▼';
            trendColor = '#e74c3c';
        } else {
            trendDirection = '−';
            trendColor = '#f39c12';
        }
    } else {
        if (today > 0) {
            trendPercent = 100;
            trendDirection = '▲';
            trendColor = '#27ae60';
        } else {
            trendPercent = 0;
            trendDirection = '−';
            trendColor = '#f39c12';
        }
    }

    const trendDisplay = Math.round(trendPercent);
    const trendSign = trendPercent > 0 ? '+' : '';

    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Месяцы в JS идут с 0
        dates.push(`${day}.${month}`);
    }

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
                <View style={styles.statsHeader}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>📊 Сегодня</Text>
                    <View style={[styles.trendBadge, { backgroundColor: trendColor + '20' }]}>
                        <Text style={[styles.trendIcon, { color: trendColor }]}>{trendDirection}</Text>
                        <Text style={[styles.trendText, { color: trendColor }]}>
                            {trendSign}{trendDisplay}%
                        </Text>
                    </View>
                </View>
                <View style={styles.statsMain}>
                    <Text style={[styles.statNumberBig, { color: theme.accent }]}>{weekStats[6]}</Text>
                    <Text style={[styles.statLabelBig, { color: theme.subtext }]}>сообщений</Text>
                </View>
                <View style={styles.progressWrapper}>
                    <View style={styles.progressTrack}>
                        <View style={[
                            styles.progressFill,
                            {
                                width: Math.min(1, weekStats[6] / (weekSum / 7)) * 100 + '%',
                                backgroundColor: theme.accent
                            }
                        ]} />
                    </View>
                    <Text style={[styles.progressLabel, { color: theme.subtext }]}>Среднее за неделю: {Math.round(weekSum/7)}</Text>
                </View>
            </View>

            {/* Сообщения за неделю */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>📈 Сообщения (неделя)</Text>
                <View style={styles.weekChart}>
                    {dates.map((day, i) => {
                        const max = Math.max(...weekStats);
                        const heightPercent = (weekStats[i] / max) * 100;
                        return (
                            <View key={day} style={styles.barWrapper}>
                                <View style={styles.barContainer}>
                                    <View style={[styles.bar, { height: `${heightPercent}%`, backgroundColor: theme.accent }]} />
                                </View>
                                <Text style={[styles.barDay, { color: theme.subtext }]}>{day}</Text>
                                <Text style={[styles.barValue, { color: theme.text }]}>{weekStats[i]}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;
