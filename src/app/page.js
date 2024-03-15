import Heading from "@/components/Information/Heading";

import dynamic from 'next/dynamic';

// Dynamically import InfiniteCanvas with SSR disabled
//This is because we use window in ParticleEffect and InfiniteCanvas - Edit later!
const InfiniteCanvasNoSSR = dynamic(() => import('@/components/InfiniteCanvas'), {
  ssr: false,
});

export default function Home() {

  return (
    <div>
      <Heading></Heading>

      <InfiniteCanvasNoSSR />

    </div>
  );
}
