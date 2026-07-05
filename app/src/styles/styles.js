import { StyleSheet } from "react-native";

// ========== стили ==========
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Тени для светлой темы
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
  statusActive: {
    backgroundColor: "#27ae60",
  },
  statusInactive: {
    backgroundColor: "#e74c3c",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  toggleButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
    backgroundColor: "#e8f5e9", // можно переопределить через тему
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  trendIcon: {
    fontSize: 12,
    fontWeight: "700",
    color: "#27ae60",
  },
  trendText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#27ae60",
  },
  statsMain: {
    alignItems: "center",
    marginVertical: 8,
  },
  statNumberBig: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 1,
  },
  statLabelBig: {
    fontSize: 16,
    marginTop: 2,
  },
  progressWrapper: {
    marginTop: 12,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
  },
  // --- Общая статистика (две метрики) ---
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
    backgroundColor: "rgba(0,0,0,0.05)", // базовый, будет переопределён через theme.accent + '20'
  },
  totalIcon: {
    fontSize: 20,
  },
  totalNumber: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  totalLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  totalDivider: {
    width: 1,
    height: 50,
    backgroundColor: "#ddd",
  },
  // --- График за неделю (столбцы) ---
  weekChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    marginTop: 12,
  },
  barWrapper: {
    alignItems: "center",
    width: 30,
  },
  barContainer: {
    height: 100,
    justifyContent: "flex-end",
    width: 22,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: 8,
    minHeight: 4,
  },
  barDay: {
    fontSize: 12,
    marginTop: 6,
  },
  barValue: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  // --- Остальные стили (если используются) ---
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
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
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
  },
  weekLabel: {
    fontSize: 12,
    marginTop: 4,
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
  },
  rankWord: {
    fontSize: 14,
    marginLeft: 30,
    marginBottom: 4,
  },
  rankCount: {
    fontSize: 12,
    position: "absolute",
    right: 0,
    top: 0,
  },
  rankBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
    marginLeft: 30,
  },
  chatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  chatName: {
    fontSize: 14,
  },
  chatCount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  favoriteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  favoriteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  favoriteType: {
    fontSize: 12,
    fontWeight: "bold",
  },
  favoriteDate: {
    fontSize: 12,
  },
  favoriteText: {
    fontSize: 14,
    marginBottom: 8,
  },
  favoriteChat: {
    fontSize: 12,
    marginBottom: 12,
  },
  favoriteButton: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  favoriteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  settingsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingLabel: {
    fontSize: 16,
  },
  syncButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  syncButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  lastSync: {
    fontSize: 12,
    textAlign: "center",
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  aboutLabel: {
    fontSize: 14,
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: "500",
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
  },
  hourLabel: {
    fontSize: 10,
  },
});
