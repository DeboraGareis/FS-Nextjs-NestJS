type Datos = {
  onClick: () => void;
};
const BottonCerrar = ({ onClick }: Datos) => {
  return (
    <div className="flex justify-end py-2">
      <div
        onClick={onClick}
        className="inline-flex items-center justify-center box-content size-10 text-red-500 inset-shadow-sm inset-shadow-indigo-500/50 rounded-md cursor-pointer select-none"
      >
        X
      </div>
    </div>
  );
};
export default BottonCerrar;
