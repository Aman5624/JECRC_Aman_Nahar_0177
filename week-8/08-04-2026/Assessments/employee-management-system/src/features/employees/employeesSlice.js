import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  list: [
    {
      id: 'emp-1',
      name: 'Aarav Sharma',
      department: 'Engineering',
      role: 'Frontend Developer',
      email: 'aarav.sharma@company.com',
    },
    {
      id: 'emp-2',
      name: 'Ira Kapoor',
      department: 'Human Resources',
      role: 'HR Manager',
      email: 'ira.kapoor@company.com',
    },
  ],
  error: null,
};

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const saveEmployeeAsync = createAsyncThunk(
  'employees/saveEmployeeAsync',
  async (employeeData) => {
    await wait(500);
    return employeeData;
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  'employees/deleteEmployeeAsync',
  async (employeeId) => {
    await wait(300);
    return employeeId;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearEmployeeError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveEmployeeAsync.fulfilled, (state, action) => {
        const incomingEmployee = action.payload;
        const existingIndex = state.list.findIndex(
          (employee) => employee.id === incomingEmployee.id
        );

        if (existingIndex >= 0) {
          state.list[existingIndex] = incomingEmployee;
        } else {
          state.list.push({
            ...incomingEmployee,
            id: nanoid(),
          });
        }

        state.error = null;
      })
      .addCase(saveEmployeeAsync.rejected, (state) => {
        state.error = 'Unable to save employee. Please try again.';
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((employee) => employee.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmployeeAsync.rejected, (state) => {
        state.error = 'Unable to delete employee. Please try again.';
      });
  },
});

export const { clearEmployeeError } = employeesSlice.actions;

export default employeesSlice.reducer;
