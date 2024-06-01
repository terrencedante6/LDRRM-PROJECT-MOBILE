"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DeleteEmployeeButton from "./delete-employee/delete-employee-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdAlternateEmail, MdOutlineVerified } from "react-icons/md";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { IoCreateOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaEye } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
// import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { format } from "date-fns";

// import Banner from "@/images/banner.jpg";
import Image from "next/image";
import { LuRefreshCcw } from "react-icons/lu";
import UpdateEmployeeButton from "./update-employee/update-employee-dialog";
import UpdateEmployeeStatusButton from "./update-employee-status/update-employee-status-dialog";
import DeleteEmployeeDialog from "./delete-employee/delete-employee-dialog";

export default function Page({ employee, roles, currentSession }: any) {
  return (
    <div className="flex flex-col place-items-center w-full h-full gap-7 p-8">
      <div className="space-y-2 w-fit h-full rounded-2xl">
        <div className="w-full h-full flex max-w-[1840px] max-h-[950px] justify-center place-items-center gap-7 py-4">
          <div className="w-full h-full flex flex-row justify-center gap-2 rounded-xl">
            <div className="p-6 bg-darkComponentBg flex flex-col gap-2 2xl:gap-4 rounded-xl shadow-lg border border-darkBorder bg-white">
              <div className="w-full h-[150px] 2xl:h-[200px] bg-blue-600 rounded-xl relative">
                {/* <Image
                src={Banner}
                alt="something"
                className="w-full h-full object-cover rounded-xl opacity-75"
              /> */}

                <Avatar className="w-32 h-32 cursor-pointer z-0 absolute -bottom-[30%] left-7 border-8 border-white">
                  <AvatarImage
                    src={employee[0].image_url}
                    alt={employee[0].id}
                  />
                  <AvatarFallback className="bg-slate-500 font-bold text-2xl text-white">
                    {`${employee[0].first_name[0]} ${employee[0].last_name[0]}`}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="w-full flex justify-start gap-4 pt-16">
                <h2 className="flex text-2xl font-bold place-items-center gap-3">
                  {employee[0].first_name + " " + employee[0].last_name}
                  <UpdateEmployeeStatusButton employeeData={employee[0]} />
                </h2>
                <div className="min-h-[40px]">
                  {currentSession.roles.role === "Administrator" ||
                  currentSession.roles.role === "Manager" ? (
                    <UpdateEmployeeButton
                      employeeData={employee[0]}
                      // branchesData={branches}
                      rolesData={roles}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-full flex gap-7">
                <div className="w-[45vw] h-full flex flex-col justify-start p-6 gap-2 2xl:gap-4 bg-darkComponentBg rounded-xl shadow-lg border border-darkBorder bg-white">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    General Information
                  </h1>
                  <div className="w-full flex gap-7">
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        <MdAlternateEmail />
                        Email
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          {employee[0].email}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        {employee[0].gender === "Male" ? (
                          <BsGenderMale />
                        ) : (
                          <BsGenderFemale />
                        )}
                        Sex
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          {employee[0].gender}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        <CiCalendarDate />
                        Date of Birth
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          {format(employee[0].dob, "PPP")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex gap-7">
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        <IoLocationOutline />
                        Address
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          {employee[0].address}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        <MdOutlinePhone />
                        Contact Number
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          +63 {employee[0].contact_number}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        <IoPersonAddOutline />
                        Added at
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          {format(employee[0].created_at, "PPP")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex gap-7">
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs 2xl:text-md font-semibold text-gray-800 flex justify-center place-items-center w-fit gap-1">
                        <MdOutlineManageAccounts />
                        Position
                      </span>
                      <div className="w-full min-w-0 bg-darkBorder rounded-lg">
                        <p className="text-sm 2xl:text-md text-slate-600 gap-2 p-2 max-w-[260px] truncate">
                          {employee[0].roles.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
