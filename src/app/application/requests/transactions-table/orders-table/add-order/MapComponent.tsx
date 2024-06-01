// import { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import { Controller } from "react-hook-form";
// import { TileLayer } from "react-leaflet";
// import { Input } from "@/components/ui/input";

// export const MapComponent = ({
//   control,
//   name,
// }: {
//   control: any;
//   name: string;
// }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => {
//         const map = useMap();
//         useEffect(() => {
//           const fetchLocation = async () => {
//             const location = field.value;
//             if (location) {
//               const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
//               );
//               const searchResults = await response.json();
//               if (searchResults && searchResults[0]) {
//                 const { lat, lon } = searchResults[0];
//                 map.flyTo([parseFloat(lat), parseFloat(lon)], 13);
//               }
//             }
//           };
//           fetchLocation();
//         }, [field.value]);
//         return (
//           <Input
//             className="rounded-lg bg-lightComponentBg border-slate-600/50 w-full"
//             {...field}
//             type="text"
//             placeholder="Enter YAWA"
//             defaultValue={field.value || ""}
//             onChange={async (e) => {
//               field.onChange(e.target.value);
//               const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
//               );
//               const searchResults = await response.json();
//               if (searchResults && searchResults[0]) {
//                 const { lat, lon } = searchResults[0];
//                 map.flyTo([parseFloat(lat), parseFloat(lon)], 13);
//               }
//             }}
//           />
//         );
//       }}
//     />
//   );
// };
