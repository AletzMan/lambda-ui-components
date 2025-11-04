"use client";
import { Button } from "lambda-ui-components";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function ButtonCopy({ codeToShow }: { codeToShow: string }) {
	const [copied, setCopied] = useState(false);
	return (
		<Button
			variant="soft"
			size="tiny"
			color="neutral"
			icon={copied ? <CheckIcon /> : <CopyIcon />}
			onClick={() => {
				navigator.clipboard.writeText(codeToShow);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}}
		/>
	);
}
