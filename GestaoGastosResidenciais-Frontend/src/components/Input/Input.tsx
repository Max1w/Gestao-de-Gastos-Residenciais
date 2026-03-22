type PropriedadesDoInput = {
  label?: string;
  error?: string;
  iconeEsquerda?: React.ReactNode;
  iconeDireita?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
    label,
    error,
    iconeEsquerda,
    iconeDireita,
    className = "",
    wrapperClassName = "",
    ...props
}: PropriedadesDoInput){
    return (
        <div className={`input-group ${wrapperClassName}`}>
            {label && <label className="label">{label}</label>}

            <div className={`inputWrapper ${error ? "error" : ""}`}>
                {iconeEsquerda && <span className="icon">{iconeEsquerda}</span>}

                <input
                    className={`input ${className}`}
                    {...props}
                />

                {iconeDireita && <span className="icon">{iconeDireita}</span>}
            </div>

            {error && <span className="error-text">{error}</span>}
        </div>
    )
}