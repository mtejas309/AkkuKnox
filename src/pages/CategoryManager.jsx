import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidgetVisibility } from "../store/slices/dashboardSlice";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CategoryManager() {
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow bg-white mt-6">
      <h2 className="text-lg font-semibold mb-3">Category Manager</h2>
      {categories.map((cat) => (
        <div key={cat.id} className="mb-4">
          <h3 className="font-medium">{cat.name}</h3>
          <div className="flex flex-col ml-4">
            {cat.widgets.map((w) => (
              <FormControlLabel
                key={w.id}
                control={
                  <Checkbox
                    checked={w.visible}
                    onChange={() =>
                      dispatch(
                        toggleWidgetVisibility({
                          categoryId: cat.id,
                          widgetId: w.id,
                        })
                      )
                    }
                  />
                }
                label={w.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
