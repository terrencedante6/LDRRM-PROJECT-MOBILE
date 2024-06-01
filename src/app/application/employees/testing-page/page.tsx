// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Banner from "@/images/posing.jpeg";
// import { cn } from "@/lib/utils";
// import UpdateEmployeeButton from "./update-employee/update-employee-dialog";
// import DeleteEmployeeButton from "./delete-employee/delete-employee-dialog";

// export default function Page({ employee, roles }: any) {
//   return (
//     <div className="flex flex-col justify-start place-items-center w-full h-full gap-7 p-8">
//       <div className="space-y-2 w-[90%] h-fit rounded-2xl">
//         <div className="w-full h-full flex max-w-[1840px] max-h-[900px] justify-center place-items-center gap-7">
//           <div className="w-full h-full flex gap-7 rounded-xl">
//             <div className="w-full h-full flex flex-col gap-2 justify-around bg-white Bg rounded-2xl shadow-lg border border-lightBorder overflow-hidden p-7 space-y-7">
//               <div className="font-bold py-1">
//                 <h1>General Information</h1>
//               </div>
//               <div className="w-full flex flex-row gap-7">
//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     First Name
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.first_name}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Last Name
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.last_name}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Birthday
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.dob}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full flex flex-row gap-7">
//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Contact number
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.contact_number}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Email
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.email}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Gender
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.gender}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="font-bold py-4">
//                 <h1>Worker Information</h1>
//               </div>
//               <div className="w-full flex flex-row gap-7">
//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Address
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.address}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Work position
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.roles.role}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-2">
//                   <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
//                     Added at
//                   </span>
//                   <div className="w-full min-w-0 bg-gray-300 rounded-lg">
//                     <p className="text-sm 2xl:text-md text-black gap-2 p-2 max-w-[260px] truncate">
//                       {employee.created_at}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="justify-center text-center w-full space-x-1 space-y-4">
//                 <DeleteEmployeeButton employee={employee} />
//                 <UpdateEmployeeButton employee={employee} roles={roles} />
//               </div>
//             </div>
//             <div className="w-[50%] 2xl:w-[50%] h-fit flex flex-col gap-2">
//               <div className="w-full h-fit flex flex-col gap-2 justify-around bg-white place-items-center Bg rounded-2xl shadow-lg border border-lightBorder overflow-hidden">
//                 <div className="w-full h-[170px] 2xl:h-[210px] bg-black rounded-xl relative">
//                   <Image
//                     alt="picture"
//                     className="w-full h-full object-cover opacity-75"
//                     src={Banner}
//                   ></Image>
//                   <span className="flex overflow-hidden rounded-full w-40 h-40 cursor-pointer z-0 absolute -bottom-[35%] left-40 border-8 border-neutral-900 bg-slate-500 ">
//                     <span className="flex h-full w-full items-center justify-center rounded-full font-bold text-2xl text-white">
//                       TD
//                     </span>
//                   </span>
//                 </div>
//                 <div className="w-full h-full flex flex-col items-center justify-center mt-20">
//                   <h2 className="flex text-2xl font-bold place-items-center gap-3 text-center">
//                     {employee.first_name} {employee.last_name}
//                     <div
//                       className={cn(
//                         "text-xs rounded-full py-1 px-2 border font-normal flex place-items-center gap-1 cursor-pointer",
//                         employee.status === "Available"
//                           ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500"
//                           : employee.status === "In Progress"
//                           ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
//                           : "text-red-500 bg-red-500 bg-opacity-20 border-red-500"
//                       )}
//                     >
//                       <div
//                         className={cn(
//                           "w-2 h-2 rounded-full",
//                           employee.status === "Available"
//                             ? " bg-green-500 "
//                             : employee.status === "In Progress"
//                             ? "bg-yellow-300 "
//                             : "bg-red-500"
//                         )}
//                       ></div>
//                       {employee.status}
//                     </div>
//                   </h2>
//                   <div className="flex text-2xl font-bold place-items-center gap-2 text-center py-4">
//                     <Button>Activity Logs</Button> <Button>Message</Button>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full h-full flex flex-col gap-2 justify-around bg-white place-items-center Bg rounded-2xl shadow-lg border border-lightBorder overflow-hidden">
//                 <div className="w-full h-full">
//                   <iframe
//                     className="w-full h-full"
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.644211999011!2d123.2626467!3d9.289425199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOsKwMjMnMzQuMCJTIDEyM8KwMzMnMTAuNyJF!5e0!3m2!1sen!2sph!4v1648767287790!5m2!1sen!2sph"
//                     allowFullScreen={true}
//                     loading="lazy"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white bg-clip-border draggable">
//           <div className="flex flex-wrap -mx-3">
//             <div className="flex-none w-auto max-w-full px-3">
//               <div className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
//                 <img
//                   src="https://static1.personality-database.com/profile_images/a245f04f64d34da29e920e0547a7d4e7.png"
//                   alt="profile_image"
//                   className="max-w-full shadow-soft-sm rounded-3xl max-h-20"
//                 />
//               </div>
//             </div>
//             <div className="flex-none w-auto max-w-full px-3 my-auto">
//               <div className="h-full">
//                 <h5 className="mb-1">
//                   {/* {employee.first_name} {employee.last_name} */}
//                 </h5>
//                 <p className="mb-0 font-semibold leading-normal text-sm">
//                   Shadow / Jacker
//                 </p>
//               </div>
//               {/* <DeleteEmployeeButton employee={employee} /> */}
//               {/* <UpdateEmployeeButton employee={employee} roles={roles} /> */}
//             </div>
//             <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
//           </div>
//         </div>
//         <div className="w-full pb-6 mx-auto removable mt-4">
//           <div className="flex flex-wrap -mx-3 drop-zone">
//             <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable">
//               <div className="relative flex flex-col h-full min-w-0 break-words bg-white rounded-2xl">
//                 <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-2xl">
//                   <div className="flex flex-wrap -mx-3">
//                     <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
//                       <h6>Profile Information</h6>
//                     </div>
//                   </div>
//                   <div className="flex-auto p-4">
//                     <p className="leading-normal text-sm">Hi im bunda rhama</p>
//                     <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

