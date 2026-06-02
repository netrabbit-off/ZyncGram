import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Контекст
import { ThemeContext } from "../contexts/ThemeContext";
// Стили
import { styles } from "../styles/styles";

const FavoritesScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [favorites] = useState([
        { id: 1, type: 'msg', text: '/ping — быстрый ответ бота', date: 'Сегодня', chat: 'Тестовый чат' },
        { id: 2, type: 'msg', text: 'Важная ссылка на документацию', date: 'Вчера', chat: 'Работа' },
        { id: 3, type: 'user', name: '@friend', text: 'Полезный контакт', date: '2 дня', chat: 'Друзья' },
        { id: 4, type: 'msg', text: 'Идея для нового функционала', date: '5 дней', chat: 'Заметки' },
    ]);

    return (
        <View>
            {favorites.map(item => (
            <View key={item.id} style={[styles.favoriteCard, { backgroundColor: theme.cardBg }]}>
                <View style={styles.favoriteHeader}>
                    <Text style={[styles.favoriteType, { color: theme.accent }]}>
                        {item.type === 'msg' ? '💬 Сообщение' : '👤 Пользователь'}
                    </Text>
                    <Text style={[styles.favoriteDate, { color: theme.subtext }]}>{item.date}</Text>
                </View>
                <Text style={[styles.favoriteText, { color: theme.text }]}>{item.text || item.name}</Text>
                <Text style={[styles.favoriteChat, { color: theme.subtext }]}>📁 {item.chat}</Text>
                <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: theme.accent }]}>
                    <Text style={styles.favoriteButtonText}>📋 Скопировать</Text>
                </TouchableOpacity>
            </View>
            ))}
        </View>
    );
}

export default FavoritesScreen;
