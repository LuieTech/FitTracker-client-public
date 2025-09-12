import React, { useEffect, useState } from "react";
import { getRapidApi } from "../../services/rapidapi.service";
import WorkoutDetails from "./WorkoutDetails";

function Workouts() {
  const [list, setList] = useState(null);

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = async () => {
    const data = await getRapidApi();
    data && setList(data);
  };

  const workoutList = list?.map((list) => (
    <div key={list?.id}>
      <WorkoutDetails list={list} />
    </div>
  ));

  console.log("this is list from Workout component", list);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {list && workoutList}
    </div>
  );
}

export default Workouts;
