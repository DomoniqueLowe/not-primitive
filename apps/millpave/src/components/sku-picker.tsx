import { useEffect } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { Product } from '../types/product';
import { PickupLocation } from '@prisma/client';

type FormValues = {
	skuId: string;
	area: number;

	pickupLocation: PickupLocation;
};

type SkuPickerProps = {
	control: Control<FormValues>;
	product: Product;
	header: React.FC<React.PropsWithChildren<{ title: string }>>;
	value: string;
	onChange: (newSkuFragments: string[]) => void;
};

const SkuPicker = ({
	control,
	product,
	header,
	value,
	onChange
}: SkuPickerProps) => {
	const SectionHeader = header;

	const { setValue } = useFormContext<FormValues>();
	useEffect(() => {
		setValue('skuId', value);
	}, [value, setValue]);

	return (
		<Controller
			name="skuId"
			control={control}
			render={({ field }) => {
				const [, ...skuFragments] = value.split(':');

				const handleChange = (newFragment: string, changeIndex: number) => {
					const newSkuFragments = skuFragments.map((oldFragment, index) => {
						return index === changeIndex ? newFragment : oldFragment;
					});

					const newSku = newSkuFragments.join(':');

					field.onChange(newSku);
					onChange(newSkuFragments);
				};

				return (
					<>
						{product.sku_id_fragments.map(
							({ type, fragments, display_name, index }) => (
								<section key={index} className="space-y-4">
									<SectionHeader title={display_name}>
										{type === 'color' && (
											<p className="text-sm text-bubblegum-700">Color Guide</p>
										)}
									</SectionHeader>

									{type === 'variant' && (
										<ul className="grid grid-cols-3 gap-2">
											{fragments.map(({ id, display_name }) => (
												<li key={id} className="contents">
													<label htmlFor={id} className="contents">
														<input
															className="peer hidden"
															type="radio"
															name={type}
															value={id}
															id={id}
															checked={skuFragments[index] === id}
															onChange={(e) =>
																handleChange(e.target.value, index)
															}
														/>
														<div className="flex items-center justify-center rounded-md px-3 py-2 shadow-[inset_0_0_0_1px_#be185d] peer-checked:bg-bubblegum-50 peer-checked:text-bubblegum-700 peer-checked:shadow-[inset_0_0_0_2px_#be185d]">
															{display_name}
														</div>
													</label>
												</li>
											))}
										</ul>
									)}
									{type === 'color' && (
										<ul className="grid grid-cols-8 gap-2 [@media(max-width:320px)]:grid-cols-7">
											{fragments.map(({ id, css }) => (
												<li key={id} className="contents">
													<label htmlFor={id} className="aspect-w-1 aspect-h-1">
														<input
															className="peer hidden"
															type="radio"
															name={type}
															value={id}
															id={id}
															checked={skuFragments[index] === id}
															onChange={(e) =>
																handleChange(e.target.value, index)
															}
														/>
														<div
															className="rounded-full shadow-[inset_0_0_0_1px_#d4d4d8,inset_0_0_0_3px_white] peer-checked:shadow-[inset_0_0_0_2px_#be185d,inset_0_0_0_4px_white]"
															style={{ background: css }}
														/>
													</label>
												</li>
											))}
										</ul>
									)}
								</section>
							)
						)}
					</>
				);
			}}
		/>
	);
};

export default SkuPicker;
