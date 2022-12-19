import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import styled from 'styled-components';
import { formikHelper } from './signup.helper';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const userData = useContext(UserContext);

	useEffect(() => {
		if (userData?.isAvatarAbsent) return navigate('/pick-your-avatar');
		if (userData?.user) return navigate('/');
	}, [userData, navigate]);

	const {
		initialValues,
		fields,
		validationSchema,
		validateOnChange,
		handleSubmit
	} = formikHelper;

	return (
		<>
			<FormContainer>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					validateOnChange={validateOnChange}
					onSubmit={(values, actions) =>
						handleSubmit(values, actions, navigate, userData)
					}
				>
					{(props: FormikProps<any>) => (
						<Form>
							<div className="brand">
								<img src={logo} alt="" />
								<h1 className="text">Talkify</h1>
							</div>
							{fields.map(({ name, type, placeholder }, i) => (
								<div key={i}>
									<Field
										className="field"
										name={name}
										type={type}
										placeholder={placeholder}
									/>
									<ErrorMessage name={name} component="div" className="error" />
								</div>
							))}
							<button
								type="submit"
								className={
									!props.isValid || props.isSubmitting ? 'disabled' : ''
								}
							>
								Sign Up
							</button>
							<span>
								Already have an account ?<a href="/signin">SignIn</a>
							</span>
						</Form>
					)}
				</Formik>
			</FormContainer>
		</>
	);
};

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: ${({ theme }) => theme.background.semiDark};

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		img {
			height: 5rem;
		}

		.text {
			color: ${({ theme }) => theme.text.primary};
			text-transform: uppercase;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: ${({ theme }) => theme.background.dark};
		border-radius: 2rem;
		padding: 3rem 5rem;

		.field {
			background-color: transparent;
			padding: 1rem;
			border: 0.1rem solid ${({ theme }) => theme.border.primary};
			border-radius: 0.4rem;
			color: ${({ theme }) => theme.text.primary};
			width: 100%;
			font-size: 1rem;

			&:focus {
				border: 0.1rem solid ${({ theme }) => theme.border.light};
				outline: none;
			}
		}

		.error {
			margin-top: 1rem;
			color: ${({ theme }) => theme.text.error};
		}

		button {
			background-color: ${({ theme }) => theme.background.primary};
			color: ${({ theme }) => theme.text.primary};
			padding: 1rem 2rem;
			border: none;
			font-weight: bold;
			cursor: pointer;
			border-radius: 0.4rem;
			font-size: 1rem;
			text-transform: uppercase;
			transition: all 0.3s ease-in-out;

			&.disabled {
				cursor: not-allowed;
				background-color: ${({ theme }) => theme.background.light};
			}

			&:hover {
				background-color: ${({ theme }) => theme.background.light};
			}
		}

		span {
			color: ${({ theme }) => theme.text.primary};
			text-transform: uppercase;

			a {
				margin-left: 0.5rem;
				color: ${({ theme }) => theme.text.secondary};
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
`;

export default SignUp;
