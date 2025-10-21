import React, { useEffect, useState } from "react";
import { getRapidApi } from "../../services/rapidapi.service";
import { addExercise } from "../../services/exercise.service";
import WorkoutDetails from "./WorkoutDetails";
import SelectClient from "../clients/SelectClient";

function Workouts() {
  const [list, setList] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getWorkouts();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const getWorkouts = async () => {
    const data = await getRapidApi();
    data && setList(data);
  };

  const handleClientSelect = (client) => {
    console.log("Selected client:", client);
    setSelectedClient(client);
  };

  const saveExerciseToBackend = async (exercise) => {
    if (!selectedClient) {
      setNotification("Please select a client first!");
      return;
    }

    if (exercise) {
      try {
        const modifiedExercise = {
          gifUrl: exercise.gifUrl,
          name: exercise.name,
          instructions: exercise.instructions,
          bodyPart: exercise.bodyPart,
          client: { id: selectedClient.id.toString() },
        };
        
        console.log("Sending exercise to backend:", modifiedExercise);
        console.log("Auth token present:", !!localStorage.getItem("authToken"));
        
        const response = await addExercise(modifiedExercise);
        console.log("Exercise saved successfully:", response);
        setNotification(`Exercise "${exercise.name}" added successfully for ${selectedClient.name}!`);
      } catch (error) {
        console.error("Error from saveExerciseToBackend function: ", error);
        console.error("Error response:", error.response);
        
        if (error.response?.status === 403) {
          setNotification("Authentication failed. Please refresh the page and try again.");
        } else {
          setNotification(`Failed to add exercise: ${error.response?.data?.message || error.message}`);
        }
      }
    }
  };

  const workoutList = list?.map((exercise) => (
    <div
      key={exercise?.id}
      className="d-flex flex-column justify-content-between align-items-center"
    >
      <WorkoutDetails list={exercise} />
      <button 
        type="button"
        className="btn btn-primary w-100 mt-2 mb-2"
        onClick={() => saveExerciseToBackend(exercise)}
        disabled={!selectedClient}
      >
        Save
      </button>
    </div>
  ));

  return (
    <div className="container">
      {notification && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {notification}
          <button
            type="button"
            className="btn-close"
            onClick={() => setNotification("")}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="mb-3 d-flex justify-content-start align-items-center gap-3">
        <SelectClient onClientSelect={handleClientSelect} />
        {selectedClient && (
          <span className="badge bg-success">
            Selected: {selectedClient.name}
          </span>
        )}
      </div>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {list && workoutList}
      </div>
    </div>
  );
}

export default Workouts;
