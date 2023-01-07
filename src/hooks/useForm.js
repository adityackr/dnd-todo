import { useState } from 'react';

/**
 * @typedef {Object} Param
 * @property {Object} init
 *
 * create forms using this useForm hook easily
 * @param {Param} param
 * @returns
 */

const useForm = (init) => {
	const [state, setState] = useState(init);

	const handleChange = (e) => {
		const { name: key, value } = e.target;

		setState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = (e, cb) => {
		e.preventDefault();
		cb();
		setState(init);
	};

	return {
		formState: state,
		handleChange,
		handleSubmit,
	};
};

export default useForm;
