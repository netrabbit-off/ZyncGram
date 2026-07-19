import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { styles } from "../styles/styles";
import { apiRequest } from "../api/client";
import { darkTheme } from "../styles/theme";

const AutoReactionsScreen = () => {
    const theme = darkTheme;

    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [newUser, setNewUser] = useState("");
    const [newEmoji, setNewEmoji] = useState("❤️");
    const [newScope, setNewScope] = useState("both");

    const emojiOptions = ["❤️‍🔥", "💘", "❤️", "🔥", "🍌", "🤡"];

    // Загрузка настроек
    useEffect(() => {
        apiRequest("/settings")
            .then((data) => {
                if (data.data?.reactions && Array.isArray(data.data.reactions)) {
                    setRules(data.data.reactions);
                } else {
                    setRules([]);
                }
            })
            .catch((err) => {
                Alert.alert("Ошибка", "Не удалось загрузить настройки");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    // Добавление правила
    const addRule = () => {
        if (!newUser.trim()) {
            Alert.alert("Ошибка", "Введите пользователя (ID или username)");
            return;
        }
        if (!newEmoji.trim()) {
            Alert.alert("Ошибка", "Введите реакцию (эмодзи)");
            return;
        }

        const newRule = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
            user: newUser.trim(),
            emoji: newEmoji.trim(),
            scope: newScope,
            enabled: true,
        };
        setRules([...rules, newRule]);
        setNewUser("");
        setNewEmoji("❤️");
        setNewScope("both");
    };

    const deleteRule = (id) => {
        Alert.alert("Удаление", "Вы уверены, что хотите удалить это правило?", [
            { text: "Отмена", style: "cancel" },
            {
                text: "Удалить",
                style: "destructive",
                onPress: () => setRules(rules.filter((rule) => rule.id !== id)),
            },
        ]);
    };

    const toggleEnabled = (id) => {
        setRules(
            rules.map((rule) =>
                rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
            )
        );
    };

    const saveSettings = async () => {
        if (saving) return;
        setSaving(true);
        try {
            await apiRequest("/settings/reactions", "POST", rules);
            Alert.alert("Успешно", "Настройки сохранены");
        } catch (err) {
            Alert.alert("Ошибка", "Не удалось сохранить настройки");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const selectEmoji = (emoji) => {
        setNewEmoji(emoji);
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.background,
                }}
            >
                <ActivityIndicator size="large" color={theme.accent} />
            </View>
        );
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.background }}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <View style={[styles.settingsCard, { backgroundColor: theme.cardBg }]}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                    Настройки авто-реакций
                </Text>

                {/* Форма добавления */}
                <View style={{ marginBottom: 16 }}>
                    <Text
                        style={{
                            color: theme.text,
                            marginBottom: 6,
                            fontWeight: "600",
                        }}
                    >
                        Добавить правило
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <TextInput
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: theme.border,
                                borderRadius: 8,
                                padding: 10,
                                color: theme.text,
                                backgroundColor: theme.cardBg,
                                marginRight: 8,
                            }}
                            placeholder="ID или username"
                            placeholderTextColor={theme.subtext}
                            value={newUser}
                            onChangeText={setNewUser}
                        />
                        <TextInput
                            style={{
                                width: 60,
                                borderWidth: 1,
                                borderColor: theme.border,
                                borderRadius: 8,
                                padding: 10,
                                textAlign: "center",
                                fontSize: 18,
                                color: theme.text,
                                backgroundColor: theme.cardBg,
                            }}
                            placeholder="😊"
                            placeholderTextColor={theme.subtext}
                            value={newEmoji}
                            onChangeText={setNewEmoji}
                        />
                    </View>

                    {/* Быстрое меню эмодзи */}
                    <Text
                        style={{
                            color: theme.subtext,
                            fontSize: 12,
                            marginBottom: 6,
                        }}
                    >
                        Быстрый выбор:
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 8,
                        }}
                    >
                        {emojiOptions.map((emoji) => (
                            <TouchableOpacity
                                key={emoji}
                                onPress={() => selectEmoji(emoji)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor:
                                        newEmoji === emoji
                                            ? theme.accent
                                            : theme.cardBg,
                                    borderWidth: newEmoji === emoji ? 0 : 1,
                                    borderColor: theme.border,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: 6,
                                    marginBottom: 6,
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Выбор scope */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginBottom: 8,
                        }}
                    >
                        {["private", "group", "both"].map((scope) => (
                            <TouchableOpacity
                                key={scope}
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    backgroundColor:
                                        newScope === scope
                                            ? theme.accent
                                            : "transparent",
                                    borderWidth: 1,
                                    borderColor: theme.accent,
                                }}
                                onPress={() => setNewScope(scope)}
                            >
                                <Text
                                    style={{
                                        color:
                                            newScope === scope
                                                ? "#fff"
                                                : theme.accent,
                                    }}
                                >
                                    {scope === "private"
                                        ? "ЛС"
                                        : scope === "group"
                                        ? "Группа"
                                        : "Оба"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.syncButton,
                            {
                                backgroundColor: theme.accent,
                                borderRadius: 8,
                                paddingVertical: 12,
                                borderWidth: 0, // убираем лишнюю рамку
                            },
                        ]}
                        onPress={addRule}
                    >
                        <Text style={[styles.syncButtonText, { color: "#fff" }]}>
                            ➕ Добавить правило
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Список правил */}
                <Text
                    style={{
                        color: theme.text,
                        marginBottom: 8,
                        fontWeight: "600",
                    }}
                >
                    Список правил:
                </Text>
                {rules.length === 0 ? (
                    <Text
                        style={{
                            color: theme.subtext,
                            textAlign: "center",
                            paddingVertical: 16,
                        }}
                    >
                        Нет правил
                    </Text>
                ) : (
                    rules.map((rule) => (
                        <View
                            key={rule.id}
                            style={[
                                styles.settingRow,
                                {
                                    borderBottomColor: theme.border,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 10,
                                },
                            ]}
                        >
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        color: theme.text,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {rule.user}
                                </Text>
                                <Text
                                    style={{
                                        color: theme.subtext,
                                        fontSize: 12,
                                    }}
                                >
                                    {rule.emoji} •{" "}
                                    {rule.scope === "private"
                                        ? "ЛС"
                                        : rule.scope === "group"
                                        ? "Группа"
                                        : "Оба"}
                                </Text>
                            </View>
                            <Switch
                                value={rule.enabled}
                                onValueChange={() => toggleEnabled(rule.id)}
                            />
                            <TouchableOpacity
                                onPress={() => deleteRule(rule.id)}
                                style={{ marginLeft: 10 }}
                            >
                                <Text
                                    style={{
                                        color: "#e74c3c",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}
                                >
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}

                {/* Кнопка сохранения */}
                <TouchableOpacity
                    style={[styles.syncButton, { marginTop: 16 }]}
                    onPress={saveSettings}
                    disabled={saving}
                >
                    <Text
                        style={[
                            styles.syncButtonText,
                            { color: theme.accent },
                        ]}
                    >
                        {saving ? "Сохранение..." : "💾 Сохранить настройки"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AutoReactionsScreen;
