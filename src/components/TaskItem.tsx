import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

interface TaskItemProps {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
  task: Task;
}

export function TaskItem({ index, toggleTaskDone, removeTask, editTask, task }: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedValue, setEditedValue] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEdit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEdit])


  function handleStartEditing() {
    setIsEdit(true);
  }
  function handleCancelEditing() {
    setEditedValue(task.title);
    setIsEdit(false);

  }
  function handleSubmitEditing(taskId: number) {
    editTask(taskId, editedValue);
    setIsEdit(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => { toggleTaskDone(task.id) }}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={editedValue}
            onChangeText={setEditedValue}
            editable={isEdit}
            onSubmitEditing={() => handleSubmitEditing(task.id)}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />

        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {isEdit ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon
              name="x"
              size={24}
              color="#b2b2b2"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View
          style={styles.iconsDivider}
        />
        <TouchableOpacity
          disabled={isEdit}
          onPress={() => { removeTask(task.id) }}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isEdit ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  }
})