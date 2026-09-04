export type HeaderProps = {
  title: string;
};
export const Header = ({ title }: HeaderProps) => {
  return (
    <div className=" py-4 px-2 font-bold bg-chart-1/50 border-b shadow-sm border-border">
      <h1 className="text-foreground font-semibold text-lg">{title}</h1>
    </div>
  );
};