//                     <ul className="flex flex-col pl-0 mb-0 rounded-lg">
//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Full Name:</strong>{" "}
//                         Bunda rhana
//                       </li>

//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">
//                           Phone Number:
//                         </strong>{" "}
//                         09659074552
//                       </li>

//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Email:</strong>{" "}
//                         Bunda_rhana@gmail.com
//                       </li>
//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Address:</strong>{" "}
//                         Talay, Pangasinan
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable">
//               <div className="relative flex flex-col h-full min-w-0 break-words bg-white rounded-2xl">
//                 <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-2xl">
//                   <div className="flex flex-wrap -mx-3">
//                     <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
//                       <h6>Profile Information</h6>
//                     </div>
//                   </div>
//                   <div className="flex-auto p-4">
//                     <p className="leading-normal text-sm">Hi im bunda rhama</p>
//                     <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

//                     <ul className="flex flex-col pl-0 mb-0 rounded-lg">
//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Full Name:</strong>{" "}
//                         Bunda rhana
//                       </li>

//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">
//                           Phone Number:
//                         </strong>{" "}
//                         09659074552
//                       </li>

//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Email:</strong>{" "}
//                         Bunda_rhana@gmail.com
//                       </li>
//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Address:</strong>{" "}
//                         Talay, Pangasinan
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable">
//               <div className="relative flex flex-col h-full min-w-0 break-words bg-white rounded-2xl">
//                 <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-2xl">
//                   <div className="flex flex-wrap -mx-3">
//                     <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
//                       <h6>Profile Information</h6>
//                     </div>
//                   </div>
//                   <div className="flex-auto p-4">
//                     <p className="leading-normal text-sm">Hi im bunda rhama</p>
//                     <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

//                     <ul className="flex flex-col pl-0 mb-0 rounded-lg">
//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Full Name:</strong>{" "}
//                         Bunda rhana
//                       </li>

//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">
//                           Phone Number:
//                         </strong>{" "}
//                         09659074552
//                       </li>

//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Email:</strong>{" "}
//                         Bunda_rhana@gmail.com
//                       </li>
//                       <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
//                         <strong className="text-slate-700">Address:</strong>{" "}
//                         Talay, Pangasinan
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
