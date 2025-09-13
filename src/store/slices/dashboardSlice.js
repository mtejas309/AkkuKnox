import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive",
      widgets: [
        {
          id: "w1",
          name: "Widget One",
          text: "Some text",
          type: "text",
          visible: true,
        },
        {
          id: "w2",
          name: "Widget Two",
          text: "Another text",
          type: "text",
          visible: true,
        },
      ],
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({
        id: nanoid(),
        name: action.payload,
        widgets: [],
      });
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },
    addWidget: (state, action) => {
      const { categoryId, name, text, type, graphData } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets.push({
          id: nanoid(),
          name,
          text: text || "",
          type: type || "text",
          graphData: graphData || [],
          visible: true,
        });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        const widget = category.widgets.find((w) => w.id === widgetId);
        if (widget) widget.visible = !widget.visible;
      }
    },
  },
});

export const {
  addCategory,
  removeCategory,
  addWidget,
  removeWidget,
  toggleWidgetVisibility,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
