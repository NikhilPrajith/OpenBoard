import React, { useState, useEffect } from 'react';
import styles from "./TaskEditor.module.css";

export default function TaskEditor({ selectedTask, updateTask, taskCategories,listCategories }) {
    // Local state to manage the edited fields, initializing with selectedTask values or defaults
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDueDate, setEditedDueDate] = useState('');

    const [description, setDesc] = useState('');

    const [category, setTaskCategory] = useState('');

    const [categoryColor, setTaskCategoryColor] = useState('');

    const [listVal, setListCategory] = useState('');

    // Effect to reset local form state when selectedTask changes
    useEffect(() => {
        setEditedTitle(selectedTask?.title || '');
        // Ensure dueDate is in the right format for the input[type=date], which is YYYY-MM-DD
        setEditedDueDate(selectedTask?.dueDate ? new Date(selectedTask.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
        setDesc(selectedTask?.description || '');
        setTaskCategory(selectedTask?.category || '😍');
        setTaskCategoryColor(selectedTask?.bgColor || taskCategories['😍'])
        setListCategory(selectedTask?.list || 'Personal')
    }, [selectedTask]);

    // Handles the submission and updates the task list in the parent component
    const handleUpdate = () => {
        if (!selectedTask) return;

        // Assuming updateTask is a function that updates the task in the parent component's state
        const updatedTask = {
            ...selectedTask,
            title: editedTitle,
            dueDate: editedDueDate,
            bgColor: categoryColor,
            category: category,
            list: listVal,
            description: description, // YYYY-MM-DD string format is compatible with most backend date handling
        };

        updateTask(updatedTask);
    };
    const updateCategory = (value) =>{
        setTaskCategory(value);
        setTaskCategoryColor(taskCategories[value]);
    }
    const updateList = (value) =>{
        setListCategory(value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.taskHeader}>Details</div>
                <div className={styles.editTask} >Edit task here</div>
            </div>
            {selectedTask && 
            <div className={styles.editFields}>
                <div className={styles.label}>Title</div>
                <input
                    className={styles.textField} // Apply custom styling as needed
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <div className={styles.label}>Description</div>
                 <textarea
                    className={styles.textField} // Apply custom styling as needed
                    type="text"
                    value={description}
                    rows={6}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Enter task Description"
                />
                <div className={styles.extraDetails}>
                    <div>
                        <div className={styles.label}>Due Date</div>
                        <input
                            className={styles.dateInput} // Apply custom styling as needed
                            type="date"
                            value={editedDueDate}
                            onChange={(e) => setEditedDueDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className={styles.label}>Emotional Category</div>
                        <select
                            value={category}
                            style={{ backgroundColor: categoryColor }}
                            onChange={(e) => updateCategory(e.target.value)}
                            className={styles.categorySelect}
                            >
                            {Object.entries(taskCategories).map(([emoji, color]) => (
                                <option key={emoji} value={emoji}>{emoji}</option>
                            ))}
                        </select>
                    </div>
                    <div>

                        <div className={styles.label}>List</div>
                        <select
                            value={listVal}
                            style={{}}
                            onChange={(e) => updateList(e.target.value)}
                            className={styles.categorySelect}
                            >
                            {Object.entries(listCategories).map(([name, val]) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.saveButtonCont}><button className={styles.saveButton} onClick={handleUpdate}>Save Changes</button></div>
            </div> }
            
            {!selectedTask && 
                <div className={styles.editFields}>
                    <div className={styles.label}> Create task to edit!</div>
                </div>
            
            }
        </div>  
    );
}
