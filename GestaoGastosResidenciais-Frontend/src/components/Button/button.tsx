// ─── Function de botão genérica ──────────────────────────────────────────────────────────
// Aqui centralizo os botões utilizado no sistema inteiro.
// Facilita na manutenção do projeto

type PropriedadesDoButton = {
  children: React.ReactNode;
  title?: string
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
    className="",
    title=""
}: PropriedadesDoButton){
    return (
        <button
            title={title}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant} ${className}`}
        >
            {loading ? "Carregando...": children}
        </button>
    )
}