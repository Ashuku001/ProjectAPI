'use client'
import { useState } from "react"
import { InputElement } from "../../../../types"
import HTMLReactParser from "html-react-parser"

type Props = {
	dynamic: any
}

function DynamicBody({ dynamic }: Props) {
	const [name, setName] = useState('')
	let variables: string[] = []

	for (let i = 0; i < dynamic?.inputs?.length; i++) {
		variables.push(`var${i}`)
	}

	const count = dynamic?.content?.text?.match(/\{\{\d\}\}/g).length
	console.log(variables, ",", count)

	let text = ''
	if (count !== 0) {
		for (let i = 0; i < count; ++i) {
			text = dynamic?.content?.text?.replace(/\{\{\d\}\}/, variables[i])
		}
	}

	// function addOffset(match, ...args) {
	// 	const hasNamedGroups = typeof args.at(-1) === "object";
	// 	const offset = hasNamedGroups ? args.at(-3) : args.at(-2);
	// 	return `${match} (${offset}) `;
	// }

	return (
		<div>
			{dynamic?.content &&
				dynamic?.content?.type === 'BODY' &&
				<p>{HTMLReactParser(dynamic?.content?.text.replace(/\{\{\d\}\}/g,
					`<span className="text-green-400">${name}</span>`
				))}</p>
			}
			{dynamic?.inputs?.length !== 0 &&
				<>
					{dynamic?.inputs?.map((input: InputElement, i: number) => (
						<input key={i} type={input.type} value={name} onChange={e => setName(e.target.value)} placeholder={input.placeholder} className="bg-slate-200 dark:bg-gray-700 rounded-sm px-1 py-1 outline-none w-full flex-1 pr-2 cursor-auto mb-2" />
					))}
				</>
			}
		</div>
	)
}

export default DynamicBody