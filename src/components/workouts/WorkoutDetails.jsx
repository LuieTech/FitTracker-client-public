// // 
// import React from "react";

// function WorkoutDetails({ list }) {
//   const { name, description, bodyPart, difficulty, target, id } = list;

//   console.log("This is the workout id: ", id);
  

//   return (
//     <div>
//       <div
//         className="card"
//         style={{
//           width: "100%",
//           height: "480px",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Image */}
//         <div className="d-flex justify-content-center p-2">
//           <img
//             src={`https://exercisedb.p.rapidapi.com/image?resolution=360&exerciseId=${id}`}
//             className="card-img-top"
//             alt="Workout-image"
//             style={{ width: "50%", height: "170px", objectFit: "contain" }}
//           />
//         </div>

//         {/* Scrollable Content Area */}
//         <div
//           className="card-body overflow-auto"
//           style={{ flex: "1 1 auto", maxHeight: "200px" }}
//         >
//           <h6 className="card-title fw-bold">{name}</h6>
//           <p className="card-text" style={{ fontSize: "0.85rem" }}>
//             {description}
//           </p>
//         </div>

//         {/* Info List */}
//         <ul className="list-group list-group-flush">
//           <li className="list-group-item">
//             <span className=" text-primary"><i>Body Part: </i></span>
//              {bodyPart}
//           </li>
//           <li className="list-group-item">
//             <span className=" text-primary"><i>Difficulty: </i></span>
//              {difficulty}
//           </li>
//           <li className="list-group-item">
//             <span className=" text-primary"><i>Target: </i></span>
//             {target}
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default WorkoutDetails;

import React, { useEffect, useState } from "react";
import { getRapidApiImages } from "../../services/rapidapi.service";

function WorkoutDetails({ list }) {
  const { name, description, bodyPart, difficulty, target, id } = list;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getRapidApiImages(id);
        setImageUrl(url);
      } catch (err) {
        console.error("Error loading workout image:", err);
      }
    };
    fetchImage();
  }, [id]);

  return (
    <div>
      <div
        className="card"
        style={{
          width: "100%",
          height: "480px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div className="d-flex justify-content-center p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="card-img-top"
              alt={name}
              style={{ width: "50%", height: "170px", objectFit: "contain" }}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "50%",
                height: "170px",
                backgroundColor: "#f0f0f0",
                color: "#777",
                fontSize: "0.9rem",
              }}
            >
              Loading...
            </div>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div
          className="card-body overflow-auto"
          style={{ flex: "1 1 auto", maxHeight: "200px" }}
        >
          <h6 className="card-title fw-bold">{name}</h6>
          <p className="card-text" style={{ fontSize: "0.85rem" }}>
            {description}
          </p>
        </div>

        {/* Info List */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="text-primary"><i>Body Part: </i></span>
            {bodyPart}
          </li>
          <li className="list-group-item">
            <span className="text-primary"><i>Difficulty: </i></span>
            {difficulty}
          </li>
          <li className="list-group-item">
            <span className="text-primary"><i>Target: </i></span>
            {target}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WorkoutDetails;
