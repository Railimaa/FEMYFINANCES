interface IImageSliderProps {
  img: string;
  title: string;
  subTitle: string;
}

export function ImageSlider({ img, title, subTitle }: IImageSliderProps) {
  return (
    <>
      <div
        className="w-full h-full max-h-[70vh] bg-contain bg-no-repeat "
        style={{
          backgroundImage: `url(${img})`,
        }}
      />

      <div className="flex flex-col justify-center gap-2 px-4 mt-5">
        <h1 className="text-3xl text-start">{title}</h1>
        <p className="text-muted-foreground/50 text-start text-sm  tracking-normal">
          {subTitle}
        </p>
      </div>
    </>
  );
}
