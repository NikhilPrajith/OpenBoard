'use client'
import BasicTools from "@/components/BasicTools/BasicTools";
import InfiniteCanvas from "@/components/InfiniteCanvas";
import Heading from "@/components/Information/Heading";
import SideBar from "@/components/SideBar/SideBar";
import Image from "next/image";
import ParticleEffect from "@/components/ParticleJs/ParticleEffect";
import { useState } from "react";
import SnowEffect from "@/components/ParticleJs/Snow";

export default function Home() {

  return (
    <div>
      <Heading></Heading>
      <InfiniteCanvas></InfiniteCanvas>

    </div>
  );
}
