import { HttpStatus } from '@nestjs/common';

export const ResponseCustom = (
	statusCode: HttpStatus,
	message: string,
	data: any,
) => {
	return {
		statusCode,
		message,
		data,
	};
};
