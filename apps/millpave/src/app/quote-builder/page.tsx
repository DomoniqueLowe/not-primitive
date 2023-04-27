import { MdCheck, MdClose } from 'react-icons/md';
import { Button } from '../../components/button';
import React from 'react';
import classNames from 'classnames';

type StageSelectorProps = React.PropsWithChildren<{
	index: number;
	completed?: boolean;
	selected?: boolean;
}>;

function StageSelector({
	index,
	selected,
	completed,
	children
}: StageSelectorProps) {
	return (
		<li className="flex gap-2">
			<span
				className={classNames(
					'rounded-md font-semibold',
					completed ? 'p-0.5' : 'px-1.5',
					selected || completed
						? 'bg-gray-900 text-white'
						: 'border border-gray-900'
				)}
			>
				{completed ? <MdCheck className="text-[1.25em]" /> : index + 1}
			</span>
			<span>{children}</span>
		</li>
	);
}

type OptionProps = React.PropsWithChildren<{
	id: string;
	fieldName: string;
	title: string;
	description: string;
}>;

function Option({ id, fieldName, title, description }: OptionProps) {
	return (
		<li>
			<label htmlFor={id} className="relative w-64 p-6">
				<div className="absolute inset-0 rounded-lg border"></div>
				<p className="font-bold">{title}</p>
				<p>{description}</p>
				<input name={fieldName} id={id} type="radio" className="hidden" />
			</label>
		</li>
	);
}

export default function Page() {
	return (
		<div className="space-y-24">
			<header>
				<div className="flex items-center justify-between px-32 py-6">
					<MdClose className="text-[1.5rem]" />
					<h1 className="font-semibold">Get a quote</h1>
					<Button variant="primary">Next</Button>
				</div>
				<ul className="flex items-center justify-center gap-4 bg-gray-100 px-32 py-6">
					<StageSelector index={0} completed>
						Shape
					</StageSelector>
					<li className="h-[1px] w-8 bg-current" />
					<StageSelector index={1} selected>
						Dimensions
					</StageSelector>
					<li className="h-[1px] w-8 bg-current" />
					<StageSelector index={2}>Infill</StageSelector>
					<li className="h-[1px] w-8 bg-current" />
					<StageSelector index={3}>Border</StageSelector>
					<li className="h-[1px] w-8 bg-current" />
					<StageSelector index={4}>Review Items</StageSelector>
				</ul>
			</header>

			<section className="space-y-16 px-32">
				<h2 className="text-center text-2xl">Pick a shape to get started</h2>
				<ul className="flex justify-center gap-4">
					<Option
						fieldName="nub"
						id="rectangle"
						title="Rectangle"
						description="Requires length and width."
					/>
					<Option
						fieldName="nub"
						id="circle"
						title="Circle"
						description="Requires diameter or circumference"
					/>
					<Option
						fieldName="nub"
						id="arbitrary"
						title="Arbitrary"
						description="Requires area and/or running length"
					/>
				</ul>
			</section>
		</div>
	);
}
