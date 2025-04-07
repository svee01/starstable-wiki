import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Token {
	sub: string;
	username: string;
}

export const InjectToken = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const response = ctx.switchToHttp().getRequest();
		return response.user;
	},
);
