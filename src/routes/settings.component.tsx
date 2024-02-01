import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const component = function About() {
	const validationSchema = z
		.object({
			firstName: z.string().min(1, { message: "Firstname is required" }),
			lastName: z.string().min(1, { message: "Lastname is required" }),
			email: z.string().min(1, { message: "Email is required" }).email({
				message: "Must be a valid email",
			}),
			password: z
				.string()
				.min(6, { message: "Password must be atleast 6 characters" }),
			confirmPassword: z
				.string()
				.min(1, { message: "Confirm Password is required" }),
			terms: z.literal(true, {
				errorMap: () => ({ message: "You must accept Terms and Conditions" }),
			}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			path: ["confirmPassword"],
			message: "Password don't match",
		});

	type ValidationSchema = z.infer<typeof validationSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		mode: "onChange",
		resolver: zodResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input
						id="firstName"
						type="text"
						placeholder="First Name"
						{...register("firstName")}
					/>
					{errors.firstName && (
						<p className="text-xs italic text-red-500 mt-2">
							{errors.firstName?.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="lastName">Last Name</label>
					<input
						id="lastName"
						type="text"
						placeholder="Last Name"
						{...register("lastName")}
					/>
					{errors.lastName && (
						<p className="text-xs italic text-red-500 mt-2">
							{errors.lastName?.message}
						</p>
					)}
				</div>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					placeholder="Email"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-xs italic text-red-500 mt-2">
						{errors.email?.message}
					</p>
				)}
			</div>
			<div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" {...register("password")} />
					{errors.password && (
						<p className="text-xs italic text-red-500 mt-2">
							{errors.password?.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="c_password">Confirm Password</label>
					<input
						id="c_password"
						type="password"
						{...register("confirmPassword")}
					/>
					{errors.confirmPassword && (
						<p className="text-xs italic text-red-500 mt-2">
							{errors.confirmPassword?.message}
						</p>
					)}
				</div>
			</div>
			<div>
				<input type="checkbox" id="terms" {...register("terms")} />
				<label htmlFor="terms">Accept Terms & Conditions</label>
				{errors.terms && (
					<p className="text-xs italic text-red-500 mt-2">
						{errors.terms?.message}
					</p>
				)}
			</div>
			<div>
				<button type="reset">Reset</button>
				<button type="submit">Register Account</button>
			</div>
			<hr />
			<div>Forgot Password?</div>
			<div className="text-center">Already have an account? Login!</div>
		</form>
	);
};
