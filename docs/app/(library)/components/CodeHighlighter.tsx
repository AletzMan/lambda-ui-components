export default function CodeHighlighter({ code }: { code: string }) {
	const tokens = tokenizeCode(code);

	return (
		<pre className="bg-(--surface-a) rounded-sm border border-(--surface-b) p-3 text-sm overflow-x-auto text-left whitespace-pre-wrap">
			<code className="text-gray-200">
				{tokens.map((token, index) => (
					<span
						key={index}
						className={COLOR_MAP[token.type as keyof typeof COLOR_MAP] || COLOR_MAP.DEFAULT}
					>
						{token.value}
					</span>
				))}
			</code>
		</pre>
	);
}

const COLOR_MAP = {
	KEYWORD: "text-(--secondary-base-color)", // import, from, const, export, type
	STRING: "text-(--success-content-color)", // Cadenas de import, o el cuerpo de un string.
	DIRECTIVE: "text-(--success-content-color)", // Destacar "use client" con un color único si lo deseas
	TYPE: "text-(--primary-base-color)", // Nombres de Componentes o Tipos
	PUNCTUATION: "text-(--warning-base-color)", // Símbolos: ;, {}, =, :, <, >
	COMMENT: "text-(--neutral-subtle-color) italic", // Comentarios
	DEFAULT: "text-red-600", // Cualquier otro token
};
const TOKEN_TYPES = {
	KEYWORD: [
		"import",
		"from",
		"export",
		"default",
		"function",
		"const",
		"let",
		"var",
		"return",
		"class",
		"type",
	],
	// Un patrón que aísla Strings | Comentarios | Puntuación/Operadores (para que no se mezclen con palabras) | Palabras/Espacios
	TOKENIZER_REGEX: /(\s+|".*?"|'.*?'|`.*?`|\/\/.*|[;{}()=:,<>[\]&*-/+!])|([a-zA-Z0-9_\-]+)/g,
	// Patrón para verificar si un token es puntuación
	PUNCTUATION_CHECK: /^[;{}()=:,<>[\]&*-/+!]$/,
	TS_TYPE: ["Button", "Link", "FooterDocs", "Rocket", "string", "number", "boolean", "any", "void"],
};

function tokenizeCode(code: string) {
	const lines = code.split("\n");
	let tokens: { value: string; type: string }[] = [];

	lines.forEach((line, lineIndex) => {
		const trimmedLine = line.trim();

		// Manejo de la directiva 'use client'
		if (trimmedLine.startsWith('"use client"') || trimmedLine.startsWith("'use client'")) {
			tokens.push({ value: line, type: "DIRECTIVE" });
		} else {
			// Divide la línea y filtra los tokens vacíos
			const parts = line.split(TOKEN_TYPES.TOKENIZER_REGEX).filter(Boolean);

			parts.forEach((part) => {
				let type = "DEFAULT";

				// 1. Identificar Strings
				if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
					type = "STRING";
				}
				// 2. Comentarios
				else if (part.startsWith("//")) {
					type = "COMMENT";
				}
				// 3. Puntuación (usando el patrón de chequeo para símbolos)
				else if (part.match(TOKEN_TYPES.PUNCTUATION_CHECK)) {
					type = "PUNCTUATION";
				}
				// 4. Palabras Clave
				else if (TOKEN_TYPES.KEYWORD.includes(part)) {
					type = "KEYWORD";
				}
				// 5. Tipos/Componentes
				else if (TOKEN_TYPES.TS_TYPE.includes(part)) {
					type = "TYPE";
				}
				// Si es solo espacio, mantiene el tipo DEFAULT para preservar el layout

				tokens.push({ value: part, type });
			});
		}

		// Agrega el salto de línea
		if (lineIndex < lines.length - 1) {
			tokens.push({ value: "\n", type: "DEFAULT" });
		}
	});

	return tokens;
}
