import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Values {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export const formikHelper = {
	initialValues: {
		email: '',
		username: '',
		password: '',
		confirmPassword: ''
	},
	fields: [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
		},
		{
			name: 'username',
			type: 'text',
			placeholder: 'Username'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password'
		},
		{
			name: 'confirmPassword',
			type: 'password',
			placeholder: 'Confirm Password'
		}
	],
	validationSchema: Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		username: Yup.string()
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'Username must be no more than 20 characters')
			.required('Required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be no more than 20 characters')
			.required('Required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Does not match with password!')
			.required('Required')
	}),
	handleSubmit: (values: Values, actions: FormikHelpers<Values>) => {
		console.log(values);
		actions.setSubmitting(true);
		actions.resetForm();
	},
	validateOnChange: true
};
