import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/styles";
import { darkTheme } from "../styles/theme";

const InitialSettingsScreen = ({ setActiveTab }) => {
    const [serverAddress, setServerAddress] = useState("");
    const [authToken, setAuthToken] = useState("");
    const [loading, setLoading] = useState(false);
    const theme = darkTheme

    const handleSave = async () => {
        if (!serverAddress.trim()) {
            Alert.alert("Ошибка", "Введите адрес сервера");
            return;
        }
        if (!authToken.trim()) {
            Alert.alert("Ошибка", "Введите токен авторизации");
            return;
        }

        setLoading(true);
        try {
            await AsyncStorage.setItem("serverAddress", serverAddress.trim());
            await AsyncStorage.setItem("authToken", authToken.trim());
            await AsyncStorage.setItem("isConfigured", "true");
            setActiveTab("home")
        } catch (error) {
            Alert.alert("Ошибка", "Не удалось сохранить настройки");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
            >
                <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                    <Text style={[styles.cardTitle, { color: theme.text, textAlign: "center" }]}>
                        ⚙️ Настройка подключения
                    </Text>
                    <Text style={{ color: theme.subtext, textAlign: "center", marginBottom: 20 }}>
                        Введите данные для подключения к бэкенду
                    </Text>

                    <Text style={{ color: theme.text, marginBottom: 6 }}>Адрес сервера</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: theme.border,
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16,
                            color: theme.text,
                            backgroundColor: theme.cardBg,
                            marginBottom: 16,
                        }}
                        placeholder="http://127.0.0.1:8080"
                        placeholderTextColor={theme.subtext}
                        value={serverAddress}
                        onChangeText={setServerAddress}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={{ color: theme.text, marginBottom: 6 }}>Токен авторизации</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: theme.border,
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16,
                            color: theme.text,
                            backgroundColor: theme.cardBg,
                            marginBottom: 24,
                        }}
                        placeholder="Введите токен"
                        placeholderTextColor={theme.subtext}
                        value={authToken}
                        onChangeText={setAuthToken}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableOpacity
                        style={[
                            styles.syncButton,
                            {
                                backgroundColor: loading ? theme.subtext : theme.accent,
                                borderRadius: 8,
                                paddingVertical: 14,
                            },
                        ]}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        <Text
                            style={[
                                styles.syncButtonText,
                                { color: "#fff", fontSize: 18, fontWeight: "600" },
                            ]}
                        >
                            {loading ? "Сохранение..." : "Подключиться"}
                        </Text>
                    </TouchableOpacity>

                    <Text
                        style={{
                            color: theme.subtext,
                            fontSize: 12,
                            textAlign: "center",
                            marginTop: 12,
                        }}
                    >
                        Настройки будут сохранены локально
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default InitialSettingsScreen;
