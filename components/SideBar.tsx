import Domain from "./Domain";

export default function SideBar() {
  return (
    <div className="sidebar h-screen relative bg-neutral-700 py-3 flex flex-col gap-3 ">
      <Domain name="Musique" icon="/domain/musique.svg" />
      <Domain name="Mathematiques" icon="/domain/mathematiques.svg" />
      <Domain name="Chant" icon="/domain/chant.svg" />
      <Domain name="Poésie" icon="/domain/poesie.svg" />
      <div className="mx-3 border-4 rounded-3xl flex items-center justify-center">
        <span className=" text-white text-center text-4xl">+</span>
      </div>
    </div>
  );
}
