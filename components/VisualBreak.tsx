import Image from "next/image";

export function VisualBreak() {
  return (
    <section className="relative h-[46vh] min-h-[16rem] overflow-hidden sm:h-[56vh] md:h-[64vh]">
      <Image
        src="/images/visual-peaches.jpg"
        alt="Ripe peaches nestled among green leaves and white blossoms"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}
