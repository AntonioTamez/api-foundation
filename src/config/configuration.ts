export interface Configuration {
  port: number;
  environment: string;
}

const parsePort = (): number => {
  const portEnv = process.env.PORT;
  if (!portEnv) return 3000;
  const parsed = parseInt(portEnv.trim(), 10);
  return isNaN(parsed) ? 3000 : parsed;
};

export default (): Configuration => ({
  port: parsePort(),
  environment: process.env.NODE_ENV || 'development',
});