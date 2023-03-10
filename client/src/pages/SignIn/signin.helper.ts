import axios from 'axios';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { signInAPI } from '../../utils/APIRoutes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextValue } from '../../types';
import { NavigateFunction } from 'react-router-dom';

interface Values {
	email: string;
	password: string;
}

export const formikHelper = {
	initialValues: {
		email: '',
		password: ''
	},
	fields: [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password'
		}
	],
	validationSchema: Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.max(20, 'Password must be no more than 20 characters')
			.required('Required')
	}),
	handleSubmit: async (
		values: Values,
		actions: FormikHelpers<Values>,
		navigate: NavigateFunction,
		userData: UserContextValue
	) => {
		actions.setSubmitting(true);
		const user = {
			email: values.email,
			password: values.password
		};

		try {
			const { data } = await axios({
				method: 'post',
				url: signInAPI,
				data: user,
				withCredentials: true
			});
			userData?.setUser(data.user);
			actions.resetForm();

			if (!data.user.hasAvatar) {
				return navigate('/pick-your-avatar');
			}

			toast.success('Sign in successfully 🦄');
			navigate('/');
		} catch (err) {
			actions.setSubmitting(false);
			if (axios.isAxiosError(err)) {
				const { error } = err.response?.data;

				toast.error(error, {
					autoClose: 3000
				});
			}
		}
	},
	validateOnChange: true
};
