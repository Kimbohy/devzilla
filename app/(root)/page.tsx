import Publication from "@/components/Publication";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2 p-3">
        <Publication />
        <Publication />
        <Publication />
      </div>
    </>
  );
}
