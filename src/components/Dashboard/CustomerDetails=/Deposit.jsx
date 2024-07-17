import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { depositAPI } from '../../../APIs/accountAPI';

const DepositForm = () => {
    const formik = useFormik({
        initialValues: {
            accountNumber: '',
            amount: ''
        },
        validationSchema: Yup.object({
            accountNumber: Yup.string().required('Account number is required'),
            amount: Yup.number().positive('Amount must be positive').required('Amount is required')
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await depositAPI(values);
                alert('Deposit successful');
                resetForm();
            } catch (error) {
                alert('Error making deposit');
                console.error('Deposit error:', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.accountNumber}
                    className={`border ${formik.touched.accountNumber && formik.errors.accountNumber ? 'border-red-500' : 'border-black'}`}
                />
                {formik.touched.accountNumber && formik.errors.accountNumber ? (
                    <div className='text-red-500'>{formik.errors.accountNumber}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                    className={`border ${formik.touched.amount && formik.errors.amount ? 'border-red-500' : 'border-black'}`}
                />
                {formik.touched.amount && formik.errors.amount ? (
                    <div className='text-red-500'>{formik.errors.amount}</div>
                ) : null}
            </div>

            <button className='px-2 bg-red-500' type="submit" disabled={formik.isSubmitting}>
                Deposit
            </button>
        </form>
    );
};

export default DepositForm;
