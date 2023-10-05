export const castEnv = {
	asBool(envVar: string | undefined) {
		if (envVar === undefined)
			return;

		if (envVar === "true")
			return true;
		else if (envVar === "false")
			return false;
		else
			throw new Error(`Failed to cast environment variable value '${envVar}' as boolean`);
	},
	asString(envVar: string | undefined) {
		return envVar;
	},
	asNumber(envVar: string | undefined) {
		if (envVar === undefined)
			return;

		const num = parseFloat(envVar);
		if (isNaN(+envVar) || isNaN(num))
			throw new Error(`Failed to cast environment variable value '${envVar}' as number`);

		return num;
	}
};