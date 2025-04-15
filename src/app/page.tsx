"use client";

import { useState } from "react";
import Spotlight from "./components/Spotlight";
import { IoArrowUndo } from "react-icons/io5";

export default function Page() {
  const [tour, setTour] = useState<{ isTour: boolean; step?: number }>({
    isTour: false,
    step: 0,
  });

  const triggerPermissionTest = async () => {
    await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="flex gap-5 items-center">
        <Spotlight
          isEnabled={tour.isTour && tour.step == 0}
          notes={{
            title: "Lorem ipsum dolor amet",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium rem beatae nostrum repudiandae perspiciatis. Quo animi liberoprovident tempora magni",
          }}
          notesContainerClassName="top-[200px] left-[-300px] w-[500px]"
          onNext={() => {
            setTour({ ...tour, step: tour.step! + 1 });
          }}
        >
          <div className="mt-5 p-5 w-96 border border-black bg-white">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              tempore ipsa repellat incidunt, delectus commodi quam omnis cumque
              provident magni!
            </p>
          </div>
        </Spotlight>

        <Spotlight
          isEnabled={tour.isTour && tour.step == 1}
          notes={{
            title: "Lorem ipsum dolor amet 2",
            content:
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur perspiciatis et consequatur ad repellendus modi?",
          }}
          notesContainerClassName="top-[250px] right-[-500px] w-[500px]"
          onPrev={() => setTour({ ...tour, step: tour.step! - 1 })}
          onNext={() => {
            triggerPermissionTest();
            setTour({ ...tour, step: 2 });
          }}
        >
          <div className="mt-5 p-5 w-52 border border-black bg-white">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              assumenda placeat consequatur reiciendis non natus.
            </p>
          </div>
        </Spotlight>
      </div>

      <Spotlight
        isEnabled={tour.isTour && tour.step == 2}
        notesContainerClassName="left-[35%] top-[10%] w-[432px]"
        notes={{
          title: "Izinkan Mikrofon & Kamera",
          content:
            "Untuk memulai sesi wawancara, Anda perlu menghidupkan Mikrofon & Kamera melalui tombol di atas.",
        }}
        onNext={() => setTour({ isTour: false, step: 0 })}
        icon={<IoArrowUndo size={100} />}
        iconPosition="top"
        iconContainerClassName="left-[-20%]"
        isLast
      />

      <button
        onClick={() => {
          setTour({ isTour: true, step: 0 });
        }}
        className="border px-5 py-2 border-black rounded-full mt-5"
      >
        Click Here
      </button>
    </div>
  );
}

// const Tour = ({
//   isRun,
//   onFinish,
// }: {
//   isRun: boolean;
//   onFinish: () => void;
// }) => {
//   if (isRun) {
//     return (
//       <div className=" bg-black/90 w-screen h-screen flex justify-center absolute">
//         <div className="text-white w-[432px] absolute top-[300px] left-[600px]  ">
//           <div className="relative">
//             <IoArrowUndo size={100} className="absolute top-[-150px]" />

//             <h1 className="text-3xl font-bold">Izinkan Mikrofon & Kamera</h1>
//             <p className="mt-5">
//               Untuk memulai sesi wawancara, Anda perlu menghidupkan Mikrofon &
//               Kamera melalui tombol di atas.
//             </p>
//             <button
//               onClick={onFinish}
//               className="px-5 py-2 bg-blue-500 rounded-full mt-5 cursor-pointer"
//             >
//               OK, Mengerti!
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// };
