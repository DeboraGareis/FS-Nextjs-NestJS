type Datos = {
  simbolo: string;
  onClick: () => void;
};
const BottonMenosOMas = ({ simbolo, onClick }: Datos) => {
  return (
    <div
      onClick={onClick}
      className="inline-block box-content size-6 inset-shadow-sm inset-shadow-indigo-500/50 rounded-md text-center cursor-pointer select-none"
    >
      {simbolo}
    </div>
  );
};
export default BottonMenosOMas;
