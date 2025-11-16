import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Task as TaskType } from "@/services/task";
import { Text, RadioButton, Icon } from "react-native-paper";
import { useRouter } from "expo-router";
import { SwipeableRef } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable/ReanimatedSwipeable";


export function Task(task: TaskType) {
    const router = useRouter();
    const [checked, setChecked] = useState<boolean>(task.status);

    const taskRef = React.useRef<SwipeableMethods>(null);

    const handleChangeStatus = () => {
        setChecked(!checked);
    }

    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={taskRef}
                renderRightActions={() => 
                    <View style={styles.containerDelete}>
                        <Icon
                            size={24}
                            source="delete"
                            color="white"
                        />
                    </View>
                }
                renderLeftActions={() => (
                    <View style={styles.containerEdit}>
                        <Icon 
                            size={24}
                            source="square-edit-outline"
                            color="white"
                        />
                    </View>
                )}
                onSwipeableOpen={(direction) => {
                    taskRef.current?.reset();
                    if (direction === 'left') {
                        console.log(`Delete task with id: ${task.id}`);
                    } else {
                        router.push(`/task/${task.id}`);
                    }
                }}
                containerStyle={styles.container}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        router.push(`/task/${task.id}`);
                    }}
                >
                    <View
                        style={styles.containerTask}
                    >
                        <View style={styles.radio}>
                            <RadioButton.Android
                                value={task.id}
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={handleChangeStatus}
                            />
                        </View>
                        <View style={styles.spacer} />
                        <View style={styles.containerInfo}>
                            <View>
                                <Text variant="labelLarge">{task.title}</Text>
                            </View>
                            <View>
                                <Text>{task.dueDate.toDateString()}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 2,
    },
    containerTask: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
    },
    radio: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacer: {
        width: 2,
        height: '100%',
        backgroundColor: 'gray',
    },
    containerInfo: {
        flex: 1,
        gap: 4,
    },
    containerDelete: {
        backgroundColor: '#b22626',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 16,
        width: "100%",
    },
    containerEdit: {
        backgroundColor: '#2680b2',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        justifyContent: 'center',
        width: "100%",
    }
});