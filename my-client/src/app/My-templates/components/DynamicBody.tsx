import { InputElement } from "../../../../types"

type Props = {
	dynamic: any
}

function DynamicBody({ dynamic }: Props) {

	return (
		<div>
			{dynamic?.content &&
				<>
					{dynamic?.content?.type === 'BODY' &&
						<p>{dynamic?.content?.text}</p>
					}

				</>
			}
			{dynamic?.inputs?.length !== 0 &&
				<>
					{dynamic?.inputs?.map((input: InputElement, i: number) => (
						<input key={i} type={input.type} placeholder={input.placeholder} className="bg-slate-200 dark:bg-gray-700 rounded-sm px-1 py-1 outline-none w-full flex-1 pr-2 cursor-auto mb-2" />
					))}
				</>
			}
		</div>
	)
}

export default DynamicBody