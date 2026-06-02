import { StyleSheet } from "react-native";

// ========== СТИЛИ ==========
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
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        marginTop: 4,
    },
    tabBar: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
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
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusActive: {
        backgroundColor: '#27ae60',
    },
    statusInactive: {
        backgroundColor: '#e74c3c',
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    toggleButton: {
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    hoursContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 80,
    },
    hourItem: {
        alignItems: 'center',
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
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    weekItem: {
        alignItems: 'center',
    },
    weekValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    weekLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    totalStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    totalItem: {
        alignItems: 'center',
    },
    totalNumber: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    totalLabel: {
        fontSize: 12,
    },
    rankRow: {
        marginBottom: 12,
        position: 'relative',
    },
    rankNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        position: 'absolute',
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
        position: 'absolute',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    chatName: {
        fontSize: 14,
    },
    chatCount: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    favoriteCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    favoriteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    favoriteType: {
        fontSize: 12,
        fontWeight: 'bold',
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
        alignItems: 'center',
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    settingsCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    settingLabel: {
        fontSize: 16,
    },
    syncButton: {
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 8,
    },
    syncButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    lastSync: {
        fontSize: 12,
        textAlign: 'center',
    },
    aboutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    aboutLabel: {
        fontSize: 14,
    },
    aboutValue: {
        fontSize: 14,
        fontWeight: '500',
    },
});


