import React from "react";
import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateEmployee } from "./employeeSlice";

const EmployeeEdit = ({ selectedEmployee, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = React.useState(selectedEmployee.name);
    const [position, setPosition] = React.useState(selectedEmployee.position);

    useEffect(() => {
        if (selectedEmployee) {
            setName(selectedEmployee.name);
            setPosition(selectedEmployee.position);
        }
    }, [selectedEmployee]);

    const handleSubmit = (e) => {
        dispatch(updateEmployee({id: selectedEmployee.id, name, position}));
        clearEdit();
    }

    const clearEdit = () => {
        setName("");
        setPosition("");
        onClose();
    }

    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <button type="submit">Update Employee</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EmployeeEdit;