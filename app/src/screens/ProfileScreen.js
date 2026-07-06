import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { styles } from "../styles/styles";

const ProfileScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [profile, setProfile] = useState({
        id: "123456789",
        username: "@username",
        firstName: "Имя",
        lastName: "Фамилия",
        bio: "Писать по хуйне, по делу - бан. ХХХ, иди нахуй",
        avatarUrl: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/profile")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки профиля");
                return res.json();
            })
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Ошибка", "Не удалось загрузить профиль");
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
                <Text style={[styles.cardTitle, { color: theme.text, textAlign: "center" }]}>👤 Профиль</Text>

                {/* Аватар */}
                <View style={{ alignItems: "center", marginVertical: 16 }}>
                    <View style={{
                        width: 160,
                        height: 160,
                        borderRadius: 80,
                        backgroundColor: theme.accent,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: 36, color: "#fff" }}>
                            {profile.firstName?.[0] || "👤"}
                        </Text>
                    </View>
                </View>

                {/* Данные профиля */}
                <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, paddingVertical: 8 }}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>О себе</Text>
                    <Text 
                        style={{ color: theme.text, fontSize: 14, marginTop: 4, lineHeight: 20 }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {profile.bio || "—"}
                    </Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Имя</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>
                        {profile.firstName} {profile.lastName || ""}
                    </Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>Username</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>
                        {profile.username || "—"}
                    </Text>
                </View>
                <View style={[styles.aboutRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.aboutLabel, { color: theme.subtext }]}>ID</Text>
                    <Text style={[styles.aboutValue, { color: theme.text }]}>{profile.id}</Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;
