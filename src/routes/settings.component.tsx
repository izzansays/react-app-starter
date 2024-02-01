import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { css } from "../../styled-system/css";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import Textarea from "../components/Form/Textarea";

export const component = function Settings() {
	const formSchema = z.object({
		subject: z.string().min(1, "This field is required"),
		description: z.string().min(1, "This field is required"),
		type: z.string(),
	});

	const { control, handleSubmit } = useForm({
		mode: "onChange",
		resolver: zodResolver(formSchema),
		// defaultValues: {}
	});

	function onSubmit(data, e) {
		e.preventDefault();

		console.log(data);
	}

	return (
		<div>
			<Card
				title="Report an issue"
				description="What area are you having problems with?"
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={css({ spaceY: "4" })}>
						<Select
							label="Type"
							name="type"
							control={control}
							options={[
								{ label: "test", value: "test" },
								{ label: "test2", value: "test2" },
							]}
						/>
						<Input label="Subject" name="subject" control={control} />
						<Textarea
							label="Description"
							name="description"
							control={control}
						/>
					</div>

					{/* 
				<CardContent className="grid gap-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="area">Area</Label>
							<Select defaultValue="billing">
								<SelectTrigger id="area">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="team">Team</SelectItem>
									<SelectItem value="billing">Billing</SelectItem>
									<SelectItem value="account">Account</SelectItem>
									<SelectItem value="deployments">Deployments</SelectItem>
									<SelectItem value="support">Support</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="security-level">Security Level</Label>
							<Select defaultValue="2">
								<SelectTrigger
									id="security-level"
									className="line-clamp-1 w-[160px] truncate"
								>
									<SelectValue placeholder="Select level" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">Severity 1 (Highest)</SelectItem>
									<SelectItem value="2">Severity 2</SelectItem>
									<SelectItem value="3">Severity 3</SelectItem>
									<SelectItem value="4">Severity 4 (Lowest)</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="subject">Subject</Label>
						<Input id="subject" placeholder="I need help with..." />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Please include all information relevant to your issue."
						/>
					</div>
				</CardContent>
				<CardFooter className="justify-between space-x-2">
					<Button variant="ghost">Cancel</Button>
					<Button>Submit</Button>
				</CardFooter>*/}

					<Card.Footer>
						<Button variant="ghost">Cancel</Button>
						<Button type="submit">Submit</Button>
					</Card.Footer>
				</form>
			</Card>
		</div>
	);
};
