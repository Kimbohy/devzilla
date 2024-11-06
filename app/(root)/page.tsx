import Publication from "@/components/Publication";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2 p-4 items-center ">
        <Publication />
        <Publication />
        <Publication />
      </div>
    </>
  );
}
