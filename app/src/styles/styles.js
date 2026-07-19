import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0C10",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#0A0C10",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 4,
    color: "#A0A0A0",
  },
  tabBar: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D34",
    backgroundColor: "#0A0C10",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 13,
    color: "#A0A0A0",
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0A0C10",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#15171E",
    borderWidth: 1,
    borderColor: "#2A2D34",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  // --- Статус бота ---
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusActive: {
    backgroundColor: "rgba(0, 255, 102, 0.15)",
    borderColor: "#00FF66",
  },
  statusInactive: {
    backgroundColor: "rgba(255, 51, 102, 0.15)",
    borderColor: "#FF3366",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  // --- Кнопка управления ботом (без фона, фон задаётся через inline) ---
  toggleButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    // фон и тень задаются через inline или дополнительные классы
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A0C10",
  },
  // --- Кнопка с неоновой заливкой (для сохранения, запуска) ---
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#00E5FF",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A0C10",
  },
  // --- Кнопка-ссылка (ghost) для настроек ---
  syncButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00E5FF",
    backgroundColor: "transparent",
  },
  syncButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00E5FF",
  },
  // --- Кнопка опасного действия (выход) ---
  dangerButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF3366",
    backgroundColor: "transparent",
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3366",
  },
  // --- Статистика "Сегодня" ---
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 229, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  trendIcon: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00E5FF",
  },
  trendText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#00E5FF",
  },
  statsMain: {
    alignItems: "center",
    marginVertical: 8,
  },
  statNumberBig: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#FFFFFF",
  },
  statLabelBig: {
    fontSize: 16,
    marginTop: 2,
    color: "#A0A0A0",
  },
  progressWrapper: {
    marginTop: 12,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#2A2D34",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#00E5FF",
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
    color: "#A0A0A0",
  },
  // --- Общая статистика ---
  totalStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
  },
  totalItem: {
    alignItems: "center",
    flex: 1,
  },
  totalIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "rgba(0, 229, 255, 0.1)",
  },
  totalIcon: {
    fontSize: 20,
    color: "#00E5FF",
  },
  totalNumber: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
  totalLabel: {
    fontSize: 13,
    marginTop: 2,
    color: "#A0A0A0",
  },
  totalDivider: {
    width: 1,
    height: 50,
    backgroundColor: "#2A2D34",
  },
  // --- График за неделю ---
  weekChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    marginTop: 12,
  },
  barWrapper: {
    alignItems: "center",
    width: 40,
  },
  barContainer: {
    height: 100,
    justifyContent: "flex-end",
    width: 22,
    backgroundColor: "#2A2D34",
    borderRadius: 8,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: 8,
    minHeight: 4,
    backgroundColor: "#00E5FF",
  },
  barDay: {
    fontSize: 12,
    marginTop: 6,
    color: "#A0A0A0",
  },
  barValue: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
    color: "#CCCCCC",
  },
  // --- Остальные ---
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#A0A0A0",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  weekItem: {
    alignItems: "center",
  },
  weekValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  weekLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#A0A0A0",
  },
  rankRow: {
    marginBottom: 12,
    position: "relative",
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    color: "#FFFFFF",
  },
  rankWord: {
    fontSize: 14,
    marginLeft: 30,
    marginBottom: 4,
    color: "#CCCCCC",
  },
  rankCount: {
    fontSize: 12,
    position: "absolute",
    right: 0,
    top: 0,
    color: "#A0A0A0",
  },
  rankBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
    marginLeft: 30,
    backgroundColor: "#00E5FF",
  },
  chatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  chatName: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  chatCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A0A0A0",
  },
  favoriteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#15171E",
    borderWidth: 1,
    borderColor: "#2A2D34",
  },
  favoriteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  favoriteType: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00E5FF",
  },
  favoriteDate: {
    fontSize: 12,
    color: "#A0A0A0",
  },
  favoriteText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#FFFFFF",
  },
  favoriteChat: {
    fontSize: 12,
    marginBottom: 12,
    color: "#A0A0A0",
  },
  favoriteButton: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#00E5FF",
  },
  favoriteButtonText: {
    color: "#0A0C10",
    fontSize: 12,
    fontWeight: "bold",
  },
  // --- Настройки ---
  settingsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#15171E",
    borderWidth: 1,
    borderColor: "#2A2D34",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  lastSync: {
    fontSize: 12,
    textAlign: "center",
    color: "#A0A0A0",
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  aboutLabel: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#CCCCCC",
  },
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 80,
  },
  hourItem: {
    alignItems: "center",
    width: 40,
  },
  hourBar: {
    width: 30,
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: "#00E5FF",
  },
  hourLabel: {
    fontSize: 10,
    color: "#A0A0A0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2A2D34",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#FFFFFF",
    backgroundColor: "#15171E",
  },
});
