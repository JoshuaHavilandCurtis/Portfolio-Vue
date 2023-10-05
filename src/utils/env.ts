export const castEnv = {
	asBool(envVar: string) {
		if (envVar === "true")
			return true;
		else if (envVar === "false")
			return false;
		else
			throw new Error(`Failed to cast environment variable value '${envVar}' as boolean`);
	},
	asString(envVar: string) {
		return envVar;
	},
	asNumber(envVar: string) {
		const num = parseFloat(envVar);
		if (isNaN(+envVar) || isNaN(num))
			throw new Error(`Failed to cast environment variable value '${envVar}' as number`);

		return num;
	}
};