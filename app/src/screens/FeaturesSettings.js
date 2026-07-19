import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
} from "react-native";
import { styles } from "../styles/styles";
import { apiRequest } from "../api/client";
import { darkTheme } from "../styles/theme";

const FeaturesSettings = () => {
    const theme = darkTheme

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState({
        antispam: false,
        laugh: [false, false], // [private, group]
        animate: {
            words: [],
            enabled: [false, false], // [private, group]
        },
    });
    const [newWord, setNewWord] = useState("");

    useEffect(() => {
        const loadSettings = async () => {
            try {
                apiRequest("/settings").then(data => setSettings(data.data));
            } catch (error) {
                Alert.alert("Ошибка", "Не удалось загрузить настройки");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const saveSettings = async () => {
        setSaving(true);
        apiRequest("/settings/antispam", "POST", settings.antispam);
        apiRequest("/settings/laugh", "POST", settings.laugh);
        apiRequest("/settings/animate/enabled", "POST", settings.animate.enabled);
        apiRequest("/settings/animate/words", "POST", settings.animate.words);
        setSaving(false);
    };

    // Обновление полей
    const updateLaugh = (index, value) => {
        const newLaugh = [...settings.laugh];
        newLaugh[index] = value;
        setSettings({ ...settings, laugh: newLaugh });
    };

    const updateAnimateEnabled = (index, value) => {
        const newEnabled = [...settings.animate.enabled];
        newEnabled[index] = value;
        setSettings({
            ...settings,
            animate: { ...settings.animate, enabled: newEnabled },
        });
    };

    const addWord = () => {
        const word = newWord.trim();
        if (!word) return;
        if (settings.animate.words.includes(word)) {
            Alert.alert("Ошибка", "Это слово уже добавлено");
            return;
        }
        setSettings({
            ...settings,
            animate: {
                ...settings.animate,
                words: [...settings.animate.words, word],
            },
        });
        setNewWord("");
    };

    const removeWord = (word) => {
        setSettings({
            ...settings,
            animate: {
                ...settings.animate,
                words: settings.animate.words.filter((w) => w !== word),
            },
        });
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
                <ActivityIndicator size="large" color={theme.accent} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* Антиспам */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>🛡️ Антиспам</Text>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>Включить антиспам</Text>
                    <Switch
                        value={settings.antispam}
                        onValueChange={(value) => setSettings({ ...settings, antispam: value })}
                    />
                </View>
            </View>

            {/* Смех */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>😂 Смех</Text>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>В ЛС</Text>
                    <Switch value={settings.laugh[0]} onValueChange={(val) => updateLaugh(0, val)} />
                </View>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>В группах</Text>
                    <Switch value={settings.laugh[1]} onValueChange={(val) => updateLaugh(1, val)} />
                </View>
            </View>

            {/* Анимация */}
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>✨ Анимация</Text>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>В ЛС</Text>
                    <Switch value={settings.animate.enabled[0]} onValueChange={(val) => updateAnimateEnabled(0, val)} />
                </View>
                <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>В группах</Text>
                    <Switch value={settings.animate.enabled[1]} onValueChange={(val) => updateAnimateEnabled(1, val)} />
                </View>

                <Text style={{ color: theme.text, marginTop: 12, marginBottom: 8 }}>Ключевые слова</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <TextInput
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: theme.border,
                            borderRadius: 8,
                            padding: 8,
                            color: theme.text,
                            backgroundColor: theme.cardBg,
                            marginRight: 8,
                        }}
                        placeholder="Введите слово"
                        placeholderTextColor={theme.subtext}
                        value={newWord}
                        onChangeText={setNewWord}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.accent,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 8,
                        }}
                        onPress={addWord}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
                    </TouchableOpacity>
                </View>

                {settings.animate.words.length === 0 ? (
                    <Text style={{ color: theme.subtext, textAlign: "center", marginVertical: 8 }}>
                        Слова не добавлены
                    </Text>
                ) : (
                    <FlatList
                        data={settings.animate.words}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingVertical: 6,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.border,
                                }}
                            >
                                <Text style={{ color: theme.text }}>{item}</Text>
                                <TouchableOpacity onPress={() => removeWord(item)}>
                                    <Text style={{ color: "#e74c3c", fontSize: 18 }}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>

            {/* Кнопка сохранения */}
            <TouchableOpacity
                style={[styles.syncButton, { marginTop: 8 }]}
                onPress={saveSettings}
                disabled={saving}
            >
                <Text style={[styles.syncButtonText, { color: theme.accent }]}>
                    {saving ? "Сохранение..." : "💾 Сохранить настройки"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeaturesSettings;
