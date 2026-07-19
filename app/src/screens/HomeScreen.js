import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { apiRequest } from "../api/client";
import { styles } from "../styles/styles";
import { darkTheme } from "../styles/theme";

const HomeScreen = () => {
    const theme = darkTheme;

    const [weekStats, setWeekStats] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [botActive, setBotActive] = useState(false);

    useEffect(() => {
        apiRequest("/bot/status")
            .then(data => setBotActive(data.data))
            .catch(err => console.error('Ошибка загрузки статуса бота:', err));
    }, []);

    useEffect(() => {
        apiRequest("/stats/week")
            .then(data => setWeekStats(data.data))
            .catch(err => console.error('Ошибка загрузки статистики за неделю:', err));
    }, []);

    const PowerBot = () => {
        setBotActive(!botActive);
        apiRequest("/bot/power")
            .catch(err => console.error('Ошибка переключения бота:', err));
    };

    const weekSum = weekStats.reduce((acc, curr) => acc + curr, 0);
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
        const month = String(d.getMonth() + 1).padStart(2, '0');
        dates.push(`${day}.${month}`);
    }

    const progressWidth = weekSum > 0
        ? Math.min(1, today / (weekSum / 7)) * 100
        : 0;

    return (
        <View style={{ paddingBottom: 40 }}>
            {/* Статус бота */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <View style={styles.statusRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="hardware-chip-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                        <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Статус бота</Text>
                    </View>
                    <View style={[styles.statusBadge, botActive ? styles.statusActive : styles.statusInactive]}>
                        <Text style={styles.tabText}>{botActive ? 'Активен' : 'Остановлен'}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.toggleButton, { backgroundColor: botActive ? '#e74c3c' : '#27ae60' }]}
                    onPress={PowerBot}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons 
                            name={botActive ? 'pause-outline' : 'play-outline'} 
                            size={20} 
                            color="#0A0C10" 
                            style={{ marginRight: 8 }} 
                        />
                        <Text style={styles.toggleButtonText}>
                            {botActive ? 'Остановить бота' : 'Запустить бота'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Краткая статистика */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <View style={styles.statsHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="today-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                        <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Сегодня</Text>
                    </View>
                    <View style={[styles.trendBadge, { backgroundColor: trendColor + '20' }]}>
                        <Text style={[styles.trendIcon, { color: trendColor }]}>{trendDirection}</Text>
                        <Text style={[styles.trendText, { color: trendColor }]}>
                            {trendSign}{trendDisplay}%
                        </Text>
                    </View>
                </View>
                <View style={styles.statsMain}>
                    <Text style={[styles.statNumberBig, { color: theme.accent }]}>{today}</Text>
                    <Text style={[styles.statLabelBig, { color: theme.subtext }]}>сообщений</Text>
                </View>
                <View style={styles.progressWrapper}>
                    <View style={styles.progressTrack}>
                        <View style={[
                            styles.progressFill,
                            {
                                width: progressWidth + '%',
                                backgroundColor: theme.accent
                            }
                        ]} />
                    </View>
                    <Text style={[styles.progressLabel, { color: theme.subtext }]}>
                        Среднее за неделю: {weekSum > 0 ? Math.round(weekSum / 7) : 0}
                    </Text>
                </View>
            </View>

            {/* Сообщения за неделю */}
            <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Ionicons name="bar-chart-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Сообщения (неделя)</Text>
                </View>
                <View style={styles.weekChart}>
                    {dates.map((day, i) => {
                        const max = Math.max(...weekStats);
                        const heightPercent = max > 0 ? (weekStats[i] / max) * 100 : 0;
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
};

export default HomeScreen;
