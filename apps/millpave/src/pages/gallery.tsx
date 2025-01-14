import React, { useState } from 'react';
import Head from 'next/head';
import { Button } from '../components/button';
import { motion } from 'framer-motion';
import { RevealSection } from '../components/reveal-section';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { ProductCard } from '../components/product-card';
import { MdClose, MdOpenInFull } from 'react-icons/md';

type GalleryFilterProps = React.PropsWithChildren<
	{
		value: string;
	} & React.HTMLProps<HTMLInputElement>
>;

function GalleryFilter({ children, value, ...props }: GalleryFilterProps) {
	return (
		<li className="relative flex aspect-square w-[60vw] shrink-0 snap-center items-end p-6 md:w-[25vmax] md:p-8 lg:w-[30vmin]">
			<input
				{...props}
				type="radio"
				name="category"
				className="peer hidden"
				id={value}
			/>
			<label
				htmlFor={value}
				className="absolute inset-0 border border-gray-200 bg-gray-200 inner-border-4 inner-border-white peer-checked:border-2 peer-checked:border-black"
			/>
			<p className="pointer-events-none z-[1] font-display text-lg">
				{children}
			</p>
		</li>
	);
}

const categories = [
	{ id: 'walkway', displayName: { singular: 'Walkway', plural: 'Walkways' } },
	{ id: 'patio', displayName: { singular: 'Patio', plural: 'Patios' } },
	{ id: 'garden', displayName: { singular: 'Garden', plural: 'Gardens' } },
	{ id: 'plaza', displayName: { singular: 'Plaza', plural: 'Plazas' } },
	{
		id: 'driveway',
		displayName: { singular: 'Driveway', plural: 'Driveways' }
	},
	{
		id: 'pool_deck',
		displayName: { singular: 'Pool Deck', plural: 'Pool Decks' }
	}
] as const;

const slowTransition = {
	type: 'spring',
	stiffness: 100,
	damping: 20
};

function GalleryImage() {
	return (
		<li className="flex h-[30vmax] items-end justify-end bg-gray-200 p-2 md:col-span-3 lg:h-[50vmin] xl:col-span-2 xl:h-[25vmax]">
			<Dialog.Trigger asChild>
				<Button variant="secondary" className="px-2">
					<MdOpenInFull />
				</Button>
			</Dialog.Trigger>
		</li>
	);
}

function Page() {
	const [categoryId, setCategoryId] =
		useState<typeof categories[number]['id']>('walkway');

	const currentCategory = categories.find(({ id }) => id === categoryId);

	return (
		<>
			<Head>
				<title>Inspiration Gallery — Millennium Paving Stones</title>
			</Head>

			<main className="space-y-32 px-8 md:px-24 lg:space-y-48 lg:px-32">
				<section className="space-y-24">
					<motion.h1
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1, ...slowTransition }}
						className="mx-auto max-w-[20ch] text-center font-display text-3xl"
					>
						Which types of projects would you like to see?
					</motion.h1>

					<motion.ul
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, ...slowTransition }}
						className="no-scrollbar -mx-8 flex snap-x snap-mandatory gap-4 overflow-scroll px-8 md:-mx-32 md:px-32 lg:-mx-32 lg:px-32"
					>
						{categories.map(({ id, displayName }) => (
							<GalleryFilter
								key={id}
								value={id}
								checked={id === categoryId}
								onChange={() => setCategoryId(id)}
							>
								{displayName.plural}
							</GalleryFilter>
						))}
					</motion.ul>
				</section>

				<RevealSection className="space-y-4 md:space-y-8">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-8">
						<div className="mb-8 flex items-center md:col-span-3 md:mb-0 lg:col-span-3 xl:col-span-2">
							<p className="text-center font-display text-2xl md:text-left">
								Get inspiration for your new&nbsp;
								{currentCategory?.displayName.singular.toLowerCase()}.
							</p>
						</div>

						<Dialog.Root>
							<Dialog.Portal>
								<Dialog.Overlay>
									<div className="fixed inset-0 bg-gray-900/50" />
								</Dialog.Overlay>

								<Dialog.Content>
									<div className="pointer-events-none fixed inset-0 flex items-end justify-center md:items-center [&>*]:pointer-events-auto">
										<div className="relative flex aspect-[2/1] h-[90vh] w-full flex-col overflow-y-auto rounded-t-lg bg-white md:h-auto md:w-[90vw] md:flex-row md:rounded-none lg:w-[80vw]">
											<Dialog.Close asChild>
												<Button
													variant="tertiary"
													className="absolute right-8 top-8 text-white md:top-12 md:text-gray-900"
												>
													<MdClose />
												</Button>
											</Dialog.Close>

											<div className="flex aspect-square shrink-0 items-center bg-gray-400 md:sticky md:top-0 md:flex-1">
												<div className="aspect-video w-full bg-gray-200" />
											</div>

											<div className="h-fit space-y-16 py-16 px-8 md:flex-1 md:px-12 lg:px-16">
												<section>
													<p className="font-bold">
														By&nbsp;
														<Link
															target="_blank"
															href="https://www.instagram.com/najobriks"
															className="underline"
														>
															Najo Briks Construction
														</Link>
													</p>
													<h1 className="text-2xl">Residential Driveway</h1>
													<br />
													<p>
														Lorem ipsum, dolor sit amet consectetur adipisicing
														elit. Dolor, accusantium? Quasi assumenda voluptate
														error nesciunt placeat! Consequuntur incidunt,
														temporibus nesciunt pariatur harum quisquam
														voluptatum dicta facilis ut similique minus, soluta
														at consectetur ipsa corporis eos doloribus atque
														tempora molestias voluptatibus. Magni esse nihil
														debitis mollitia. Culpa nulla quisquam veritatis!
														Velit?
													</p>
												</section>
												<section>
													<h2 className="text-lg">Products in this photo</h2>

													<ul className="mt-8 space-y-4">
														<ProductCard
															name="Colonial Classic"
															startingSku={{ price: 203, unit: 'sqft' }}
															link="/product/colonial_classic"
														/>
														<ProductCard
															name="Banjo"
															startingSku={{ price: 219, unit: 'sqft' }}
															link="/product/banjo"
														/>
													</ul>
												</section>
											</div>
										</div>
									</div>
								</Dialog.Content>
							</Dialog.Portal>

							<ul className="contents">
								<GalleryImage />
								<GalleryImage />
								<GalleryImage />
								<GalleryImage />
								<GalleryImage />
								<GalleryImage />
								<GalleryImage />
								<GalleryImage />
							</ul>
						</Dialog.Root>
					</div>

					<Button variant="secondary" className="mx-auto">
						See More
					</Button>
				</RevealSection>

				{/* Process */}
				<RevealSection className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-32">
					<div className="flex-1 lg:order-2">
						<p className="font-display text-lg">Our Process</p>
						<h2 className="max-w-[20ch] font-display text-3xl">
							Starting from zero.
						</h2>

						<br />

						<p className="font-display text-lg">
							Integer a velit in sapien aliquam consectetur et vitae ligula.
							Integer ornare egestas enim a malesuada. Suspendisse arcu lectus,
							blandit nec gravida at, maximus ut lorem. Nulla malesuada vehicula
							neque at laoreet. Nullam efficitur mauris sit amet accumsan
							pulvinar.
						</p>

						<br />

						<Button variant="primary">Find an Installer</Button>
					</div>

					<div className="aspect-video w-full bg-gray-200 lg:w-[70vmin]"></div>
				</RevealSection>
			</main>
		</>
	);
}

export default Page;
