import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  removeCategory,
  addWidget,
  removeWidget,
  toggleWidgetVisibility,
} from "../store/slices/dashboardSlice";

import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Chip,
  Paper,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import {
  Plus,
  X,
  Trash,
  SquaresFour,
  List as ListIcon,
  Gear,
  Eye,
  EyeSlash,
  Pencil,
  ChartLine,
  ChartBar,
  ChartPie,
  MagnifyingGlass,
} from "phosphor-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dashboard Component
export default function DashboardPage() {
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [openWidgetDialog, setOpenWidgetDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [widgetType, setWidgetType] = useState("text"); // 'text', 'line', 'bar', or 'pie'
  const [graphData, setGraphData] = useState([{ name: "", value: "" }]);

  const [categoryManagerOpen, setCategoryManagerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  // Filter categories and widgets based on search query
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return { categories: [], widgets: [] };

    const results = {
      categories: [],
      widgets: [],
    };

    categories.forEach((category) => {
      // Check if category name matches
      if (category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.categories.push(category);
      }

      // Check widgets in this category
      category.widgets.forEach((widget) => {
        if (
          widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (widget.type === "text" &&
            widget.text.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          results.widgets.push({
            ...widget,
            categoryName: category.name,
            categoryId: category.id,
          });
        }
      });
    });

    return results;
  }, [searchQuery, categories]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchMode(!!query.trim());
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchMode(false);
  };

  const handleAddCategory = () => {
    if (!categoryName.trim()) return;
    dispatch(addCategory(categoryName));
    setCategoryName("");
  };

  const handleAddWidget = () => {
    if (!widgetName.trim()) return;

    if (widgetType === "text" && !widgetText.trim()) return;

    if (widgetType !== "text") {
      // Validate graph data
      const validData = graphData.filter((item) => item.name && item.value);
      if (validData.length < 2) {
        alert("Please add at least 2 valid data points for the graph");
        return;
      }
    }

    const widgetData = {
      categoryId,
      name: widgetName,
      text: widgetText,
      type: widgetType,
      ...(widgetType !== "text" && {
        graphData: graphData.filter((item) => item.name && item.value),
      }),
    };

    dispatch(addWidget(widgetData));
    setWidgetName("");
    setWidgetText("");
    setWidgetType("text");
    setGraphData([{ name: "", value: "" }]);
    setOpenWidgetDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addGraphDataField = () => {
    setGraphData([...graphData, { name: "", value: "" }]);
  };

  const removeGraphDataField = (index) => {
    if (graphData.length > 1) {
      const newData = [...graphData];
      newData.splice(index, 1);
      setGraphData(newData);
    }
  };

  const updateGraphData = (index, field, value) => {
    const newData = [...graphData];
    newData[index][field] = value;
    setGraphData(newData);
  };

  const renderWidgetContent = (widget) => {
    if (widget.type === "text") {
      return (
        <Typography variant="body2" className="text-gray-700">
          {widget.text}
        </Typography>
      );
    } else if (widget.type === "line") {
      return (
        <div className="h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={widget.graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (widget.type === "bar") {
      return (
        <div className="h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={widget.graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (widget.type === "pie") {
      return (
        <div className="h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={widget.graphData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {widget.graphData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  const getGraphIcon = (type) => {
    switch (type) {
      case "line":
        return <ChartLine size={16} className="ml-2 inline-block" />;
      case "bar":
        return <ChartBar size={16} className="ml-2 inline-block" />;
      case "pie":
        return <ChartPie size={16} className="ml-2 inline-block" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AppBar
        position="static"
        color="default"
        elevation={1}
        className="bg-white"
      >
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="font-bold text-gray-900">
            Dynamic Dashboard
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              startIcon={<Gear size={18} className="text-gray-900" />}
              onClick={() => setCategoryManagerOpen(true)}
              className="ml-2 border-gray-700 text-gray-900 hover:bg-gray-100"
            >
              Manage
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="container mx-auto p-4 md:p-6">
        {/* Search Bar */}
        <Paper elevation={1} className="mb-6 p-2 bg-white rounded-lg">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search categories and widgets..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlass size={20} className="text-gray-500" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={clearSearch}
                    edge="end"
                    size="small"
                  >
                    <X size={16} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Search Results */}
        {searchMode && (
          <Paper
            elevation={1}
            className="mb-6 bg-white rounded-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <Typography variant="h6" className="text-gray-900 font-medium">
                Search Results for "{searchQuery}"
              </Typography>
            </div>

            <div className="p-4">
              {/* Categories Results */}
              {filteredResults.categories.length > 0 && (
                <div className="mb-6">
                  <Typography
                    variant="subtitle1"
                    className="text-gray-700 font-medium mb-2"
                  >
                    Categories
                  </Typography>
                  <List className="divide-y divide-gray-200">
                    {filteredResults.categories.map((category) => (
                      <ListItem
                        key={category.id}
                        className="flex flex-col items-start"
                      >
                        <div className="flex items-center w-full">
                          <Chip
                            label="Category"
                            size="small"
                            color="primary"
                            className="mr-2"
                          />
                          <Typography variant="body1" className="font-medium">
                            {category.name}
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          className="text-gray-600 mt-1"
                        >
                          {category.widgets.length} widget(s)
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}

              {/* Widgets Results */}
              {filteredResults.widgets.length > 0 && (
                <div>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-700 font-medium mb-2"
                  >
                    Widgets
                  </Typography>
                  <List className="divide-y divide-gray-200">
                    {filteredResults.widgets.map((widget) => (
                      <Paper elevation={1} key={widget.id} className="mb-2">
                        <ListItem
                          divider
                          secondaryAction={
                            <IconButton
                              edge="end"
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "widget",
                                  id: widget.id,
                                  categoryId: widget.categoryId,
                                })
                              }
                              className="text-gray-700 hover:bg-gray-200"
                            >
                              <X size={16} />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={
                              <div className="flex items-center">
                                <Typography className="text-gray-900 font-medium">
                                  {widget.name}
                                </Typography>
                                {getGraphIcon(widget.type)}
                                <Chip
                                  label={widget.categoryName}
                                  size="small"
                                  variant="outlined"
                                  className="ml-2"
                                />
                              </div>
                            }
                            secondary={renderWidgetContent(widget)}
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                </div>
              )}

              {/* No Results */}
              {filteredResults.categories.length === 0 &&
                filteredResults.widgets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MagnifyingGlass
                      size={48}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <Typography className="text-gray-600">
                      No results found for "{searchQuery}"
                    </Typography>
                  </div>
                )}
            </div>
          </Paper>
        )}

        {/* Normal Dashboard View (when not searching) */}
        {!searchMode && (
          <>
            {/* Add Category Section */}
            <Paper elevation={1} className="mb-6 p-4 bg-white rounded-lg">
              <Typography
                variant="h6"
                gutterBottom
                className="text-gray-900 font-medium"
              >
                Add New Category
              </Typography>
              <div className="flex flex-col md:flex-row gap-3">
                <TextField
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  size="small"
                  fullWidth
                  className="bg-gray-50"
                  onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <Button
                  variant="contained"
                  onClick={handleAddCategory}
                  startIcon={<Plus size={18} />}
                  className="whitespace-nowrap bg-gray-900 hover:bg-gray-800 text-white"
                  disabled={!categoryName.trim()}
                >
                  Add Category
                </Button>
              </div>
            </Paper>

            {/* Categories Tabs */}
            {categories.length > 0 && (
              <Paper elevation={1} className="mb-6 bg-white rounded-lg">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  indicatorColor="primary"
                  textColor="inherit"
                  className="border-b border-gray-200"
                >
                  {categories.map((cat, index) => (
                    <Tab
                      key={cat.id}
                      label={cat.name}
                      className={
                        tabValue === index
                          ? "font-bold text-gray-900"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </Tabs>
              </Paper>
            )}

            {/* Render Categories */}
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className={tabValue !== index ? "hidden" : "block"}
              >
                <Paper
                  elevation={1}
                  className="mb-6 bg-white rounded-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <Typography
                      variant="h6"
                      className="text-gray-900 font-medium"
                    >
                      {cat.name}
                    </Typography>
                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Plus size={16} />}
                        onClick={() => {
                          setCategoryId(cat.id);
                          setOpenWidgetDialog(true);
                        }}
                        className="border-gray-700 text-gray-900 hover:bg-gray-50"
                      >
                        Add Widget
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setDeleteConfirm({ type: "category", id: cat.id })
                        }
                        className="text-gray-700 hover:bg-gray-200"
                      >
                        <Trash size={18} />
                      </IconButton>
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Widgets Grid/List View */}
                    {cat.widgets.filter((w) => w.visible).length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <EyeSlash
                          size={48}
                          className="mx-auto mb-2 opacity-50"
                        />
                        <Typography className="text-gray-600">
                          No widgets visible. Add some widgets or toggle
                          visibility in the manager.
                        </Typography>
                      </div>
                    ) : (
                      <List className="bg-white">
                        {cat.widgets
                          .filter((w) => w.visible)
                          .map((w) => (
                            <Paper elevation={1} key={w.id} className="mb-2">
                              <ListItem
                                divider
                                secondaryAction={
                                  <IconButton
                                    edge="end"
                                    onClick={() =>
                                      setDeleteConfirm({
                                        type: "widget",
                                        id: w.id,
                                        categoryId: cat.id,
                                      })
                                    }
                                    className="text-gray-700 hover:bg-gray-200"
                                  >
                                    <X size={16} />
                                  </IconButton>
                                }
                              >
                                <ListItemText
                                  primary={
                                    <div className="flex items-center">
                                      <Typography className="text-gray-900 font-medium">
                                        {w.name}
                                      </Typography>
                                      {getGraphIcon(w.type)}
                                    </div>
                                  }
                                  secondary={renderWidgetContent(w)}
                                />
                              </ListItem>
                            </Paper>
                          ))}
                      </List>
                    )}
                  </div>
                </Paper>
              </div>
            ))}

            {/* Empty State */}
            {categories.length === 0 && (
              <Paper
                elevation={1}
                className="text-center py-12 bg-white rounded-lg"
              >
                <div className="p-4">
                  <SquaresFour
                    size={64}
                    className="mx-auto mb-4 text-gray-400"
                  />
                  <Typography
                    variant="h6"
                    className="text-gray-700"
                    gutterBottom
                  >
                    No categories yet
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Add a category to get started with your dashboard
                  </Typography>
                </div>
              </Paper>
            )}
          </>
        )}
      </div>

      {/* Add Widget Dialog */}
      <Dialog
        open={openWidgetDialog}
        onClose={() => setOpenWidgetDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            borderBottom: 1,
            borderColor: "grey.200",
            pb: 2,
          }}
        >
          <Typography variant="h6" color="text.primary">
            Add New Widget
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Configure your widget settings
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                label="Widget Name"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                fullWidth
                autoFocus
                variant="standard"
              />
            </Grid>

            <Grid item>
              <FormControl fullWidth>
                <InputLabel>Widget Type</InputLabel>
                <Select
                  value={widgetType}
                  label="Widget Type"
                  onChange={(e) => setWidgetType(e.target.value)}
                >
                  <MenuItem value="text">Text Widget</MenuItem>
                  <MenuItem value="line">Line Chart</MenuItem>
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="pie">Pie Chart</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {widgetType === "text" ? (
              <Grid item>
                <TextField
                  label="Widget Content"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            ) : (
              <Grid item>
                <Box mb={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    color="text.primary"
                  >
                    Graph Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add at least 2 data points with name and value
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxHeight: 240,
                    overflowY: "auto",
                    p: 0.5,
                  }}
                >
                  {graphData.map((data, index) => (
                    <Grid
                      container
                      spacing={2}
                      key={index}
                      alignItems="flex-start"
                    >
                      <Grid item xs={5}>
                        <TextField
                          label="Name"
                          value={data.name}
                          onChange={(e) =>
                            updateGraphData(index, "name", e.target.value)
                          }
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          label="Value"
                          type="number"
                          value={data.value}
                          onChange={(e) =>
                            updateGraphData(index, "value", e.target.value)
                          }
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeGraphDataField(index)}
                          disabled={graphData.length <= 1}
                          size="small"
                        >
                          <X size={18} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Box>

                <Button
                  onClick={addGraphDataField}
                  startIcon={<Plus size={16} />}
                  sx={{ mt: 2 }}
                  variant="outlined"
                  size="small"
                >
                  Add Data Point
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            bgcolor: "grey.50",
            borderTop: 1,
            borderColor: "grey.200",
            px: 4,
            py: 2.5,
          }}
        >
          <Button
            onClick={() => setOpenWidgetDialog(false)}
            color="inherit"
            sx={{ px: 3 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddWidget}
            startIcon={<Plus size={18} />}
            disabled={
              !widgetName.trim() ||
              (widgetType === "text" && !widgetText.trim()) ||
              (widgetType !== "text" &&
                graphData.filter((item) => item.name && item.value).length < 2)
            }
            sx={{ px: 3 }}
          >
            Add Widget
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ className: "bg-white rounded-lg" }}
      >
        <DialogTitle className="text-center bg-gray-50 border-b border-gray-200">
          <Trash size={32} className="mx-auto mb-2 text-gray-700" />
          <Typography variant="h6" className="text-gray-900 font-medium">
            {deleteConfirm?.type === "category"
              ? "Delete Category?"
              : "Delete Widget?"}
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-4">
          <Typography variant="body2" className="text-center text-gray-700">
            {deleteConfirm?.type === "category"
              ? "This will delete the category and all its widgets. This action cannot be undone."
              : "This widget will be permanently deleted. This action cannot be undone."}
          </Typography>
        </DialogContent>
        <DialogActions className="bg-gray-50 border-t border-gray-200 px-4 py-3">
          <Button
            onClick={() => setDeleteConfirm(null)}
            className="text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (deleteConfirm?.type === "category") {
                dispatch(removeCategory(deleteConfirm.id));
              } else {
                dispatch(
                  removeWidget({
                    categoryId: deleteConfirm.categoryId,
                    widgetId: deleteConfirm.id,
                  })
                );
              }
              setDeleteConfirm(null);
            }}
            startIcon={<Trash size={18} />}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Manager Dialog */}
      <Dialog
        open={categoryManagerOpen}
        onClose={() => setCategoryManagerOpen(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ className: "bg-white rounded-lg" }}
      >
        <DialogTitle className="bg-gray-50 border-b border-gray-200">
          <Typography variant="h6" className="text-gray-900 font-medium">
            Category Manager
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-4">
          {categories.length === 0 ? (
            <Typography
              variant="body2"
              className="text-center py-4 text-gray-600"
            >
              No categories to manage
            </Typography>
          ) : (
            <List className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <div key={cat.id} className="py-3">
                  <ListItem className="pl-0">
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          className="text-gray-900 font-medium"
                        >
                          {cat.name}
                        </Typography>
                      }
                      secondary={
                        <Typography className="text-gray-600">
                          {cat.widgets.length} widgets
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setCategoryManagerOpen(false);
                          setDeleteConfirm({ type: "category", id: cat.id });
                        }}
                        className="text-gray-700 hover:bg-gray-200"
                      >
                        <Trash size={18} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <List className="ml-4 mt-2 bg-gray-50 rounded-lg p-2">
                    {cat.widgets.map((w) => (
                      <ListItem key={w.id} className="pl-2">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={w.visible}
                              onChange={() =>
                                dispatch(
                                  toggleWidgetVisibility({
                                    categoryId: cat.id,
                                    widgetId: w.id,
                                  })
                                )
                              }
                              className="text-gray-900"
                            />
                          }
                          label={
                            <div className="flex items-center">
                              <Typography className="text-gray-900">
                                {w.name}
                              </Typography>
                              {getGraphIcon(w.type)}
                            </div>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setCategoryManagerOpen(false);
                              setDeleteConfirm({
                                type: "widget",
                                id: w.id,
                                categoryId: cat.id,
                              });
                            }}
                            className="text-gray-700 hover:bg-gray-200"
                          >
                            <Trash size={16} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions className="bg-gray-50 border-t border-gray-200 px-4 py-3">
          <Button
            onClick={() => setCategoryManagerOpen(false)}
            className="text-gray-700 hover:bg-gray-200"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
