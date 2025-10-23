"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallByid";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import * as React from "react";

const Meeting = ({ params}: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader />
  
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setisSetupComplete} />
          ): (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
