import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function EditViewTaskScreen (){
    const [ mode, setMode ] = useState<'view' | 'edit'>('view');

    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Screen options={{ title: mode === 'view' ? "Tarefa" : "Editar tarefa" }} />
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <View>
                    TextINput
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        minHeight: '100%',
    }
});