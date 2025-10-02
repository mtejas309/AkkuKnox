import React, { useState, useEffect, useRef } from "react";
import {
  Chair,
  Building,
  MapPin,
  X,
  Calendar,
  Clock,
  User,
  Users,
  HandGrabbing,
} from "@phosphor-icons/react";
import Bg from "../assets/Screenshot 2025-10-01 105505.png";

function InteractiveFloor() {
  // Enhanced sample data generation
  const generateSampleData = () => {
    const blocks = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const wings = ["North", "South", "East", "West", "Central"];
    const deskTypes = [
      "Standard",
      "Standing",
      "Collaborative",
      "Private",
      "Executive",
    ];
    const amenities = ["Monitor", "Docking", "Phone", "Whiteboard", "Window"];

    const data = [];
    let id = 1;

    blocks.forEach((block) => {
      for (let floor = 1; floor <= 15; floor++) {
        const floorName = `${floor}F`;
        const desksPerFloor = 20 + Math.floor(Math.random() * 15); // 20-34 desks per floor

        for (let i = 1; i <= desksPerFloor; i++) {
          const deskAmenities = [];
          // Randomly assign 1-3 amenities
          const amenityCount = 1 + Math.floor(Math.random() * 3);
          for (let j = 0; j < amenityCount; j++) {
            const randomAmenity =
              amenities[Math.floor(Math.random() * amenities.length)];
            if (!deskAmenities.includes(randomAmenity)) {
              deskAmenities.push(randomAmenity);
            }
          }

          data.push({
            id: id++,
            name: `Desk ${block}-${floor.toString().padStart(2, "0")}-${i
              .toString()
              .padStart(2, "0")}`,
            x: 5 + Math.random() * 90, // More spread out
            y: 5 + Math.random() * 90,
            occupied: Math.random() > 0.5,
            floor: floorName,
            wing: wings[Math.floor(Math.random() * wings.length)],
            block: block,
            type: deskTypes[Math.floor(Math.random() * deskTypes.length)],
            capacity: 1 + Math.floor(Math.random() * 4), // 1-4 people
            amenities: deskAmenities,
            lastCleaned: new Date(
              Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
            ).toISOString(), // Within last 7 days
            bookedUntil:
              Math.random() > 0.8
                ? new Date(
                    Date.now() + Math.random() * 24 * 60 * 60 * 1000
                  ).toISOString()
                : null,
          });
        }
      }
    });
    const customDesks = [
      {
        id: id++,
        name: "Desk A-01-01",
        x: 15, // 15% from left
        y: 25, // 25% from top
        occupied: false,
        floor: "1F",
        wing: "Central",
        block: "A",
        type: "Executive",
        capacity: 2,
        amenities: ["Monitor", "Docking", "Window"],
        lastCleaned: new Date().toISOString(),
        bookedUntil: null,
      },
      {
        id: id++,
        name: "Desk A-01-02",
        x: 50, // 50% from left
        y: 50, // 50% from top
        occupied: true,
        floor: "1F",
        wing: "North",
        block: "A",
        type: "Collaborative",
        capacity: 4,
        amenities: ["Monitor", "Whiteboard"],
        lastCleaned: new Date().toISOString(),
        bookedUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      },
      {
        id: id++,
        name: "Desk A-01-03",
        x: 35, // 35% from left
        y: 60, // 60% from top
        occupied: false,
        floor: "1F",
        wing: "South",
        block: "A",
        type: "Standing",
        capacity: 1,
        amenities: ["Monitor"],
        lastCleaned: new Date().toISOString(),
        bookedUntil: null,
      },
    ];
    data.push(...customDesks);

    return data;
  };

  const [desks, setDesks] = useState([]);
  const [hoverDesk, setHoverDesk] = useState(null);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    from: "",
    to: "",
    purpose: "",
    attendees: 1,
  });

  // Filters
  const [selectedBlock, setSelectedBlock] = useState("A");
  const [selectedFloor, setSelectedFloor] = useState("1F");
  const [selectedWing, setSelectedWing] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minCapacity, setMinCapacity] = useState(1);
  const [showOnlyOccupied, setShowOnlyOccupied] = useState(false);

  // Dragging and zoom state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  // Calculate if a desk is available for booking
  const isDeskAvailable = (desk) => {
    if (!desk.occupied) return true;

    // Check if the booking has expired
    if (desk.bookedUntil && new Date(desk.bookedUntil) < new Date()) {
      return true;
    }

    return false;
  };

  // Initialize data
  useEffect(() => {
    setDesks(generateSampleData());

    // Set default booking date to today
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];
    setBookingDetails((prev) => ({ ...prev, date: dateString }));
  }, []);

  // Dragging handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  // Zoom handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newScale = e.deltaY > 0 ? scale - zoomSpeed : scale + zoomSpeed;
    setScale(Math.max(0.5, Math.min(3, newScale))); // Limit scale between 0.5x and 3x
  };

  // Reset view
  const resetView = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const toggleDesk = (id) => {
    setDesks((prev) =>
      prev.map((desk) =>
        desk.id === id ? { ...desk, occupied: !desk.occupied } : desk
      )
    );
    setSelectedDesk(null);
    setBookingDetails({
      date: new Date().toISOString().split("T")[0],
      from: "",
      to: "",
      purpose: "",
      attendees: 1,
    });
  };

  const bookDesk = (id) => {
    if (!bookingDetails.date || !bookingDetails.from || !bookingDetails.to) {
      alert("Please fill in all booking details");
      return;
    }

    setDesks((prev) =>
      prev.map((desk) =>
        desk.id === id
          ? {
              ...desk,
              occupied: true,
              bookedUntil: new Date(
                `${bookingDetails.date}T${bookingDetails.to}`
              ).toISOString(),
            }
          : desk
      )
    );

    // Show success message
    alert(
      `Successfully booked ${selectedDesk?.name} for ${bookingDetails.date} from ${bookingDetails.from} to ${bookingDetails.to}`
    );

    setSelectedDesk(null);
    setBookingDetails({
      date: new Date().toISOString().split("T")[0],
      from: "",
      to: "",
      purpose: "",
      attendees: 1,
    });
  };

  // Extract unique filter options from current data
  const blocks = [...new Set(desks.map((d) => d.block))].sort();
  const floors = [...new Set(desks.map((d) => d.floor))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const wings = [...new Set(desks.map((d) => d.wing))];
  const types = [...new Set(desks.map((d) => d.type))];
  const capacities = [...new Set(desks.map((d) => d.capacity))].sort(
    (a, b) => a - b
  );

  // Apply filters to desks
  const filteredDesks = desks.filter((desk) => {
    const blockMatch = desk.block === selectedBlock;
    const floorMatch = desk.floor === selectedFloor;
    const wingMatch = !selectedWing || desk.wing === selectedWing;
    const typeMatch = !selectedType || desk.type === selectedType;
    const capacityMatch = desk.capacity >= minCapacity;
    const occupiedMatch = !showOnlyOccupied || !isDeskAvailable(desk);

    return (
      blockMatch &&
      floorMatch &&
      wingMatch &&
      typeMatch &&
      capacityMatch &&
      occupiedMatch
    );
  });

  // Get desk status color
  const getDeskColor = (desk) => {
    if (!isDeskAvailable(desk)) return "#dc3545"; // Occupied - red
    return "#28a745"; // Available - green
  };

  // Get desk status text
  const getDeskStatus = (desk) => {
    if (!isDeskAvailable(desk)) {
      if (desk.bookedUntil) {
        return `Booked until ${new Date(desk.bookedUntil).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}`;
      }
      return "Occupied";
    }
    return "Available";
  };

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <Building size={32} />
          Office Space Management
        </h1>
        <p style={{ color: "#6c757d", fontSize: "16px" }}>
          Select block, floor, and filters to find and book available desks
        </p>
      </div>

      {/* Main controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginBottom: 30,
          alignItems: "end",
        }}
      >
        {/* Block Selection */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <MapPin size={16} style={{ display: "inline", marginRight: 8 }} />
            Select Block:
          </label>
          <select
            value={selectedBlock}
            onChange={(e) => {
              setSelectedBlock(e.target.value);
              setSelectedFloor("1F");
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #007bff",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {blocks.map((block) => (
              <option key={block} value={block}>
                Block {block}
              </option>
            ))}
          </select>
        </div>

        {/* Floor Selection */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Select Floor:
          </label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #28a745",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                Floor {floor}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <select
              value={selectedWing}
              onChange={(e) => setSelectedWing(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              <option value="">All Wings</option>
              {wings.map((w) => (
                <option key={w} value={w}>
                  {w} Wing
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
              Min Capacity:
            </label>
            <select
              value={minCapacity}
              onChange={(e) => setMinCapacity(parseInt(e.target.value))}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
                flex: 1,
              }}
            >
              {capacities.map((c) => (
                <option key={c} value={c}>
                  {c} {c === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowOnlyOccupied(!showOnlyOccupied)}
            style={{
              padding: "8px",
              background: showOnlyOccupied ? "#dc3545" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {showOnlyOccupied ? "Show All Desks" : "Show Only Occupied"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 15,
          background: "#f8f9fa",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: 25,
          border: "1px solid #dee2e6",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "28px", fontWeight: "bold", color: "#007bff" }}
          >
            {filteredDesks.length}
          </div>
          <div style={{ fontSize: "14px", color: "#6c757d" }}>Total Desks</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "28px", fontWeight: "bold", color: "#28a745" }}
          >
            {filteredDesks.filter((d) => isDeskAvailable(d)).length}
          </div>
          <div style={{ fontSize: "14px", color: "#6c757d" }}>Available</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "28px", fontWeight: "bold", color: "#dc3545" }}
          >
            {filteredDesks.filter((d) => !isDeskAvailable(d)).length}
          </div>
          <div style={{ fontSize: "14px", color: "#6c757d" }}>Occupied</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "28px", fontWeight: "bold", color: "#ffc107" }}
          >
            {filteredDesks.filter((d) => d.capacity > 1).length}
          </div>
          <div style={{ fontSize: "14px", color: "#6c757d" }}>Team Desks</div>
        </div>
      </div>

      {/* Floor map with drag functionality */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            margin: "0 auto",
            border: "2px solid #ccc",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Floor plan container that moves and scales */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#f0f0f0",
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.1s ease",
            }}
          >
            {/* Render desks - they move with the floor plan */}
            {filteredDesks.map((desk) => {
              const isAvailable = isDeskAvailable(desk);
              const deskColor = getDeskColor(desk);

              // Don't show available desks when only occupied filter is enabled
              if (showOnlyOccupied && isAvailable) {
                return null;
              }

              return (
                <div
                  key={desk.id}
                  onMouseEnter={() => setHoverDesk(desk)}
                  onMouseLeave={() => setHoverDesk(null)}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking desks
                    setSelectedDesk(desk);
                  }}
                  style={{
                    position: "absolute",
                    left: `${desk.x}%`,
                    top: `${desk.y}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "8px",
                    padding: "6px",
                    color: deskColor,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    transition: "all 0.3s",
                    border: `2px solid ${deskColor}`,
                    zIndex: hoverDesk?.id === desk.id ? 10 : 1,
                    transform:
                      hoverDesk?.id === desk.id
                        ? "translate(-50%, -50%) scale(1.3)"
                        : "translate(-50%, -50%)",
                  }}
                  title={`${desk.name} - ${getDeskStatus(desk)}`}
                >
                  <Chair
                    size={20}
                    weight={hoverDesk?.id === desk.id ? "fill" : "regular"}
                  />
                  {desk.capacity > 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        background: "#ffc107",
                        color: "white",
                        borderRadius: "50%",
                        width: 16,
                        height: 16,
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {desk.capacity}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hover tooltip */}
          {hoverDesk && (
            <div
              style={{
                position: "absolute",
                left: `calc(${hoverDesk.x}% + ${position.x}px)`,
                top: `calc(${hoverDesk.y}% + ${position.y}px)`,
                transform: `translate(20px, -50%) scale(${1 / scale})`,
                background: "#fff",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                fontSize: "14px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 20,
                minWidth: 250,
                maxWidth: 300,
                pointerEvents: "none",
              }}
            >
              <strong
                style={{ fontSize: "16px", display: "block", marginBottom: 8 }}
              >
                {hoverDesk.name}
              </strong>
              <div
                style={{
                  color: getDeskColor(hoverDesk),
                  fontWeight: "bold",
                  margin: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ● {getDeskStatus(hoverDesk)}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Building size={14} />
                  <span>Block {hoverDesk.block}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span>🏢</span>
                  <span>{hoverDesk.floor}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span>🧭</span>
                  <span>{hoverDesk.wing}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Users size={14} />
                  <span>
                    {hoverDesk.capacity} person
                    {hoverDesk.capacity > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <strong>Type:</strong> {hoverDesk.type}
              </div>
              {hoverDesk.amenities.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <strong>Amenities:</strong> {hoverDesk.amenities.join(", ")}
                </div>
              )}
              <div
                style={{ marginTop: 12, fontSize: "12px", color: "#6c757d" }}
              >
                Last cleaned:{" "}
                {new Date(hoverDesk.lastCleaned).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Current selection indicator */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "white",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "2px solid #007bff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 5,
          }}
        >
          📍 {selectedBlock} Block • {selectedFloor} •{" "}
          {selectedWing || "All Wings"}
          {selectedType && ` • ${selectedType}`}
          {showOnlyOccupied && " • Occupied Only"}
        </div>

        {/* Zoom and reset controls */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            background: "white",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 5,
          }}
        >
          <button
            onClick={() => setScale((prev) => Math.min(3, prev + 0.2))}
            style={{
              padding: "8px 12px",
              border: "1px solid #007bff",
              background: "#007bff",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            +
          </button>
          <button
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.2))}
            style={{
              padding: "8px 12px",
              border: "1px solid #dc3545",
              background: "#dc3545",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            -
          </button>
          <button
            onClick={resetView}
            style={{
              padding: "8px 12px",
              border: "1px solid #6c757d",
              background: "#6c757d",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <HandGrabbing size={14} />
            Reset
          </button>
        </div>

        {/* Drag instructions */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            background: "rgba(255,255,255,0.9)",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#6c757d",
            display: "flex",
            alignItems: "center",
            gap: 6,
            zIndex: 5,
          }}
        >
          <HandGrabbing size={14} />
          Drag to move • Scroll to zoom
        </div>
      </div>

      {/* Enhanced Booking Popup */}
      {selectedDesk && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setSelectedDesk(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 500,
              padding: "24px",
              border: "1px solid #ddd",
              borderRadius: "16px",
              background: "#fff",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid #eee",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Chair size={24} />
                Book {selectedDesk.name}
              </h3>
              <button
                onClick={() => setSelectedDesk(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Desk Information */}
            <div
              style={{
                background: "#f8f9fa",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  fontSize: "14px",
                }}
              >
                <div>
                  <strong>Location:</strong>
                  <div>
                    Block {selectedDesk.block} • {selectedDesk.floor} •{" "}
                    {selectedDesk.wing} Wing
                  </div>
                </div>
                <div>
                  <strong>Details:</strong>
                  <div>
                    {selectedDesk.type} • {selectedDesk.capacity} person
                    {selectedDesk.capacity > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              {selectedDesk.amenities.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <strong>Amenities:</strong>{" "}
                  {selectedDesk.amenities.join(", ")}
                </div>
              )}
              <div
                style={{
                  color: getDeskColor(selectedDesk),
                  fontWeight: "bold",
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ● {getDeskStatus(selectedDesk)}
              </div>
            </div>

            {/* Booking Form */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <Calendar
                    size={16}
                    style={{ display: "inline", marginRight: 8 }}
                  />
                  Date:
                </label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <User
                    size={16}
                    style={{ display: "inline", marginRight: 8 }}
                  />
                  Attendees:
                </label>
                <select
                  value={bookingDetails.attendees}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      attendees: parseInt(e.target.value),
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  {[...Array(selectedDesk.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <Clock
                    size={16}
                    style={{ display: "inline", marginRight: 8 }}
                  />
                  From:
                </label>
                <input
                  type="time"
                  value={bookingDetails.from}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      from: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  <Clock
                    size={16}
                    style={{ display: "inline", marginRight: 8 }}
                  />
                  To:
                </label>
                <input
                  type="time"
                  value={bookingDetails.to}
                  onChange={(e) =>
                    setBookingDetails({ ...bookingDetails, to: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Purpose (Optional):
              </label>
              <input
                type="text"
                placeholder="Meeting, focused work, collaboration..."
                value={bookingDetails.purpose}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    purpose: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={() => setSelectedDesk(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "2px solid #6c757d",
                  background: "white",
                  color: "#6c757d",
                  fontSize: "16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  isDeskAvailable(selectedDesk)
                    ? bookDesk(selectedDesk.id)
                    : toggleDesk(selectedDesk.id)
                }
                disabled={
                  !isDeskAvailable(selectedDesk) &&
                  (!bookingDetails.date ||
                    !bookingDetails.from ||
                    !bookingDetails.to)
                }
                style={{
                  flex: 2,
                  padding: "12px",
                  border: "none",
                  background: isDeskAvailable(selectedDesk)
                    ? "#28a745"
                    : "#dc3545",
                  color: "#fff",
                  fontSize: "16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  opacity:
                    !isDeskAvailable(selectedDesk) &&
                    (!bookingDetails.date ||
                      !bookingDetails.from ||
                      !bookingDetails.to)
                      ? 0.6
                      : 1,
                }}
              >
                {isDeskAvailable(selectedDesk)
                  ? `Book Desk for ${bookingDetails.date || "selected date"}`
                  : "Release Desk"}
              </button>
            </div>

            {!isDeskAvailable(selectedDesk) && selectedDesk.bookedUntil && (
              <div
                style={{
                  marginTop: 16,
                  padding: "12px",
                  background: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#856404",
                }}
              >
                <strong>Note:</strong> This desk is booked until{" "}
                {new Date(selectedDesk.bookedUntil).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveFloor;
