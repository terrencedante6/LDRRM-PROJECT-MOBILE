// import { useState, useEffect } from "react";
// export default function LocateDevice() {
//   type Coordinates = {
//     latitude: number;
//     longitude: number;
//   };

//   const [coords, setCoords] = useState<Coordinates | null>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCoords(position.coords);
//         },
//         (error) => {
//           console.error(error);
//         },
//         {
//           maximumAge: 60000,
//           enableHighAccuracy: true,
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center">
//       {coords ? (
//         <div className="text-center text-white">
//           <h1 className="text-2xl">Your coordinates:</h1>
//           <p>{`Latitude: ${coords.latitude}`}</p>
//           <p>{`Longitude: ${coords.longitude}`}</p>
//           <p>
//             please copy the coordinates and paste it to the form. So we can
//             better find your location
//           </p>
//           <button
//             onClick={() => {
//               navigator.clipboard.writeText(
//                 `${coords.latitude},${coords.longitude}`
//               );
//             }}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Copy to Clipboard
//           </button>
//         </div>
//       ) : (
//         <p>Waiting for your location...</p>
//       )}
//     </div>
//   );
// }
