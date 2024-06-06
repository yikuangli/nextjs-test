'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({ invalid_type_error: 'Please select a customer.', }),
	amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
	status: z.enum(['pending', 'paid'], {
		invalid_type_error: 'Please select an invoice status.',
	}),
	date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
export type State = {
	errors?: {
		customerId?: string[];
		amount?: string[];
		status?: string[];
	};
	message?: string | null;
};

export async function createEvent(formData: FormData) {
	const validatedFields = CreateEventSchema.safeParse({
		title: formData.get('title'),
		description: formData.get('description'),
		eventTime: formData.get('eventTime'),
		area: formData.get('area'),
		routeLength: formData.get('routeLength'),
		routeUrl: formData.get('routeUrl'),
		location: formData.get('location'),
		ridePace: formData.get('ridePace'),
		eventLeaderName: formData.get('eventLeaderName'),
		passphrase: formData.get('passphrase'),
	});

	if (!validatedFields.success) {
		console.log(validatedFields)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Event.',
		};
	}

	const {
		title,
		description,
		eventTime,
		area,
		routeUrl,
		routeLength,
		location,
		ridePace,
		eventLeaderName,
		passphrase,
	} = validatedFields.data;
	console.log(routeLength)
	try {
		await sql`
		INSERT INTO event (
		  title, description, time, area, route_url, location, ride_pace, event_leader_name, passphrase, route_length
		) VALUES (
		  ${title}, ${description}, ${eventTime}, ${area}, ${routeUrl}, ${location}, ${ridePace}, ${eventLeaderName}, ${passphrase}, ${routeLength}
		)
	  `;
	} catch (exception) {
		console.log(exception)
		return {
			errors: { general: 'Database error occurred' },
			message: 'Failed to Create Event.',
		};
	}

	revalidatePath('/');
	redirect('/');
}

export async function createInvoice(prevState: State, formData: FormData) {

	const validatedFields = CreateInvoice.safeParse({
		customerId: formData.get('customerId'),
		amount: formData.get('amount'),
		status: formData.get('status'),
	});
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		};
	}
	const { customerId, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;
	const date = new Date().toISOString().split('T')[0];
	try {
		await sql`
			INSERT INTO invoices (customer_id, amount, status, date)
			VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
			`;
	} catch (exception) {

	}
	revalidatePath('/dashboard/invoices');
	redirect('/dashboard/invoices');

}
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(
	id: string,
	prevState: State,
	formData: FormData,
) {
	const validatedFields = UpdateInvoice.safeParse({
		customerId: formData.get('customerId'),
		amount: formData.get('amount'),
		status: formData.get('status'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Update Invoice.',
		};
	}

	const { customerId, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;

	try {
		await sql`
		UPDATE invoices
		SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
		WHERE id = ${id}
	  `;
	} catch (error) {
		return { message: 'Database Error: Failed to Update Invoice.' };
	}

	revalidatePath('/dashboard/invoices');
	redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
	throw new Error('Failed to Delete Invoice');
	try {
		await sql`DELETE FROM invoices WHERE id = ${id}`;
	} catch (exception) {

	}
	revalidatePath('/dashboard/invoices');

}
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { CreateEventSchema } from './validation';

// ...

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
}