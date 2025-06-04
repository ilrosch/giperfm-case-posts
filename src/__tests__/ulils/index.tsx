import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import tasksReducer from  '../../services/tasksSlice';


const preloadComponent = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { tasks: tasksReducer },
  });

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
}

export default preloadComponent


// Заглушка
test('', () => {})