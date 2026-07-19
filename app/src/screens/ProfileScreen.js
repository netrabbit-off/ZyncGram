import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/styles";
import { apiRequest, baseURL } from "../api/client";
import { darkTheme } from "../styles/theme";

const ProfileScreen = () => {
    const theme = darkTheme;
    const [profile, setProfile] = useState({
        id: "123456789",
        username: "@username",
        firstname: "Имя",
        lastname: "Фамилия",
        avatar: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiRequest("/profile")
            .then((data) => {
                setProfile(data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Ошибка загрузки профиля:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
                <ActivityIndicator size="large" color={theme.accent} />
            </View>
        );
    }

    if (!profile) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
                <Text style={{ color: theme.text }}>Нет данных профиля</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Ionicons name="person-outline" size={24} color={theme.accent} style={{ marginRight: 8 }} />
                    <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}>Профиль</Text>
                </View>

                {/* Аватар */}
                <View style={{ alignItems: "center", marginVertical: 16 }}>
                    {profile.avatar ? (
                        <Image
                            source={{ uri: baseURL + "/profile/photo" }}
                            style={{
                                width: 160,
                                height: 160,
                                borderRadius: 80,
                                backgroundColor: theme.cardBg,
                            }}
                            onError={() => console.log('Ошибка загрузки аватара')}
                        />
                    ) : (
                        <View style={{
                            width: 160,
                            height: 160,
                            borderRadius: 80,
                            backgroundColor: theme.accent,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Ionicons name="person-outline" size={72} color="#fff" />
                        </View>
                    )}
                </View>

                {/* Данные профиля */}
                <View style={[styles.aboutRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Имя</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>
                        {profile.firstname} {profile.lastname || ""}
                    </Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Username</Text>
                    <Text style={[styles.aboutValue, { color: theme.accent }]}>
                        {profile.username && "@"}{profile.username || "—"}
                    </Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>ID</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>{profile.id}</Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;
