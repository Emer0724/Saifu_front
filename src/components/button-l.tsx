
export default function ButtonL({children}: {children: React.ReactNode}) {
  return (
    <button type="button" className="btn btn-primary">
      {children}
    </button>
  );
}

