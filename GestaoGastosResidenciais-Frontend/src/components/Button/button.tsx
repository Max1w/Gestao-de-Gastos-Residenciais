type PropriedadesDoButton = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button";
  variant?: "primary" | "secondary" | "danger" | "warning";
  className?: string;
};

export default function Button({
    children,
    onClick,
    disabled = false,
    loading = false,
    type = "button",
    variant = "primary",
    className=""
}: PropriedadesDoButton){
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant} ${className}`}
        >
            {loading ? "Carregando...": children}
        </button>
    )
}