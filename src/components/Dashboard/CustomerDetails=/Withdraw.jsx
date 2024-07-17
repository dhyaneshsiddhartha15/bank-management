import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { withdrawalAPI } from '../../../APIs/accountAPI';

const WithdrawalForm = () => {
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
                await withdrawalAPI(values); 
                alert('Withdrawal successful');
                resetForm();
            } catch (error) {
                alert('Error making withdrawal');
                console.error('Withdrawal error:', error);
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

            <button type="submit" disabled={formik.isSubmitting}>
                Withdraw
            </button>
        </form>
    );
};

export default WithdrawalForm;
