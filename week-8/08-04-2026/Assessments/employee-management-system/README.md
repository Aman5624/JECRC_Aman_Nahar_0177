# Employee Management System (Redux Assignment)

This project demonstrates enterprise-level Redux state management in a React application.

## Assignment Coverage

### Task 1: What is Redux & when to use it?

Redux is a predictable state container for JavaScript applications.

Why predictable:
- The complete app state lives in one centralized store.
- State updates happen only through dispatched actions.
- Reducers are pure functions that describe exactly how state changes.

Why used in large-scale apps:
- Multiple features can share data from one place.
- Debugging is easier because action flow is explicit.
- Architecture remains maintainable as application complexity grows.

When NOT to use Redux:
- Very small apps where local component state is enough.
- Apps with simple, isolated state and no cross-feature sharing.
- Prototypes where Redux setup overhead is unnecessary.

### Task 2: Store, Actions, Reducers

Store:
- Single source of truth.
- Holds app-wide state object.
- Configured in [src/app/store.js](src/app/store.js).

Actions:
- Plain JavaScript objects with a `type` field.
- Describe what happened (example: `employees/deleteEmployeeAsync/pending`).
- Created automatically by Redux Toolkit slices and thunks.

Reducers:
- Functions that receive current state and action.
- Return the next state (Redux Toolkit uses Immer to keep immutable updates easy).
- Implemented in feature slices:
	- [src/features/auth/authSlice.js](src/features/auth/authSlice.js)
	- [src/features/employees/employeesSlice.js](src/features/employees/employeesSlice.js)
	- [src/features/ui/uiSlice.js](src/features/ui/uiSlice.js)

### Task 3: Immutable State Principle

Why state should not be mutated:
- Direct mutation can create hidden bugs and unpredictable UI updates.
- Redux relies on reference changes to detect updates efficiently.
- Immutable updates enable reliable debugging and time-travel-like tooling.

Redux Toolkit advantage:
- You write simple "mutating style" logic in reducers.
- Immer converts it into safe immutable updates internally.

### Task 4: Redux Data Flow Cycle

1. React component dispatches an action.
2. Action goes to reducer (or thunk lifecycle reducers).
3. Reducer calculates updated state.
4. Store saves new state.
5. React-Redux detects state change and re-renders subscribed UI.

### Task 5: Small Reducer Example

```js
const uiSlice = createSlice({
	name: 'ui',
	initialState: { theme: 'light', isLoading: false },
	reducers: {
		toggleTheme(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
	},
});
```

This reducer toggles a global theme value in an immutable-safe way through Redux Toolkit.

## Part 2: Redux Integration in React

Completed steps:
- Installed `@reduxjs/toolkit` and `react-redux`.
- Created Redux store in [src/app/store.js](src/app/store.js).
- Wrapped app with `<Provider store={store}>` in [src/index.js](src/index.js#L12).

### Task 7: Dispatching Actions (Implemented Features)

Employee CRUD:
- Add employee
- Edit employee
- Delete employee
- Slice: [src/features/employees/employeesSlice.js](src/features/employees/employeesSlice.js)

Authentication:
- Login (async thunk)
- Logout
- Slice: [src/features/auth/authSlice.js](src/features/auth/authSlice.js)

Global UI state:
- Theme toggle (light/dark)
- Global loading spinner from async operations
- Slice: [src/features/ui/uiSlice.js](src/features/ui/uiSlice.js)

UI Integration:
- Dashboard + forms + employee cards in [src/App.js](src/App.js)
- Styles in [src/App.css](src/App.css)

## Bonus Tasks (Implemented)

Redux Toolkit `createSlice`:
- Used in all feature slices.

Middleware logger:
- Custom logger middleware in [src/app/store.js](src/app/store.js#L7).

Persist state in `localStorage`:
- Load/save utilities in [src/utils/localStorage.js](src/utils/localStorage.js).
- Store subscription persists `auth`, `employees`, and `ui` state.

Loading spinner:
- Global loading state handled by async action lifecycle in [src/features/ui/uiSlice.js](src/features/ui/uiSlice.js).

## Project Structure

```text
src/
	app/
		store.js
	features/
		auth/
			authSlice.js
		employees/
			employeesSlice.js
		ui/
			uiSlice.js
	utils/
		localStorage.js
	App.js
	App.css
	index.js
```

## Run the Project

1. Install dependencies:
	 - `npm install`
2. Start dev server:
	 - `npm start`
3. Run test:
	 - `npm test`

## Notes for Trainer Demonstration

- Login with any username/password.
- Perform add/edit/delete on employee records.
- Toggle theme to show global UI state.
- Observe loading indicator during async actions.
- Refresh page to verify persisted Redux state.
