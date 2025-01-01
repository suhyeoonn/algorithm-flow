export const Variable = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div className="border border-gray-500 py-2 rounded-lg">
      <h3 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-500">
        {label}
      </h3>
      <p className="text-lg">{value}</p>
    </div>
  );
};
