/** The compact mark, for favicons and the home-screen icon. Rendered square and saved to public/. */
export default function IconPage() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-ground">
      <span className="inline-flex items-start text-ink" style={{ transform: "translate(1%, 9%)" }}>
        <span className="font-display font-medium italic leading-none" style={{ fontSize: "72vh" }}>
          T
        </span>
        <span
          className="font-sans font-semibold leading-none text-ice"
          style={{ fontSize: "34vh", marginLeft: "-3vh", marginTop: "6vh" }}
        >
          &minus;
        </span>
      </span>
    </div>
  );
}
